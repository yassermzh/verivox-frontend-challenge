import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, map, Observable, of, switchMap } from 'rxjs';
import { Tarif, TarifService } from '../tarifs.service';

@Component({
  selector: 'app-tarif-details',
  templateUrl: './tarif-details.component.html',
  styleUrls: ['./tarif-details.component.sass'],
})
export class TarifDetailsComponent {
  tarif$: Observable<Tarif | undefined> | undefined;

  constructor(
    private route: ActivatedRoute,
    private tarifService: TarifService
  ) {}

  ngOnInit() {
    const tarifId$ = this.route.paramMap.pipe(
      map((params) => {
        console.log({ params });

        const tarifId: string | null = params.get('tarifId');
        return tarifId;
      })
    );
    this.tarif$ = tarifId$.pipe(
      switchMap((tarifId) => {
        console.log({ tarifId });
        if (tarifId) {
          return this.tarifService.getById(tarifId);
        }
        return of(undefined);
      })
    );
  }
}

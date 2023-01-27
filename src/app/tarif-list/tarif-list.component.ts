import { Component, TrackByFunction } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Tarif, TarifService } from '../tarifs.service';

@Component({
  selector: 'app-tarif-list',
  templateUrl: './tarif-list.component.html',
  styleUrls: ['./tarif-list.component.sass'],
})
export class TarifListComponent {
  sortByKeys = [
    'name',
    'price',
    'downloadRate',
    'uploadRate',
  ] as (keyof Tarif)[];

  tarifsSorted$: Observable<Tarif[]>;
  sortBy = new FormControl<keyof Tarif>('name');

  constructor(tarifsService: TarifService) {
    this.tarifsSorted$ = combineLatest([
      tarifsService.getAll(),
      this.sortBy.valueChanges.pipe(startWith('name')),
    ]).pipe(
      map(([tarifs, value]) => {
        const sortBy = value as keyof Tarif;
        switch (sortBy) {
          case 'name':
            return tarifs.sort((tarif1, tarif2) =>
              tarif1.name.localeCompare(tarif2.name)
            );
          case 'price':
          case 'downloadRate':
          case 'uploadRate':
            return tarifs.sort(
              (tarif1, tarif2) => tarif1[sortBy] - tarif2[sortBy]
            );
          default:
            return tarifs;
        }
      })
    );
  }

  trackById: TrackByFunction<Tarif> = (_index, item) => {
    return item.id
  }
}

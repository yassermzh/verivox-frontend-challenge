import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  first,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { SortByKey, SortByKeys, Tarif, TarifService } from '../tarifs.service';

@Component({
  selector: 'app-tarif-list',
  templateUrl: './tarif-list.component.html',
  styleUrls: ['./tarif-list.component.sass'],
})
export class TarifListComponent implements OnInit {
  sortByKeys = Object.entries(SortByKeys).map(([k, v]) => ({
    key: k,
    value: v,
  }));
  tarifsSorted$!: Observable<Tarif[]>;
  sortBy = new FormControl<keyof Tarif>('name');
  page$!: Observable<number>;

  constructor(
    private tarifsService: TarifService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.page$ = this.route.queryParams.pipe(
      map((params) => Number(params['page'] ?? 1))
    );
    this.tarifsSorted$ = combineLatest([
      this.sortBy.valueChanges.pipe(startWith('name')),
      this.page$,
    ]).pipe(
      switchMap(([_sortBy, page]) => {
        return this.tarifsService.getAll({
          page,
          sortBy: _sortBy as SortByKey,
        });
      })
    );
  }

  trackById: TrackByFunction<Tarif> = (_index, item) => {
    return item.id;
  };

  handlePageChange(action: 'next' | 'prev') {
    this.page$.pipe(first()).subscribe((page) => {
      let to: number;

      if (action === 'next') {
        to = page + 1;
        // maybe not forever!
      } else if (action === 'prev') {
        to = Math.max(1, page - 1);
      } else {
        to = action;
      }

      this.router.navigate([], { queryParams: { page: to } });
    });
  }
}

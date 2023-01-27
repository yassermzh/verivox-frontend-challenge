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

const SortByKeyInitial: SortByKey = 'empty';

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
  sortBy = new FormControl<SortByKey>(SortByKeyInitial);
  page$!: Observable<number>;
  sortBy$!: Observable<SortByKey>;

  constructor(
    private tarifsService: TarifService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.page$ = this.route.queryParams.pipe(
      map((params) => Number(params['page'] ?? 1))
    );
    this.sortBy$ = this.route.queryParams.pipe(
      map((params) => params['sortBy'] ?? SortByKeyInitial)
    );
    this.tarifsSorted$ = combineLatest([this.sortBy$, this.page$]).pipe(
      switchMap(([sortBy, page]) =>
        this.tarifsService.getAll({
          page,
          sortBy,
        })
      )
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

      this.router.navigate([], {
        queryParams: { page: to },
        queryParamsHandling: 'merge',
      });
    });
  }

  handleSortChange() {
    this.router.navigate([], {
      queryParams: { page: 1, sortBy: this.sortBy.value },
    });
  }
}

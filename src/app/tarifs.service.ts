import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MockedTarifs } from './mock-data';

export type Tarif = {
  id: string;
  name: string;
  downloadRate: number;
  uploadRate: number;
  description: string;
  price: number;
};

export const SortByKeys = {
  empty: '-',
  name: 'Name',
  price: 'Price',
  downloadRate: 'Download Rate',
  uploadRate: 'Upload Rate',
}; //satisfies Partial<Record<'empty' | keyof Tarif, string>>;
// above requires TS 4.9! Not supported by angular yet!
export type SortByKey = keyof typeof SortByKeys;

const PAGE_SIZE = 5;

@Injectable({
  providedIn: 'root',
})
export class TarifService {
  private tarifs: Tarif[] = MockedTarifs;

  getAll({ page = 1, sortBy = 'empty' }: { page: number; sortBy: SortByKey }) {
    const from = (page - 1) * PAGE_SIZE;
    const sortedList = [...this.tarifs];
    switch (sortBy) {
      case 'name':
        sortedList.sort((tarif1, tarif2) =>
          tarif1.name.localeCompare(tarif2.name)
        );
        break;
      case 'price':
      case 'downloadRate':
      case 'uploadRate':
        sortedList.sort((tarif1, tarif2) => tarif1[sortBy] - tarif2[sortBy]);
        break;
      default:
      // back to original order
    }
    return of(sortedList.slice(from, from + PAGE_SIZE));
  }

  getById(id: string) {
    return of(this.tarifs.find((tarif) => tarif.id === id));
  }
}

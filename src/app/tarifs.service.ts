import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export type Tarif = {
  id: string;
  name: string;
  downloadRate: number;
  uploadRate: number;
  description: string;
  price: number;
};

const MockedTarifs = [
  {
    id: 'id-1',
    name: 'tarif 1',
    uploadRate: 6,
    downloadRate: 100,
    description: 'this benefit',
    price: 123.45,
  },
  {
    id: 'id-2',
    name: 'tarif 2',
    uploadRate: 10,
    downloadRate: 128,
    description: 'that benefit',
    price: 234.56,
  },
  {
    id: 'id-3',
    name: 'tarif 3',
    uploadRate: 9,
    downloadRate: 148,
    description: 'this benefit',
    price: 134.56,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TarifService {
  private tarifs: Tarif[] = MockedTarifs;

  getAll() {
    return of(this.tarifs);
  }

  getById(id: string) {
    return of(this.tarifs.find((tarif) => tarif.id === id));
  }
}

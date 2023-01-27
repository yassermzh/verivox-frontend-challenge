import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {MockedTarifs} from './mock-data'

export type Tarif = {
  id: string;
  name: string;
  downloadRate: number;
  uploadRate: number;
  description: string;
  price: number;
};

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

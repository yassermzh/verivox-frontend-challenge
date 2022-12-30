import { Component, Input } from '@angular/core';
import { Tarif } from '../../tarifs.service';

@Component({
  selector: 'app-tarif-list-item',
  templateUrl: './tarif-list-item.component.html',
  styleUrls: ['./tarif-list-item.component.sass'],
})
export class TarifListItemComponent {
  @Input() tarif: Tarif | undefined;
  @Input() rowNum: number = 1;
}

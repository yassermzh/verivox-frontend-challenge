import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifListItemComponent } from './tarif-list-item.component';

describe('TarifListItemComponent', () => {
  let component: TarifListItemComponent;
  let fixture: ComponentFixture<TarifListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarifListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TarifListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

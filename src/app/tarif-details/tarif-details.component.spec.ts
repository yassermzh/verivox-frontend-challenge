import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifDetailsComponent } from './tarif-details.component';

describe('TarifDetailsComponent', () => {
  let component: TarifDetailsComponent;
  let fixture: ComponentFixture<TarifDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

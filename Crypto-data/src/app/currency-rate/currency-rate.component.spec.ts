import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRateComponent } from './currency-rate.component';

describe('CurrencyRateComponent', () => {
  let component: CurrencyRateComponent;
  let fixture: ComponentFixture<CurrencyRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyRateComponent]
    });
    fixture = TestBed.createComponent(CurrencyRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

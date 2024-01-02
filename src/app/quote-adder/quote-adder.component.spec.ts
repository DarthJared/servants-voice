import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteAdderComponent } from './quote-adder.component';

describe('QuoteAdderComponent', () => {
  let component: QuoteAdderComponent;
  let fixture: ComponentFixture<QuoteAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteAdderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

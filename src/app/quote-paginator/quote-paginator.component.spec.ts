import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePaginatorComponent } from './quote-paginator.component';

describe('QuotePaginatorComponent', () => {
  let component: QuotePaginatorComponent;
  let fixture: ComponentFixture<QuotePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotePaginatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

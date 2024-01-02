import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAdderComponent } from './tag-adder.component';

describe('TagAdderComponent', () => {
  let component: TagAdderComponent;
  let fixture: ComponentFixture<TagAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagAdderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

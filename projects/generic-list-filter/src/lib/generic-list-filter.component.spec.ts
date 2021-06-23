import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericListFilterComponent } from './generic-list-filter.component';

describe('GenericListFilterComponent', () => {
  let component: GenericListFilterComponent;
  let fixture: ComponentFixture<GenericListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericListFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

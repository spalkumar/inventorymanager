import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateproductpopupComponent } from './createproductpopup.component';

describe('CreateproductpopupComponent', () => {
  let component: CreateproductpopupComponent;
  let fixture: ComponentFixture<CreateproductpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateproductpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateproductpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

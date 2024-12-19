import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallesComponent } from './talles.component';

describe('TallesComponent', () => {
  let component: TallesComponent;
  let fixture: ComponentFixture<TallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

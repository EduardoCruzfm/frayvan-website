import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChupinComponent } from './chupin.component';

describe('ChupinComponent', () => {
  let component: ChupinComponent;
  let fixture: ComponentFixture<ChupinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChupinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChupinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

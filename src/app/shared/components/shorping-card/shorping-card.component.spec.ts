import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorpingCardComponent } from './shorping-card.component';

describe('ShorpingCardComponent', () => {
  let component: ShorpingCardComponent;
  let fixture: ComponentFixture<ShorpingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShorpingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShorpingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

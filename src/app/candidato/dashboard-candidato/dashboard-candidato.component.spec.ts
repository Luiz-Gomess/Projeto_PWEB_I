import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoDashboardComponent } from './dashboard-candidato.component';

describe('CandidatoDashboardComponent', () => {
  let component: CandidatoDashboardComponent;
  let fixture: ComponentFixture<CandidatoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatoDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

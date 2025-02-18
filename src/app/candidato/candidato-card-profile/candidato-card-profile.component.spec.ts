import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoCardProfileComponent } from './candidato-card-profile.component';

describe('CandidatoCardProfileComponent', () => {
  let component: CandidatoCardProfileComponent;
  let fixture: ComponentFixture<CandidatoCardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatoCardProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoCardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

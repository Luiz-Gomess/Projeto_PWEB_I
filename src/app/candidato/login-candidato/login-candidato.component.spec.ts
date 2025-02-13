import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCandidatoComponent } from './login-candidato.component';

describe('LoginCandidatoComponent', () => {
  let component: LoginCandidatoComponent;
  let fixture: ComponentFixture<LoginCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCandidatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

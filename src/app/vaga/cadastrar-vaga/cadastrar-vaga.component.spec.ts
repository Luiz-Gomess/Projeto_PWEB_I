import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVagaComponent } from './cadastrar-vaga.component';

describe('CadastrarVagaComponent', () => {
  let component: CadastrarVagaComponent;
  let fixture: ComponentFixture<CadastrarVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarVagaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

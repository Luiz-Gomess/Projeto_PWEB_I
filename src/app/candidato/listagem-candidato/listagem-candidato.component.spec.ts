import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCandidatoComponent } from './listagem-candidato.component';

describe('ListagemCandidatoComponent', () => {
  let component: ListagemCandidatoComponent;
  let fixture: ComponentFixture<ListagemCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemCandidatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

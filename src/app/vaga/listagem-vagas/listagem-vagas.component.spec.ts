import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemVagasComponent } from './listagem-vagas.component';

describe('ListagemVagasComponent', () => {
  let component: ListagemVagasComponent;
  let fixture: ComponentFixture<ListagemVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemVagasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

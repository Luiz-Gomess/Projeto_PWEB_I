import { Component, OnInit } from '@angular/core';
import { VagaService } from '../../services/vaga.service';
import { Vaga } from '../../models/vaga';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardVagaComponent } from '../card-vaga/card-vaga.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-listagem-vagas',
  imports: [CommonModule, FormsModule, CardVagaComponent, NavbarComponent, FooterComponent],
  templateUrl: './listagem-vagas.component.html',
  styleUrl: './listagem-vagas.component.css'
})
export class ListagemVagasComponent implements OnInit  {
  vagas: Vaga[] = [];
  vaga: Vaga = new Vaga('', '', '', 0, '', '', []);

  constructor(private vagaService: VagaService) { } // Injete o serviço

  ngOnInit(): void {
    this.vagaService.listarVagas().subscribe(vagas => {
      this.vagas = vagas;
    });
  }

  criarVaga(): void {
    this.vagaService.criarVaga(this.vaga).subscribe({
      next: (vaga) => {
        this.vaga = vaga;
        console.log('Vaga cadastrada:', vaga);
      },
      error: (err) => console.error('Erro ao cadastrar vaga:', err)
    });
  }
}

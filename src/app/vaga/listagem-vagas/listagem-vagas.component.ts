import { Component, OnInit } from '@angular/core';
import { VagaService } from '../../services/vaga.service';
import { Vaga } from '../../models/vaga';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem-vagas',
  imports: [CommonModule],
  templateUrl: './listagem-vagas.component.html',
  styleUrl: './listagem-vagas.component.css'
})
export class ListagemVagasComponent implements OnInit  {
  vagas: Vaga[] = [];

  constructor(private vagaService: VagaService) { } // Injete o serviço

  ngOnInit(): void {
    this.vagaService.listarVagas().subscribe(vagas => {
      this.vagas = vagas;
    });
  }
}

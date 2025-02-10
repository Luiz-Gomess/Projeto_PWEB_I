import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../services/candidato.service';
import { Candidato } from '../../models/candidato';
import { Vaga } from '../../models/vaga';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-candidato',
  imports: [CommonModule],
  templateUrl: './cadastro-candidato.component.html',
  styleUrl: './cadastro-candidato.component.css'
})
export class CadastroCandidatoComponent implements OnInit{
  vagas: Vaga[] = [];
  cpf = '1234'; // CPF do candidato

  constructor(private candidatoService: CandidatoService) {}

  ngOnInit(): void {
    this.listarVagas();
  }

  listarVagas(): void {
    this.candidatoService.listarCandidaturas(this.cpf).subscribe(vagas => {
      this.vagas = vagas;
      console.log(vagas)
    });
  }
  
}

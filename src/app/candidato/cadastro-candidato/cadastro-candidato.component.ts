import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../services/candidato.service';
import { Candidato } from '../../models/candidato';
import { Vaga } from '../../models/vaga';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-candidato',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-candidato.component.html',
  styleUrl: './cadastro-candidato.component.css'
})
export class CadastroCandidatoComponent {
  candidato: Candidato = new Candidato('', '', ''); // Inicia o modelo vazio
  candidaturas : Vaga[] | null | undefined;

  constructor(private candidatoService: CandidatoService) {}

  cadastrar() {
    this.candidatoService.cadastrar(this.candidato).subscribe({
      next: (candidato) => {
        // this.candidato.id = this.candidatoService.gerarIDCandidato();
        this.candidato = candidato;
        console.log('Candidato cadastrado:', candidato);
      },
      error: (err) => console.error('Erro ao cadastrar candidato:', err)
    });
  }

  deletarCandidato(cpf: string): void {
    this.candidatoService.deletarPerfil(cpf).subscribe({
      next: () => {
        console.log('Candidato deletado:', cpf);
      },
      error: (err) => {
        console.error('Erro ao deletar candidato:', err);
      }
    });
  }

  buscarCandidato(cpf: string): void {
    this.candidatoService.buscarCandidato(cpf).subscribe({
      next: (candidatoBuscado) => {
        this.candidato = candidatoBuscado;
      },
      error: (err) => {
        console.error('Erro ao buscar candidato:', err);
      }
    });
  }

  listarCandidaturas(listaIDSVagas : string[]){
    this.candidatoService.listarCandidaturas(listaIDSVagas).subscribe(candidaturas => this.candidaturas = candidaturas);
  }

  candidatar(idVaga:string) {
    this.candidatoService.candidatar(idVaga, this.candidato.cpf).subscribe({
      next: () => {
       console.log( 'Candidato cadastrado na vaga com sucesso!');
      },
      error: (err) => {
        console.log(`Erro: ${err.message}`);
      }
    });
  }

  removerCandidatura(idVaga:string){
    this.candidatoService.removerCandidatura(idVaga, this.candidato.cpf).subscribe({
      next: () => {
       console.log( 'Candidatura removida com sucesso!');
      },
      error: (err) => {
        console.log(`Erro: ${err.message}`);
      }
    });
  }

  
}


  

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
  candidato: Candidato = new Candidato('','', '', '', []); // Inicia o modelo vazio
  candidatoCadastrado: Candidato | null = null;
  candidaturas : Vaga[] | null | undefined;

  constructor(private candidatoService: CandidatoService) {}

  cadastrar() {
    this.candidatoService.cadastrar(this.candidato).subscribe({
      next: (candidato) => {
        this.candidatoCadastrado = candidato;
        console.log('Candidato cadastrado:', candidato);
      },
      error: (err) => console.error('Erro ao cadastrar candidato:', err)
    });
  }

  deletarCandidato(cpf: string): void {
    this.candidatoService.deletarPerfil(cpf).subscribe({
      next: () => {
        // this.mensagem = `Candidato com CPF ${cpf} deletado com sucesso!`;
        console.log('Candidato deletado:', cpf);
      },
      error: (err) => {
        // this.mensagem = 'Erro ao deletar candidato!';
        console.error('Erro ao deletar candidato:', err);
      }
    });
  }

  buscarCandidato(cpf: string): void {
    this.candidatoService.buscarCandidato(cpf).subscribe(candidatoBuscado => this.candidato = candidatoBuscado);
  }

  listarCandidaturas(listaIDSVagas : number[]){
    this.candidatoService.listarCandidaturas(listaIDSVagas).subscribe(candidaturas => this.candidaturas = candidaturas);
  }

  candidatar(idVaga:number) {
    this.candidatoService.candidatar(idVaga, this.candidato.cpf).subscribe({
      next: () => {
       console.log( 'Candidato cadastrado na vaga com sucesso!');
      },
      error: (err) => {
        console.log(`Erro: ${err.message}`);
      }
    });
  }
}


  

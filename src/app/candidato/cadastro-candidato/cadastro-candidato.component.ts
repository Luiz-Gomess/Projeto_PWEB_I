import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../services/candidato.service';
import { Candidato } from '../../models/candidato';
import { Vaga } from '../../models/vaga';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CandidatoStateService } from '../../services/candidato-state.service';

@Component({
  selector: 'app-cadastro-candidato',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro-candidato.component.html',
  styleUrl: './cadastro-candidato.component.css'
})
export class CadastroCandidatoComponent {
  candidato: Candidato = new Candidato('', '','', '');
  candidaturas : Vaga[] | null | undefined;
  menssagem: string = "";
  
  constructor(private candidatoService: CandidatoService, private router: Router, private candidatoStateService: CandidatoStateService) {}

  cadastrar() {
    this.candidatoService.cadastrar(this.candidato).subscribe({
      next: (candidato) => {
        this.candidato = candidato;
        this.candidatoStateService.setCandidato(candidato);
        this.router.navigate(['/candidato-dashboard']);
      },

      error: (err) =>  {
        console.error('Erro ao cadastrar candidato:', err)
        this.menssagem = err
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

  login(cpf: string, senha: string){
    console.log(cpf, senha)
    this.candidatoService.logar(cpf, senha).subscribe({
      next: (candidato) => {
        this.candidato = candidato;
        console.log('Candidato logado:', candidato);
      },
      error: (err) => {
        console.log("Erro:", err.message)
      }
    })
  }
  
}


  

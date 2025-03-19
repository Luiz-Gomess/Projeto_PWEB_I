import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../shared/services/candidato.service';
import { Candidato } from '../../shared/models/candidato';
import { Vaga } from '../../shared/models/vaga';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserStateService } from '../../shared/services/user-state.service';

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
  
  constructor(private candidatoService: CandidatoService, private router: Router, private userStateService: UserStateService) {}

  cadastrar() {
    this.candidatoService.cadastrar(this.candidato).subscribe({
      next: (candidato) => {
        this.candidato = candidato;
        this.userStateService.setCandidato(candidato);
        this.router.navigate(['/candidato-dashboard']);
      },

      error: (err) =>  {
        console.error('Erro ao cadastrar candidato:', err)
        this.menssagem = err
      }
    });
  }
}


  

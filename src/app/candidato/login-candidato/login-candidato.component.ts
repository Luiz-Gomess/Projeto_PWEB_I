import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../shared/services/candidato.service';
import { CandidatoStateService } from '../../shared/services/candidato-state.service';
import { Candidato } from '../../shared/models/candidato';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-candidato',
  templateUrl: './login-candidato.component.html',
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrls: ['./login-candidato.component.css']
})
export class LoginCandidatoComponent implements OnInit {
  candidato: Candidato = {
    cpf: '',
    senha: '',
    nome: '',
    email: '',
    habilidades: [],
    candidaturas: []
  };

  message: string = '';
  messageType: 'success' | 'error' | null = null;

  constructor(private candidatoService: CandidatoService, private candidatoStateService: CandidatoStateService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    console.log(this.candidato.cpf)
    this.candidatoService.logar(this.candidato.cpf, this.candidato.senha).subscribe({
      next: (candidato) => {
        console.log(candidato)
        if (candidato) {
          this.message = 'Login realizado com sucesso!';
          this.messageType = 'success';
          this.candidatoStateService.setCandidato(candidato);
          setTimeout(() => {
            this.router.navigate(['/candidato-dashboard']);
          }, 2000);
        } else {
          this.message = 'CPF ou senha incorretos.';
          this.messageType = 'error';
        }
      },
      error: (err) => {
        this.message = err;
        this.messageType = 'error';
      }
    });
  }
}
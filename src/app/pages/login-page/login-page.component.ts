import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../shared/services/candidato.service';
import { UserStateService } from '../../shared/services/user-state.service';
import { Candidato } from '../../shared/models/candidato';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-candidato',
  templateUrl: './login-page.component.html',
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  message: string = '';

  messageType: 'success' | 'error' | null = null;

  user = {
    cpf: '',
    senha: '',
  }

  type = ""

  constructor(private candidatoService: CandidatoService, private userStateService: UserStateService, private router: Router) { }

  ngOnInit(): void { 
    this.type = this.userStateService.getTypeUser();
  }

  onSubmit(): void {
    if(this.type === 'c') {
      this.candidatoService.logar(this.user.cpf, this.user.senha).subscribe({
        next: (candidato) => {
          console.log(candidato)
          if (candidato) {
            this.message = 'Login realizado com sucesso!';
            this.messageType = 'success';
            this.userStateService.setCandidato(candidato);
              this.router.navigate(['/candidato-dashboard']);
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
    } else if (this.type === 'r') {
      // Logica de login para recrutador
    }
  }
}
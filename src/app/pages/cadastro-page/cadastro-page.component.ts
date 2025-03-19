import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../shared/services/candidato.service';
import { Candidato } from '../../shared/models/candidato';
import { Vaga } from '../../shared/models/vaga';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserStateService } from '../../shared/services/user-state.service';
import { Recrutador } from '../../shared/models/recrutador';

@Component({
  selector: 'app-cadastro-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro-page.component.html',
  styleUrl: './cadastro-page.component.css'
})
export class CadastroPageComponent {
  menssagem: string = "";
  type = ""
  user: Candidato | Recrutador = this.type == 'c' ? new Candidato('', '', '', '') : new Recrutador('', '', '', "");
  
  constructor(private candidatoService: CandidatoService, private router: Router, private userStateService: UserStateService) {}

  cadastrar() {
    if(this.type === 'c') {
      this.candidatoService.cadastrar(this.user as Candidato).subscribe({
        next: (candidato) => {
          this.user = candidato;
          this.userStateService.setCandidato(candidato);
          this.router.navigate(['/candidato-dashboard']);
        },

        error: (err) =>  {
          console.error('Erro ao cadastrar candidato:', err)
          this.menssagem = err
        }
      });
    } else if (this.type === 'r') {
      // Logica de cadastro para recrutador
    }
  }

  ngOnInit(): void { 
    this.type = this.userStateService.getTypeUser();
  }
}


  

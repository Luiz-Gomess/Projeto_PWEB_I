import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../shared/services/candidato.service';
import { Candidato } from '../../shared/models/candidato';
import { Vaga } from '../../shared/models/vaga';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserStateService } from '../../shared/services/user-state.service';
import { Recrutador } from '../../shared/models/recrutador';
import { RecrutadorService } from '../../shared/services/recrutador.service';

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
  
  constructor(
    private candidatoService: CandidatoService, 
    private router: Router, 
    private userStateService: UserStateService,
    private recrutadorService: RecrutadorService
  ) {}

  cadastrar() {
    if(this.type === 'c') {
      this.candidatoService.cadastrar(this.user as Candidato).subscribe({
        next: (data: any) => {
          this.user = data.candidato;
          this.userStateService.setCandidato(data.candidato);
          this.router.navigate(['/candidato-dashboard']);
        },

        error: (err) =>  {
          console.error('Erro ao cadastrar candidato:', err)
          this.menssagem = err
        }
      });
    } else if (this.type === 'r') {
      this.recrutadorService.cadastrar(this.user as Recrutador).subscribe({
        next: (recrutador) => {
          this.user = recrutador;
          this.userStateService.setRecruiter(recrutador);
          this.router.navigate(['/recrutador-dashboard']);
        },
        error: (err) =>  {  
          console.error('Erro ao cadastrar recrutador:', err)
          this.menssagem = err
        }
      });
    }
  }

  ngOnInit(): void { 
    this.type = this.userStateService.getTypeUser();
  }
}


  

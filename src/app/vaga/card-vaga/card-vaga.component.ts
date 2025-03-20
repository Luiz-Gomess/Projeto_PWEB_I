import { Component } from '@angular/core';
import { Vaga } from '../../shared/models/vaga';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../shared/services/user-state.service';
import { Candidato } from '../../shared/models/candidato';
import { CandidatoService } from '../../shared/services/candidato.service';
import { Recrutador } from '../../shared/models/recrutador';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-vaga',
  imports: [CommonModule],
  templateUrl: './card-vaga.component.html',
  styleUrl: './card-vaga.component.css'
})
export class CardVagaComponent {
  @Input() vaga!: Vaga;
  candidato?: Candidato;
  recrutador?: Recrutador;
  type = "";

  constructor(private userStateService: UserStateService, 
    private candidatoService: CandidatoService,
    private router: Router
  ){}

  ngOnInit() {
    this.type = this.userStateService.getTypeUser();
    if(this.type === 'c') {
      this.candidato = this.userStateService.getCandidato() as Candidato;
    }
    else if(this.type === 'r') {
      this.recrutador = this.userStateService.getRecruiter() as Recrutador;
    }
  }

  candidatar() {
    if(this.candidato?.cpf) {
      this.candidatoService.candidatar(this.vaga.id, this.candidato?.cpf).subscribe({
        next: () => {
          console.log('Candidatura realizada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao candidatar:', err);
        }
      });
    }
  }

  verCandidatos() {
    window.localStorage.setItem('vagaId', this.vaga.id);
    this.router.navigate(['/listar-candidaturas']);
  }

  deletarCandidatura() {
    if(this.candidato?.cpf) {
      this.candidatoService.removerCandidatura(this.vaga.id, this.candidato?.cpf).subscribe({
        next: () => {
          console.log('Candidatura deletada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao deletar candidatura:', err);
        }
      });
    }
  }
}

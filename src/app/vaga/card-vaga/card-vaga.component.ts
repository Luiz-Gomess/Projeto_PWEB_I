import { Component } from '@angular/core';
import { Vaga } from '../../shared/models/vaga';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../shared/services/user-state.service';
import { Candidato } from '../../shared/models/candidato';
import { CandidatoService } from '../../shared/services/candidato.service';
import { Recrutador } from '../../shared/models/recrutador';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { MatIcon } from '@angular/material/icon';
import { VagaService } from '../../shared/services/vaga.service';
import { NotificacaoFirestoreService } from '../../shared/services/notificationFirestore.service';

@Component({
  selector: 'app-card-vaga',
  imports: [CommonModule, MatIcon],
  templateUrl: './card-vaga.component.html',
  styleUrl: './card-vaga.component.css'
})
export class CardVagaComponent {
  @Input() vaga!: Vaga;
  @Input() local!: string;
  candidato?: Candidato;
  recrutador?: Recrutador;
  type = "";

  constructor(private userStateService: UserStateService, 
    private candidatoService: CandidatoService,
    private router: Router,
    private alertService: AlertService,
    private vagaService: VagaService,
    private notificationFirestoreService: NotificacaoFirestoreService
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
        next: (data) => {
          this.alertService.showSuccess(data.message)
          this.candidato?.candidaturas.push(this.vaga.id)
          this.userStateService.setCandidato(this.candidato as Candidato)
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

  editarVaga() {
    window.localStorage.setItem('vaga', JSON.stringify(this.vaga))
    this.router.navigate(['/cadastrar-vaga'])
  }

  excluirVaga() {
    let msg = `A vaga ${this.vaga.titulo} que você se candidatou foi excluida!`
    console.log(this.vaga.id)
    this.notificationFirestoreService.adicionar(this.vaga.id, msg)

    this.vagaService.deletarVaga(this.vaga.id).subscribe({
      next: (data) => {
        this.alertService.showSuccess(data.message)
        
      }
    })
  }

  deletarCandidatura() {
    if(this.candidato?.cpf) {
      this.candidatoService.removerCandidatura(this.vaga.id, this.candidato?.cpf).subscribe({
        next: (data) => {
          this.alertService.showSuccess(data.message)

        },
        error: (err) => {
          console.error('Erro ao deletar candidatura:', err);
        }
      });
    }
  }
}

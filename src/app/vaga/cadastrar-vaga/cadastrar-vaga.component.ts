import { Component, OnInit } from '@angular/core';
import { Vaga } from '../../shared/models/vaga';
import { VagaService } from '../../shared/services/vaga.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Recrutador } from '../../shared/models/recrutador';
import { UserStateService } from '../../shared/services/user-state.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-cadastrar-vaga',
  templateUrl: './cadastrar-vaga.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./cadastrar-vaga.component.css']
})
export class CadastrarVagaComponent implements OnInit {
  vaga: any = {
    id: '',
    titulo: '',
    descricao: '',
    salario: 0,
    empresa: '',
    local: '',
    requisitos: [],
  };

  recrutador: Recrutador | undefined;

  requisitosInput: string = '';

  constructor(private vagaService: VagaService, private router: Router, 
    private userStateService: UserStateService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.recrutador = this.userStateService.getRecruiter() as Recrutador;
    if (!this.recrutador) {
      this.router.navigate(['/login']);
    }

    let localVaga = JSON.parse(window.localStorage.getItem('vaga') as string) as Vaga
    if(localVaga)
      this.vaga = localVaga
  }

  adicionarRequisito(): void {
    if (this.requisitosInput.trim()) {
      this.vaga.requisitos.push(this.requisitosInput.trim());
      this.requisitosInput = '';
    }
  }

  onSubmit(): void {
    console.log(this.recrutador)
    this.vagaService.criarVaga(this.vaga, this.recrutador?.cpf as string).subscribe({
      next: (data) => {
        this.alertService.showSuccess(data.message)
        this.vaga = {
          id: '',
          titulo: '',
          descricao: '',
          salario: 0,
          empresa: '',
          local: '',
          requisitos: [],
        };
        
        if(window.localStorage.getItem('vaga'))
          window.localStorage.removeItem('vaga')
        
        this.router.navigate(['/recrutador-dashboard']);
      },
      error: (err) => {
        console.error('Erro ao criar vaga:', err);
      }
    });
  }
}
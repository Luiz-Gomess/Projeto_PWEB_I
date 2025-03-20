import { Component, OnInit } from '@angular/core';
import { Vaga } from '../../shared/models/vaga';
import { VagaService } from '../../shared/services/vaga.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Recrutador } from '../../shared/models/recrutador';
import { UserStateService } from '../../shared/services/user-state.service';

@Component({
  selector: 'app-cadastrar-vaga',
  templateUrl: './cadastrar-vaga.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./cadastrar-vaga.component.css']
})
export class CadastrarVagaComponent implements OnInit {
  vaga: Vaga = {
    id: '',
    titulo: '',
    descricao: '',
    salario: 0,
    empresa: '',
    local: '',
    requisitos: [],
    candidaturas: []
  };

  recrutador: Recrutador | undefined;

  requisitosInput: string = '';

  constructor(private vagaService: VagaService, private router: Router, private userStateService: UserStateService) { }

  ngOnInit(): void {
    this.recrutador = this.userStateService.getRecruiter() as Recrutador;
    if (!this.recrutador) {
      this.router.navigate(['/login']);
    }
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
      next: (vaga) => {
        console.log('Vaga criada com sucesso:', vaga);
        this.vaga = {
          id: '',
          titulo: '',
          descricao: '',
          salario: 0,
          empresa: '',
          local: '',
          requisitos: [],
          candidaturas: []
        };
        
        this.router.navigate(['/recrutador-dashboard']);
      },
      error: (err) => {
        console.error('Erro ao criar vaga:', err);
      }
    });
  }
}
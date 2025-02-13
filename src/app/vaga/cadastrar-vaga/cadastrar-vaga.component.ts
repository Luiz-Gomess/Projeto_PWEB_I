import { Component, OnInit } from '@angular/core';
import { Vaga } from '../../models/vaga';
import { VagaService } from '../../services/vaga.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    candidatos: []
  };

  requisitosInput: string = '';

  constructor(private vagaService: VagaService, private router: Router) { }

  ngOnInit(): void {
  }

  adicionarRequisito(): void {
    if (this.requisitosInput.trim()) {
      this.vaga.requisitos.push(this.requisitosInput.trim());
      this.requisitosInput = '';
    }
  }

  onSubmit(): void {
    this.vagaService.criarVaga(this.vaga).subscribe({
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
          candidatos: []
        };
        
        this.router.navigate(['/listagem-vagas'])
      },
      error: (err) => {
        console.error('Erro ao criar vaga:', err);
      }
    });
  }
}
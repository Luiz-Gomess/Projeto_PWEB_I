import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CandidatoService } from '../../services/candidato.service';
import { Candidato } from '../../models/candidato';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-candidatos',
  templateUrl: './listagem-candidato.component.html',
  imports: [CommonModule, MatTableModule],
  styleUrl: './listagem-candidato.component.css'
})
export class ListagemCandidatoComponent implements OnInit {
  displayedColumns: string[] = ['cpf', 'nome', 'email', 'habilidades', 'acoes'];
  dataSource = new MatTableDataSource<Candidato>();

  constructor(private candidatoService: CandidatoService) {}

  ngOnInit(): void {
    this.carregarCandidatos();
  }

  carregarCandidatos(): void {
    this.candidatoService.listarCandidatos().subscribe({
      next: (candidatos) => {
        this.dataSource.data = candidatos;
      },
      error: (err) => console.error('Erro ao carregar candidatos:', err)
    });
  }

  deletarCandidato(cpf: string): void {
    this.candidatoService.deletarPerfil(cpf).subscribe({
      next: () => {
        console.log('Candidato deletado:', cpf);
        this.carregarCandidatos();
      },
      error: (err) => console.error('Erro ao deletar candidato:', err)
    });
  }
}
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CandidatoStateService } from '../../shared/services/candidato-state.service';
import { CandidatoService } from '../../shared/services/candidato.service';
import { Candidato } from '../../shared/models/candidato';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  candidato: Candidato = new Candidato('', '','', '');

  constructor(private router: Router, private candidatoStateService: CandidatoStateService, private candidatoService: CandidatoService) {}

  deletarCandidato(cpf: string): void {
    this.candidatoService.deletarPerfil(cpf).subscribe({
      next: () => {
        console.log('Candidato deletado:', cpf);
      },
      error: (err) => {
        console.error('Erro ao deletar candidato:', err);
      }
    });
  }

  selecionarItem(item: string): void {
    if(item === 'Sair') {
      this.candidatoStateService.limparCandidato();
      this.router.navigate(['/'])
    } else if (item === "Excluir") {
      this.deletarCandidato(this.candidato.cpf)
      this.router.navigate(['/cadastro-candidato'])
    } else {
      this.router.navigate(['/candidato-dashboard'])
    }
  }

  ngOnInit() {
    this.candidato = this.candidatoStateService.getCandidato() as Candidato;
  }
}
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserStateService } from '../../shared/services/user-state.service';
import { Candidato } from '../../shared/models/candidato';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CandidatoCardProfileComponent } from '../candidato-card-profile/candidato-card-profile.component';
import { Notificacao, NotificacaoFirestoreService } from '../../shared/services/notificationFirestore.service';
import { Vaga } from '../../shared/models/vaga';
import { CandidatoService } from '../../shared/services/candidato.service';
import { CardVagaComponent } from '../../vaga/card-vaga/card-vaga.component';

@Component({
  selector: 'app-candidato-dashboard',
  templateUrl: './dashboard-candidato.component.html',
  imports: [NavbarComponent, FooterComponent, MatIcon, CandidatoCardProfileComponent, CommonModule, CardVagaComponent],
  styleUrl: './dashboard-candidato.component.css',
  encapsulation: ViewEncapsulation.None,
})

export class CandidatoDashboardComponent implements OnInit {
  candidato: Candidato = new Candidato(
    '',
    '',
    '',
    ''
  );

  candidaturas: Vaga[] | null = null;

  activeSection: string = 'perfil';
  sidebarOpen: boolean = true; 
  notificacoes: Notificacao[] = [
    { id: '1', idUsuario: '123', mensagem: 'Você foi aprovado na vaga de Desenvolvedor Front-end', lida: false },
    { id: '2', idUsuario: '123', mensagem: 'Você foi reprovado na vaga de Desenvolvedor Back-end', lida: false },
    { id: '3', idUsuario: '123', mensagem: 'Você foi aprovado na vaga de Desenvolvedor Fullstack', lida: false },
    { id: '4', idUsuario: '123', mensagem: 'Você foi reprovado na vaga de Desenvolvedor Mobile', lida: true },
  ];

  sidebarLinks = [
    { label: 'Perfil', icon: 'person', section: 'perfil' },
    { label: 'Candidaturas', icon: 'work', section: 'candidaturas' },
    { label: "Notificações", icon: "notifications", section: "notificacoes" },
    { label: 'Vagas', icon: 'search', section: 'vagas' }
  ];

  constructor(private userStateService: UserStateService, private router: Router, private notificacaoService: NotificacaoFirestoreService, private candidatoService: CandidatoService) {}

  navigateToListagemVagas() {
    this.router.navigate(['/listagem-vagas'])
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  setActiveSection(section: string) {
    if(section === 'candidaturas') {

      this.candidatoService.listarCandidaturas(this.candidato.cpf).subscribe((candidaturas: Vaga[]) => {
        this.candidaturas = candidaturas;
      });

      console.log(this.candidaturas);
    }

    this.activeSection = section;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen; 
  }

  marcarNotificacaoComoLida(id: string) {
    this.notificacaoService.marcarComoLida(id);
  }

  deletarNotificacao(id: string) {
    this.notificacaoService.deletar(id);
  }

  showNotifations() {
    this.notificacaoService.listar(this.candidato.cpf).subscribe((notificacoes) => {
      this.notificacoes = notificacoes;
    });
  }
  
  ngOnInit() {
    if(!this.userStateService.getCandidato()) {
      this.router.navigate(['/login-candidato'])
    }
    this.candidato = this.userStateService.getCandidato() as Candidato;
  }

}



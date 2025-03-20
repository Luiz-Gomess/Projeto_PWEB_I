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
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-candidato-dashboard',
  templateUrl: './dashboard-candidato.component.html',
  standalone: true,
  imports: [
    NavbarComponent, 
    FooterComponent, 
    MatIcon, 
    CandidatoCardProfileComponent, 
    CommonModule, 
    CardVagaComponent, 
    FormsModule, 
    ReactiveFormsModule
  ],
  styleUrl: './dashboard-candidato.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CandidatoDashboardComponent implements OnInit {
  candidato!: Candidato;
  candidaturas: Vaga[] | null = null;
  activeSection: string = 'perfil';
  sidebarOpen: boolean = true; 
  perfilForm!: FormGroup;
  habilidadesInput: string = '';
  listaHabilidades: string[] = [];

  notificacoes: Notificacao[] = [];

  sidebarLinks = [
    { label: 'Perfil', icon: 'person', section: 'perfil' },
    { label: "Atualizar Perfil", icon: "edit", section: "atualizar-perfil" },
    { label: 'Candidaturas', icon: 'work', section: 'candidaturas' },
    { label: "Notificações", icon: "notifications", section: "notificacoes" },
    { label: 'Vagas', icon: 'search', section: 'vagas' }
  ];

  constructor(
    private userStateService: UserStateService, 
    private router: Router, 
    private notificacaoService: NotificacaoFirestoreService, 
    private candidatoService: CandidatoService, 
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    if (!this.userStateService.getCandidato()) {
      this.router.navigate(['/login']);
    }

    this.candidato = this.userStateService.getCandidato() as Candidato;
    this.listaHabilidades = this.candidato.habilidades || [];
    
    this.notificacaoService.listar(this.candidato.cpf).subscribe((notificacoes) => {
      this.notificacoes = notificacoes;
      console.log(this.notificacoes)
    });
  }

  adicionarHabilidade() {
    if (this.habilidadesInput.trim()) {
      this.listaHabilidades.push(this.habilidadesInput.trim());
      this.candidato.habilidades = this.listaHabilidades;
      this.habilidadesInput = ''; // Limpa o input
    }
  }

  removerHabilidade(index: number) {
    this.listaHabilidades.splice(index, 1); // Remove a habilidade do array
  }

  salvarAlteracoes() {
    this.candidatoService.atualizarCandidato(this.candidato).subscribe({
      next: (candidato) => {
        this.candidato = candidato;
        this.userStateService.setCandidato(candidato);
        this.alertService.showSuccess("Alterações Salvas")
      },
      error: (err) => {
        console.error('Erro ao atualizar candidato:', err);
      }
    });
  }

  navigateToListagemVagas() {
    this.router.navigate(['/listagem-vagas']);
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  setActiveSection(section: string) {
    if (section === 'candidaturas') {
      this.candidatoService.listarCandidaturas(this.candidato.cpf).subscribe((candidaturas: Vaga[]) => {
        this.candidaturas = candidaturas;
      });
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
}
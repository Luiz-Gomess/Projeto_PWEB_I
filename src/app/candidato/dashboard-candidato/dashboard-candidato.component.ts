import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CandidatoStateService } from '../../shared/services/candidato-state.service';
import { Candidato } from '../../shared/models/candidato';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CandidatoCardProfileComponent } from '../candidato-card-profile/candidato-card-profile.component';

@Component({
  selector: 'app-candidato-dashboard',
  templateUrl: './dashboard-candidato.component.html',
  imports: [NavbarComponent, FooterComponent, MatIcon, CandidatoCardProfileComponent, CommonModule],
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

  activeSection: string = 'perfil';
  sidebarOpen: boolean = true; // Sidebar começa aberta

  sidebarLinks = [
    { label: 'Perfil', icon: 'person', section: 'perfil' },
    { label: 'Candidaturas', icon: 'work', section: 'candidaturas' },
    { label: 'Vagas', icon: 'search', section: 'vagas' }
  ];

  constructor(private candidatoStateService: CandidatoStateService, private router: Router) {}

  navigateToListagemVagas() {
    this.router.navigate(['/listagem-vagas'])
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen; // Alterna o estado da sidebar
  }

  ngOnInit() {
    if(!this.candidatoStateService.getCandidato()) {
      this.router.navigate(['/login-candidato'])
    }
    this.candidato = this.candidatoStateService.getCandidato() as Candidato;
  }
}



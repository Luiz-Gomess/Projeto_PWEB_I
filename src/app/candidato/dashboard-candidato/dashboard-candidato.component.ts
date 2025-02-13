import { Component, OnInit } from '@angular/core';
import { CandidatoStateService } from '../../services/candidato-state.service';
import { Candidato } from '../../models/candidato';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-candidato-dashboard',
  templateUrl: './dashboard-candidato.component.html',
  imports: [NavbarComponent, FooterComponent],
  styleUrl: './dashboard-candidato.component.css'
})

export class CandidatoDashboardComponent implements OnInit {
  candidato: Candidato = new Candidato(
    '',
    '',
    '',
    ''
  );

  constructor(private candidatoStateService: CandidatoStateService, private router: Router) {}


  navigateToListagemVagas() {
    this.router.navigate(['/listagem-vagas'])
  }

  ngOnInit() {
    if(!this.candidatoStateService.getCandidato()) {
      this.router.navigate(['/login-candidato'])
    }
    this.candidato = this.candidatoStateService.getCandidato() as Candidato;
  }
}



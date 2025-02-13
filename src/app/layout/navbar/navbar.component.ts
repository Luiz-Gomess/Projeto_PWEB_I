import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CandidatoStateService } from '../../services/candidato-state.service';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, MenuComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private candidateStateService: CandidatoStateService) {}
  isAuthenticated: boolean = false;

  navigateToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    if(this.candidateStateService.getCandidato()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }
}

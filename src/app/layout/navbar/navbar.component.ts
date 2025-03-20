import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserStateService } from '../../shared/services/user-state.service';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, MenuComponent, MatMenuModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private userStateService: UserStateService) {}
  isAuthenticated: boolean = false;

  navigateToHome() {
    this.router.navigate(['/']);
  }

  setUserAndGoToLogin(type: "c" | "r") {
    this.userStateService.setTypeUser(type);
    this.router.navigate(['/login']);
  }

  setUserAndGoToCadastro(type: "c" | "r") {
    this.userStateService.setTypeUser(type);
    this.router.navigate(['/cadastro']);
  }

  ngOnInit() {
    if(this.userStateService.getCandidato()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }
}

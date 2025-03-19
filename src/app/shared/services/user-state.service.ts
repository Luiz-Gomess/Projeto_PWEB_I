import { Injectable } from '@angular/core';
import { Candidato } from '../models/candidato';
import { Recrutador } from '../models/recrutador';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private user: Candidato | Recrutador | null = null;

  constructor() {
    const userSalvo = localStorage.getItem('user');
    if (userSalvo) {
      this.user = JSON.parse(userSalvo);
    }
  }

  setTypeUser(type: 'c' | 'r') {
    localStorage.setItem('typeUser', type);
  }

  getTypeUser(): 'c' | 'r' {
    return localStorage.getItem('typeUser') as 'c' |
      'r';
  }

  setCandidato(candidato: Candidato) {
    this.user = candidato;
    localStorage.setItem('user', JSON.stringify(candidato));
  }

  getCandidato(): Candidato | null {
    return this.user as Candidato;
  }

  setRecruiter(recruiter: Recrutador) {
    this.user = recruiter;
    localStorage.setItem('user', JSON.stringify(recruiter));
  }

  getRecruiter(): Recrutador | null {
    return this.user as Recrutador;
  }

  limparUser() {
    this.user = null;
    localStorage.removeItem('user');
  }
}

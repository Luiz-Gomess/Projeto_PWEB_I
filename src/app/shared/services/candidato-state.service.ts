import { Injectable } from '@angular/core';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoStateService {
  private candidato: Candidato | null = null;

  constructor() {
    const candidatoSalvo = localStorage.getItem('candidato');
    if (candidatoSalvo) {
      this.candidato = JSON.parse(candidatoSalvo);
    }
  }

  setCandidato(candidato: Candidato) {
    this.candidato = candidato;
    localStorage.setItem('candidato', JSON.stringify(candidato));
  }

  getCandidato(): Candidato | null {
    return this.candidato;
  }
  
  limparCandidato() {
    this.candidato = null;
    localStorage.removeItem('candidato');
  }
}

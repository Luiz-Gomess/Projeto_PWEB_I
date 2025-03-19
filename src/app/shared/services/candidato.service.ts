import { Injectable } from '@angular/core';
import { Observable, map, switchMap, throwError,catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidato } from '../models/candidato';
import { Vaga } from '../models/vaga';
import { VagaService } from './vaga.service';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private apiUrl = "http://localhost:8080/candidatos"; 

  constructor(private http: HttpClient, private vagaService: VagaService){}

  listarCandidatos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(this.apiUrl);
  }

  buscarCandidato(cpf: string): Observable<any> {
    return this.http.get<Candidato[]>(`${this.apiUrl}/${cpf}`);
  }

  atualizarCandidato(candidato: any): Observable<Candidato> {
    return this.http.put<Candidato>(`${this.apiUrl}/${candidato.id}`, candidato);
  }

  // Método para logar um candidato improvisado para fins de teste
  logar(cpf: string, senha: string): Observable<Candidato> {
    if (!cpf.trim()) {
      return throwError(() => new Error('CPF não pode estar vazio'));
    }

    return this.buscarCandidato(cpf).pipe(
      switchMap((candidato) => {
        if (candidato.senha === senha) {
          return of(candidato);
        } else {
          return throwError(() => new Error('Senha incorreta'));
        }
      })
    );
  }

  cadastrar(candidato: Candidato): Observable<Candidato> {
    return this.http.post<Candidato>(this.apiUrl, candidato)
  }

  deletarPerfil(cpf: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cpf}`);
  }

  listarCandidaturas(cpfCandidato: string): Observable<any[]> {
    return this.http.get<Vaga[]>(`${this.apiUrl}/candidaturas/${cpfCandidato}`);
  }

  candidatar(idVaga: string, cpfCandidato: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${cpfCandidato}/candidatar/${idVaga}`, {});
  }
  
  removerCandidatura(idVaga: string, cpfCandidato: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/${cpfCandidato}/removercandidatura/${idVaga}`, {});
  }
}

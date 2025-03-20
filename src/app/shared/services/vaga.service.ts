import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Vaga } from '../models/vaga';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  public apiUrl = 'http://localhost:8080/vagas';

  constructor(private http: HttpClient) { }

  listarVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl);
  }

  buscarVaga(id: string): Observable<Vaga | null> {
    return this.http.get<Vaga>(`${this.apiUrl}/${id}`);
  }

  listarCandidaturas(id: string): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(`${this.apiUrl}/${id}/candidaturas`);
  }
  
  atualizarVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.put<Vaga>(`${this.apiUrl}/${vaga.id}`,vaga)
  }

  criarVaga(vaga: Vaga, cpf: string): Observable<any>{
    return this.http.post<Vaga>(`${this.apiUrl}/${cpf}`, vaga);
  }  

  deletarVaga(id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}

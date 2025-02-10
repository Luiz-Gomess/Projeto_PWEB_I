import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Vaga } from '../models/vaga';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  public apiUrl = 'http://localhost:3000/vagas'; // URL da sua API JSON

  constructor(private http: HttpClient) { }

  listarVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl);
  }

  buscarVaga(id: number): Observable<Vaga | null> {
    return this.http.get<Vaga[]>(`${this.apiUrl}?id=${id}`).pipe(
      map(vagas => (vagas.length > 0 ? vagas[0] : null)) // Retorna a vaga ou null
    );
  }
  
  atualizarVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.put<Vaga>(`${this.apiUrl}/${vaga.id}`,vaga)
  }

  
}

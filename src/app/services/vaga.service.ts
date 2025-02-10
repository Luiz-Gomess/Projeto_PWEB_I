import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga } from '../models/vaga';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  private apiUrl = 'http://localhost:3000/vagas'; // URL da sua API JSON

  constructor(private http: HttpClient) { }

  listarVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl);
  }

  buscarVaga(id: number): Observable<Vaga> {
    return this.http.get<Vaga>(`${this.apiUrl}?id=${id}`);
  }
}

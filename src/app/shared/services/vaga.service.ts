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

  criarVaga(vaga: Vaga, cpf: string): Observable<Vaga>{
    return this.http.post<Vaga>(`${this.apiUrl}/${cpf}`, vaga);
  }  

  deletarVaga(id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //Verifica se a vaga existe
  verificacaoVaga(id: string): Observable<boolean>{
    return this.buscarVaga(id).pipe(
      map((vaga) => {
        return vaga ? true : false;
      })
    )
  }

  //Gera um id para a vaga
  gerarIdVaga():Observable<string>{
  return this.listarVagas().pipe(
    map((vagas) => {
      if(vagas.length === 0){
        return '1';
      }else{
        return String(Number(vagas[vagas.length-1].id) + 1);
      }
    })
  )}
}

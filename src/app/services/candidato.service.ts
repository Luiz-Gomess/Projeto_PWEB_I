import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidato } from '../models/candidato';
import { Vaga } from '../models/vaga';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private api_url = 'http://localhost:3000/candidatos'; 

  constructor(private http: HttpClient){}

  cadastrar(candidato: Candidato): Observable<Candidato> {
    return this.http.post<Candidato>(this.api_url, candidato);
  }

  deletarPerfil(cpf:string): Observable<any>{
    return this.http.delete(`${this.api_url}/${cpf}`);
  }

  listarCandidaturas(cpf:string):Observable<Vaga[]>{
    const idsCandidaturas = this.http.get<any>(`${this.api_url}?cpf=${cpf}`)
    //INCOMPLETO
  }

  candidatar(idVaga: string, cpfCandidato: string){

  }

  removerCandidatura(idVaga: string, cpfCandidato: string){

  }



}

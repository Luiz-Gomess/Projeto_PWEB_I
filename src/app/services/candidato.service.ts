import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidato } from '../models/candidato';
import { Vaga } from '../models/vaga';
import { VagaService } from './vaga.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private apiUrl = 'http://localhost:3000/'; 

  constructor(private http: HttpClient, private vagaService: VagaService){}

  cadastrar(candidato: Candidato): Observable<Candidato> {
    return this.http.post<Candidato>(this.apiUrl, candidato);
  }

  deletarPerfil(cpf:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${cpf}`);
  }

  listarCandidaturas(cpf: string): Observable<Vaga[]> {
    let idsCandidaturas:number[] = [];
    let gambiarra: Observable <Vaga[]> = of([]);
    
    this.http.get<Candidato[]>(`${this.apiUrl}candidatos?cpf=${cpf}`).subscribe(candidatos => {
      idsCandidaturas = candidatos[0].candidaturas;

      const queryString = idsCandidaturas.map(id => `id=${id}`).join("&");

      gambiarra = this.http.get<Vaga[]>(`${this.apiUrl}vagas?${queryString}`)
    })

    return gambiarra;
    
  }


  candidatar(idVaga: string, cpfCandidato: string){

  }

  removerCandidatura(idVaga: string, cpfCandidato: string){

  }



}

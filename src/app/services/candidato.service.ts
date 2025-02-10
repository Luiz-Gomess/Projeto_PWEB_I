import { Injectable } from '@angular/core';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidato } from '../models/candidato';
import { Vaga } from '../models/vaga';
import { VagaService } from './vaga.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private apiUrl = 'http://localhost:3000/candidatos'; 

  constructor(private http: HttpClient, private vagaService: VagaService){}

  buscarCandidato(cpf: string): Observable<any > {
    return this.http.get<any[]>(`${this.apiUrl}?cpf=${cpf}`).pipe(
      map((candidatos:any) => candidatos.length > 0 ? candidatos[0] : null) // Retorna apenas o primeiro candidato encontrado ou null
    );
  }

  cadastrar(candidato: Candidato): Observable<Candidato> {
    return this.http.post<Candidato>(this.apiUrl, candidato);
  }

  deletarPerfil(cpf: string): Observable<any> {
    return this.buscarCandidato(cpf).pipe(
      switchMap((candidato) => {
        if (candidato) {
          return this.http.delete(`${this.apiUrl}/${candidato.id}`);
        } else {
          return throwError(() => new Error('Candidato não encontrado'));
        }
      })
    );
  }

  listarCandidaturas(listaIDSVagas: number[]): Observable<Vaga[]> {
    return this.vagaService.listarVagas().pipe(
      map((vagas) => vagas.filter(vaga => listaIDSVagas.includes(Number(vaga.id)))) // Filtra os IDs desejados
    );
  }

  candidatar(idVaga: number, cpfCandidato: string){
    this.buscarCandidato(cpfCandidato).subscribe(candidato => {
        let candidatoDash: Candidato = candidato;
        candidatoDash.candidaturas.push(idVaga);
    });

    this.vagaService.buscarVaga(idVaga).subscribe(vaga => {
        let vagaDash: Vaga = vaga;
        vagaDash.candidatos.push(cpfCandidato)
    })
}

  removerCandidatura(idVaga: string, cpfCandidato: string){

  }



}

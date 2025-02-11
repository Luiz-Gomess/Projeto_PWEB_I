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

  listarCandidatos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(this.apiUrl);
  }

  buscarCandidato(cpf: string): Observable<any> {
    return this.http.get<Candidato[]>(`${this.apiUrl}?cpf=${cpf}`).pipe(
      map((candidato: Candidato[]) => {
        if(candidato.length > 0){
          return candidato[0]
        }else{
          return throwError(() => new Error('Candidato não encontrado'));
        }
      })
    );
  }

  atualizarCandidato(candidato: any): Observable<Candidato> {
    return this.http.put<Candidato>(`${this.apiUrl}/${candidato.id}`, candidato);
  }

  cadastrar(candidato: Candidato): Observable<Candidato> {
    return this.buscarCandidato(candidato.cpf).pipe(
      switchMap((candidatoVerificado) => {
        if(candidatoVerificado instanceof Candidato){
          return throwError(() => new Error('CPF já cadastrado'));
        } else{
          return this.http.post<Candidato>(this.apiUrl, candidato);
        }
      })
    )
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

  listarCandidaturas(listaIDSVagas: string[]): Observable<Vaga[]> {
    return this.vagaService.listarVagas().pipe(
      map((vagas) => vagas.filter(vaga => listaIDSVagas.includes(vaga.id))) // Filtra os IDs desejados
    );
  }

  candidatar(idVaga: string, cpfCandidato: string): Observable<any> {
    return this.vagaService.buscarVaga(idVaga).pipe(
      switchMap((vaga) => 
        this.buscarCandidato(cpfCandidato).pipe(
          switchMap((candidato) => {
            if (!vaga ) {
              return throwError(() => new Error('Vaga não encontrada'));
            }
            else if (candidato.candidaturas.includes(idVaga)){
              return throwError(() => new Error('Candidato já cadastrado nesta vaga'));
            }

            vaga.candidatos.push(candidato.cpf);
            candidato.candidaturas.push(idVaga);
  
            return this.vagaService.atualizarVaga(vaga).pipe(
              switchMap(() => this.atualizarCandidato(candidato))
            )
          })
        )
      )
    );
  }
  
  removerCandidatura(idVaga: string, cpfCandidato: string): Observable<any>{
    return this.vagaService.buscarVaga(idVaga).pipe(
      switchMap((vaga) => 
        this.buscarCandidato(cpfCandidato).pipe(
          switchMap((candidato) => {
            if (!vaga || !candidato) {
              return throwError(() => new Error('Vaga ou Candidato não encontrado'));
            }
            else if (!candidato.candidaturas.includes(idVaga)){
              return throwError(() => new Error('Candidato não está cadastrado nesta vaga'));
            }

            const candIndex = vaga.candidatos.indexOf(candidato.cpf)
            const vagaIndex = candidato.candidaturas.indexOf(idVaga)

            vaga.candidatos.splice(candIndex, 1);
            candidato.candidaturas.splice(vagaIndex, 1);
  
            return this.vagaService.atualizarVaga(vaga).pipe(
              switchMap(() => this.atualizarCandidato(candidato))
            )
          })
        )
      )
    );
  }

}

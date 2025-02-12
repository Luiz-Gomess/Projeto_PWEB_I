import { Injectable } from '@angular/core';
import { Recrutador } from '../models/recrutador';
import { Vaga } from '../models/vaga';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, switchMap, of } from 'rxjs';
import { VagaService } from './vaga.service';

@Injectable({
  providedIn: 'root'
})
export class RecrutadorService {

  private apiUrl = 'http://localhost:3000/recrutadores';

  constructor(private http: HttpClient, private vagaService: VagaService) { }

  listarRecrutadores(): Observable<Recrutador[]> {
      return this.http.get<Recrutador[]>(this.apiUrl);
    }

   buscarRecrutador(cnpj: string): Observable<any> {
      return this.http.get<Recrutador[]>(`${this.apiUrl}?cnpj=${cnpj}`).pipe(
        map((candidatos: Recrutador[]) => {
          if (candidatos.length > 0) {
            return candidatos[0];
          } else {
            throw new Error('Recrutador não encontrado'); // Lança erro corretamente
          }
        })
      );
    }

    atualizarRecrutador(recrutador: any): Observable<Recrutador> {
      return this.http.put<Recrutador>(`${this.apiUrl}/${recrutador.id}`, recrutador);
    }

    logar(cnpj: string, senha: string): Observable<Recrutador> {
      return this.buscarRecrutador(cnpj).pipe(
        catchError((error) => throwError(() => new Error(error.message))), // Propaga erro corretamente
        switchMap((recrutador) => {
          if (recrutador.senha === senha) {
            return of(recrutador);
          } else {
            return throwError(() => new Error('Senha incorreta'));
          }
        })
      );
    }

    cadastrar(recrutador: Recrutador): Observable<Recrutador> {
      return this.buscarRecrutador(recrutador.cnpj).pipe(
        switchMap(() => {
          return throwError(() => new Error('CNPJ já cadastrado'));
        }),
        catchError((error) => {
          if (error.message === 'Recrutador não encontrado') {
            return this.http.post<Recrutador>(this.apiUrl, recrutador);
          }
          return throwError(() => error);
        })
      );
    }

    deletarPerfil(cpf: string): Observable<any> {
      return this.buscarRecrutador(cpf).pipe(
        switchMap((candidato) => {
          if (candidato) {
            return this.http.delete(`${this.apiUrl}/${candidato.id}`);
          } else {
            return throwError(() => new Error('Candidato não encontrado'));
          }
        })
      );
    }

      listarVagasGerenciadas(listaIDSVagas: string[]): Observable<Vaga[]> {
        return this.vagaService.listarVagas().pipe(
          map((vagas) => vagas.filter(vaga => listaIDSVagas.includes(vaga.id))) 
        );
      }
}

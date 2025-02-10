import { Injectable } from '@angular/core';
import { Observable, map, switchMap, throwError, catchError, forkJoin } from 'rxjs';
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
      map((candidatos:any) => candidatos.length > 0 ? candidatos[0] : null)
    );
  }

  atualizarCandidato(candidato: Candidato): Observable<Candidato> {
    return this.http.put<Candidato>(`${this.apiUrl}/${candidato.id}`, candidato);
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

  // candidatar(idVaga: number, cpfCandidato: string): Observable<any> {
  //   return this.vagaService.buscarVaga(idVaga).pipe(
  //     switchMap((vaga) => {
  //       if (!vaga) {
  //         return throwError(() => new Error('Vaga não encontrada'));
  //       }

  //       return this.buscarCandidato(cpfCandidato).pipe(
  //         switchMap((candidato) => {
  //           if (!candidato) {
  //             return throwError(() => new Error('Candidato não encontrado'));
  //           }

  //           // Verifica se o candidato já está cadastrado na vaga
  //           if (vaga.candidatos && vaga.candidatos.find(cpf => cpf === candidato.cpf)) {
  //              return throwError(() => new Error('Candidato já cadastrado nesta vaga'));
  //           }

  //           // Se a vaga não tiver candidatos, inicializa o array
  //           if (!vaga.candidatos) {
  //              vaga.candidatos = [];
  //           }

  //           vaga.candidatos.push(candidato);

  //           // Atualiza a vaga no backend usando o método atualizarVaga
  //           return this.vagaService.atualizarVaga(vaga).pipe(
  //             switchMap(() => { // Após atualizar a vaga, atualiza o candidato
  //                 candidato.candidaturas = [...(candidato.candidaturas || []), idVaga];
  //                 return this.atualizarCandidato(candidato).pipe(
  //                   map(() => ({ message: 'Candidatura realizada com sucesso', vaga: vaga }))
  //                 );
  //             }),
  //             catchError((error) => {
  //               console.error('Erro ao atualizar candidato:', error);
  //               return throwError(() => new Error('Erro ao candidatar-se para a vaga'));
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // }


  candidatar(idVaga: number, cpfCandidato: string): Observable<any> {
    return this.vagaService.buscarVaga(idVaga).pipe(
      switchMap((vaga) => 
        this.buscarCandidato(cpfCandidato).pipe(
          switchMap((candidato) => {
            if (!vaga || !candidato) {
              return throwError(() => new Error('Vaga ou Candidato não encontrado'));
            }

            vaga.candidatos = [...(vaga.candidatos || []), candidato.cpf];

            candidato.candidaturas = [...(candidato.candidaturas || []), idVaga];
  
            return this.vagaService.atualizarVaga(vaga).pipe(
              switchMap(() => this.atualizarCandidato(candidato))
            )
          })
        )
      )
    );
  }
  
  
  

  removerCandidatura(idVaga: string, cpfCandidato: string){

  }



}

import { Injectable } from '@angular/core';
import { Observable, map, switchMap, throwError,catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidato } from '../models/candidato';
import { Vaga } from '../models/vaga';
import { VagaService } from './vaga.service';
import { environment } from '../../../environments/environments';
import { Recrutador } from '../models/recrutador';

@Injectable({
    providedIn: 'root'
  })
export class RecrutadorService {
    private apiUrl = "http://localhost:8080/recrutadores";

    constructor(private http: HttpClient, private vagaService: VagaService){}

    cadastrar(recrutador: Recrutador): Observable<Recrutador> {
        return this.http.post<Recrutador>(this.apiUrl, recrutador)
    }

    buscarRecrutador(cpf: string): Observable<any> {
        return this.http.get<Recrutador[]>(`${this.apiUrl}/${cpf}`);
    }

    logar(cpf: string, senha: string): Observable<Recrutador> {
        if (!cpf.trim()) {
            return throwError(() => new Error('cpf não pode estar vazio'));
        }

        return this.buscarRecrutador(cpf).pipe(
            switchMap((recrutador) => {
                if (recrutador.senha === senha) {
                    return of(recrutador);
                } else {
                    return throwError(() => new Error('Senha incorreta'));
                }
            })
        );
    }

    listarVagasRecrutador(cpf: string): Observable<Vaga[]> {
        console.log("estou chamando a api", cpf)
        return this.http.get<Vaga[]>(`${this.apiUrl}/${cpf}/vagas`);
    }
} 
    
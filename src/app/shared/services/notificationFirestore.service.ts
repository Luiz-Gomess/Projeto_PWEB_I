import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc, updateDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VagaService } from './vaga.service';

export interface Notificacao {
  id?: string;
  idUsuario: string;
  mensagem: string;
  lida: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacaoFirestoreService {
  
  private NOME_COLECAO = 'notificacoes';

  constructor(private firestore: Firestore, private vagaService: VagaService) {}

  listar(idUsuario: string): Observable<Notificacao[]> {
    const notificacoesRef = collection(this.firestore, this.NOME_COLECAO);
    const queryRef = query(notificacoesRef, 
      where('idUsuario', '==', idUsuario), 
    );
    return collectionData(queryRef, { idField: 'id' }) as Observable<Notificacao[]>;
  }

  async adicionar(idVaga: string, msg: string): Promise<void> {
    this.vagaService.listarCandidaturas(idVaga).subscribe({
      next: async (candidaturas) => {
        for (const candidato of candidaturas) {
          let notificacao = {
            idVaga: idVaga,
            idUsuario: candidato.cpf,
            mensagem: msg
          };
  
          const notificacoesRef = collection(this.firestore, this.NOME_COLECAO);
          const id = doc(notificacoesRef).id; 
          await setDoc(doc(notificacoesRef, id), { ...notificacao, id });
        }
      },
      error: (err) => {
        console.error('Erro ao listar candidaturas:', err);
      }
    });
  }

  async marcarComoLida(id: string): Promise<void> {
    const notificacaoRef = doc(this.firestore, this.NOME_COLECAO, id);
    await updateDoc(notificacaoRef, { lida: true });
  }

  async deletar(id: string): Promise<void> {
    const notificacaoRef = doc(this.firestore, this.NOME_COLECAO, id);
    await deleteDoc(notificacaoRef);
  }
}
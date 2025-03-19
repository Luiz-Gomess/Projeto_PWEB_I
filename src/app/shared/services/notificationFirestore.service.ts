import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc, updateDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  constructor(private firestore: Firestore) {}

  listar(idUsuario: string): Observable<Notificacao[]> {
    const notificacoesRef = collection(this.firestore, this.NOME_COLECAO);
    const queryRef = query(notificacoesRef, 
      where('idUsuario', '==', idUsuario), 
      orderBy('data', 'desc')
    );
    return collectionData(queryRef, { idField: 'id' }) as Observable<Notificacao[]>;
  }

  async adicionar(notificacao: Notificacao): Promise<void> {
    const notificacoesRef = collection(this.firestore, this.NOME_COLECAO);
    const id = doc(notificacoesRef).id; // Gera um ID automático
    await setDoc(doc(notificacoesRef, id), { ...notificacao, id });
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
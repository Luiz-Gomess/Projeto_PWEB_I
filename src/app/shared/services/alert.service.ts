import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // Método para mostrar um alerta de sucesso
  showSuccess(message: string, title: string = 'Sucesso'): Promise<any> {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'Fechar'
    });
  }

  // Método para mostrar um alerta de erro
  showError(message: string, title: string = 'Erro'): Promise<any> {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'Fechar'
    });
  }

  // Método para mostrar um alerta de informação
  showInfo(message: string, title: string = 'Informação'): Promise<any> {
    return Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonText: 'Fechar'
    });
  }

  // Método para mostrar um alerta de aviso
  showWarning(message: string, title: string = 'Atenção'): Promise<any> {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'Fechar'
    });
  }

  // Método para mostrar um alerta de pergunta
  showQuestion(message: string, title: string = 'Você tem certeza?'): Promise<any> {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    });
  }
}

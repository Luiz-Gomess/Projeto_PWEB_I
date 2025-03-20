import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../shared/services/alert.service'

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((erro: HttpErrorResponse): Observable<never> => {
      console.error('Erro HTTP Interceptado:', `Erro: ${erro.status} - ${erro.error.error}`); 
      const alert = new AlertService()
      alert.showError(erro.error.error)
      return throwError(() => erro);
    })
  );
};

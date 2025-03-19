import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((erro: HttpErrorResponse): Observable<never> => {
      console.error('Erro HTTP Interceptado:', erro); 
      window.alert(`Erro: ${erro.status} - ${erro.message}`);
      return throwError(() => erro);
    })
  );
};

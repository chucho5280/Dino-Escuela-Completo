import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  //baseUri: string = 'http://localhost:4000/api';
  baseUri: string = 'https://dino-escuela.onrender.com/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }

  //método para agregar un empleado nuevo
  agregarEstudiante(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorManager));
  }

  //método para obtener a todos los empleados
  getEstudiantes() {
    let url = `${this.baseUri}/estudiantes`;
    return this.http.get(url);
  }

  //método para obtener un empleado con su id
  getEstudiante(id): Observable<any> {
    let url = `${this.baseUri}/estudiante/${id}`;
    return this.http.get(url, {headers: this.headers})
                    .pipe(map((res: Response) => {
                      return res || {};
                    }),
                      catchError(this.errorManager)
                    );
  }

  //método para actualizar un empleado
  updateEstudiante(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, {headers: this.headers})
                    .pipe(catchError(this.errorManager));
  }

  //método para eliminar un empleado
  deleteEstudiante(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, {headers: this.headers})
                    .pipe(catchError(this.errorManager));
  }

  //manejador de errores
  errorManager(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      //obtener el error del lado del cliente
      errorMessage = error.error.message;
    } else {
      //obtenemos el error del lado del servidor
      errorMessage = `Error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}

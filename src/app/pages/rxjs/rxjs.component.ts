import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    let i = -1;
    const obs$ = new Observable(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 2){
          console.log('error');
          observer.error(' es 2');
        }

        if ( i === 4){
          clearInterval(intervalo);
          observer.complete();
        }
      }, 500);
    });

    obs$.pipe(
      retry(2)
    ).subscribe((valor) => {
      console.log( 'No:', valor);
    },
    (error) => {
      console.warn('Ocurrio un error');
    },
    () => {
      console.log('Proceso terminado');
    }
    );
   }
}

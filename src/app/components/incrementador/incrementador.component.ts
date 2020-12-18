import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  ngOnInit(): void{
   this.btnClass = `btn ${this.btnClass}`;
  }
  @Input() progreso: number = 90;
  @Input() btnClass: string = 'btn-primary';

  @Output() varlorSalida: EventEmitter<number> = new EventEmitter();

  get getPorcentaje(){
    return `${this.progreso}%`;
  }

  cambiarValor (valor: number){
    if (this.progreso >= 100 && valor >= 0){
      this.varlorSalida.emit(100);
    return(this.progreso = 100);
  }
    if (this.progreso <= 0 && valor < 0){
    this.varlorSalida.emit(0);
    return(this.progreso = 0);
  }

    this.progreso = this.progreso + valor;
    this.varlorSalida.emit(this.progreso);
  }

  onChanges (nuevoValor:number){
    if (nuevoValor >= 100){
      this.progreso = 100;
    }else if (nuevoValor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }
    this.varlorSalida.emit(this.progreso);
  }
}

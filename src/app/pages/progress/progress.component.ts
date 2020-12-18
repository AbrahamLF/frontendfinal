import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent{
 progreso1:number = 25;
 progreso2:number = 35;

 get getprogreso1(){
   return `${this.progreso1}%`;
 }
 get getprogreso2(){
   return `${this.progreso2}%`;
 }
}

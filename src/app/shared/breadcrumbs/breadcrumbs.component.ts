import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;
  constructor(private router:Router, private route: ActivatedRoute) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(({titulo})=>{
      this.titulo = titulo;
      document.title = `Conec V5 - ${titulo}`;
    });
   }
   ngOnDestroy(): void{
     this.tituloSubs$.unsubscribe();
   }

  getArgumentosRuta(){
     return this.router.events.pipe(
       filter((event) => event instanceof ActivationEnd),
       filter((event: ActivatedRoute) => event.snapshot.firstChild === null),
       map((event: ActivationEnd) => event.snapshot.data)
     );
   }

}

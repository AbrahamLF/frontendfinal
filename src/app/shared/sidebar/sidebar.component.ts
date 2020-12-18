import { Component, OnInit } from '@angular/core';
import { SidebarsService } from '../../services/sidebars.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(private sidebarsService: SidebarsService) {
    this.menuItems = sidebarsService.menu;
   }

  ngOnInit(): void {
  }

}

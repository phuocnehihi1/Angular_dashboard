import { Component } from '@angular/core';
import { navItems } from './_Nav';
import { IconSetService } from '@coreui/icons-angular';
import {
  cilApps,
  cilArrowRight,
  cilPencil,
  cilSpeedometer,
} from '@coreui/icons';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  navItems = navItems;

  constructor(private iconSetService: IconSetService) {
    this.iconSetService.icons = {
      cilSpeedometer,
      cilPencil,
      cilArrowRight,
      cilApps,
    };
  }
}

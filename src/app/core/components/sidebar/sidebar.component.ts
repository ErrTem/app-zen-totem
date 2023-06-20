import { Component } from '@angular/core';
import { AuthService } from "@core/services/auth.service";

// todo create config, ngFor for display menu links, update html add <a>
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
  constructor(private readonly authService: AuthService) {
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}

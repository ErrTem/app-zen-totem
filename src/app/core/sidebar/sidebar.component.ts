import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from "../../features/auth/auth.service";

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

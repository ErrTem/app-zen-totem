import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  firstName: string = 'John';
  lastName: string = 'Doe';

  public login(): void {
    console.log('login');
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { UserStructure } from '../../states/user.state';
import { logoutUser } from '../../actions/user.actions';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  store = inject(Store<{ user: UserStructure }>);
  name : string = localStorage.getItem('Name') || '';
  logoutFun() {
    this.store.dispatch(logoutUser());
    this.name = '';
    localStorage.removeItem('UserPresent');
  }
}

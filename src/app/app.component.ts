import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './states/app.state';
import { loginUser } from './actions/user.actions';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, EffectsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BankFrontend';
  store = inject(Store<{ appStore: AppStateInterface }>);
  name: string = localStorage.getItem('Name') || '';

  // ngOnInit(): void {
  //   if (this.name !== '') {
  //     this.store.dispatch(loginUser({ name: this.name }));
  //   }
  // }
}

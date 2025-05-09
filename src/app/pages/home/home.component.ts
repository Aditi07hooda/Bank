import { Component } from '@angular/core';
import { AddAccountComponent } from '../../Components/add-account/add-account.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [AddAccountComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-loan-request',
  imports: [CommonModule, RouterModule],
  templateUrl: './loan-request.component.html',
  styleUrl: './loan-request.component.css',
})
export class LoanRequestComponent {
}

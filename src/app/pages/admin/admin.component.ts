import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  
}

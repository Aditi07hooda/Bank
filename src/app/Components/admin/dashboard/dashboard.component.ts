import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { GetAllNumbersResponse } from '../../../states/loan.state';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  totalUsers: number = 0;
  approvedLoans: number = 0;
  rejectedLoans: number = 0;
  requestedLoans: number = 0;

  error: string | null = null;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.service.getAllNumbers().subscribe({
      next: (data: GetAllNumbersResponse) => {
        this.approvedLoans = data.value.acceptedLoans;
        this.rejectedLoans = data.value.rejectedLoans;
        this.requestedLoans = data.value.requestedLoans;
        this.totalUsers = data.value.totalUsers;
      },
      error: (err) => {
        console.log('error in getting all numbers ', err);
        this.error = 'Error in getting all the numbers';
      },
    });
  }
}

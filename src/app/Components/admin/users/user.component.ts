import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userAccounts: any = [];
  success: string = '';
  error: string = '';

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.service.getAllUserAccount().subscribe((data) => {
      this.userAccounts = data;
      console.log('all user account is -', data);
    });
  }
  deleteUser(id: number) {
    console.log('the id of user to be removed - ', id);
    this.service.deleteAccount(id).subscribe({
      next: (data) => {
        console.log('user account deleted -', data);
        this.userAccounts.filter((acc:any) => acc.id !== id);
        this.success = `User Account with id ${id} deleted successfully`;
      },
      error: (err)=> {
        console.log("Error in deleting the user account - ", err);
        this.error = `User account with id ${id} not deleted`;
      }
    })
  }
}

import { Component } from '@angular/core';
import { LoanService } from '../../services/loan/loan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ILoanHistoryResponse, ILoanRequest } from '../../states/loan.state';

@Component({
  selector: 'app-loan-history',
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-history.component.html',
  styleUrl: './loan-history.component.css',
})
export class LoanHistoryComponent {
  userName: string = localStorage.getItem('Name') || '';
  accountBalance: number = 0;

  loanHistory!: any;
  selectedLoan: any = null;

  paymentAmount: number = 0;
  paymentHistory: any = [];
  totalLoanAmount: number = 0;

  error: string | null = null;
  success: string | null = null;

  constructor(private service: LoanService) {}

  ngOnInit(): void {
    this.service.getLoanHistory(this.userName).subscribe((data) => {
      console.log(data);
      this.loanHistory = data;
    });
  }

  openPaymentModal(loan: ILoanRequest) {
    this.selectedLoan = loan;
    this.paymentAmount = 0;
    this.service
      .getLoanPayHistory(loan.id, this.userName)
      .subscribe((data: ILoanHistoryResponse) => {
        console.log(data.value);
        this.paymentHistory = data.value.loanPayment;
        this.totalLoanAmount = data.value.totalAmount;
        this.accountBalance = data.value.accountBalance;
      });
  }

  closePaymentModal() {
    this.selectedLoan = null;
    this.service.getLoanHistory(this.userName).subscribe((data) => {
      console.log(data);
      this.loanHistory = data;
    });
  }

  makePayment() {
    this.service
      .makeLoanPayment(this.selectedLoan.id, this.paymentAmount)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.success = 'Payment successful';
          this.paymentHistory.push();
          this.service
            .getLoanPayHistory(this.selectedLoan.id, this.userName)
            .subscribe((data: ILoanHistoryResponse) => {
              console.log(data.value);
              this.paymentHistory = data.value.loanPayment;
              this.totalLoanAmount = data.value.totalAmount;
              this.accountBalance = data.value.accountBalance;
              this.paymentAmount = 0;
            });
        },
        error: (error) => {
          console.error('Error making payment:', error);
          this.error = 'Error making payment. Please try again!!';
        },
      });
  }
}

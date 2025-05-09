import { Component } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import {
  ILoanRequest,
  LoanRequestResponse,
} from '../../../../states/loan.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-loan',
  imports: [CommonModule],
  templateUrl: './education-loan.component.html',
  styleUrl: './education-loan.component.css',
})
export class EducationLoanComponent {
  loanRequest!: ILoanRequest[];
  educationLoanreq!: ILoanRequest[];
  error!: string | null;
  success!: string | null;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.service.getAllLoanRequests().subscribe((data: LoanRequestResponse) => {
      this.loanRequest = data.value.requests;
      this.educationLoanreq = this.loanRequest.filter(
        (loan) => loan.typeOfLoans === 0
      );
    });
  }

  approveRequest(id: number) {
    this.service.approveLoanRequest(id).subscribe({
      next: (data: ILoanRequest) => {
        console.log('Loan approved:', data);
        this.loanRequest = this.loanRequest.filter((req) => req.id !== id);
        this.showSuccess('The loan is approved successfully');
      },
      error: (err) => {
        console.error('Error approving loan:', err);
        this.showError('Error approving loan. Please try again!!');
      },
    });
  }

  rejectRequest(id: number) {
    this.service.rejectLoanRequest(id).subscribe({
      next: (data: ILoanRequest) => {
        console.log('Loan rejected:', data);
        this.loanRequest = this.loanRequest.filter((req) => req.id !== id);
        this.showSuccess('The loan is rejected successfully');
      },
      error: (err) => {
        console.error('Error rejecting loan:', err);
        this.showError('Error rejecting loan. Please try again!!');
      },
    });
  }

  showError(message: string) {
    this.error = message;
    setTimeout(() => {
      this.error = null;
    }, 3000);
  }

  showSuccess(message: string) {
    this.success = message;
    setTimeout(() => {
      this.success = null;
    }, 3000);
  }

  viewPdf(base64Pdf: string | null) {
    if (!base64Pdf) return;

    const blob = this.base64ToBlob(base64Pdf, 'application/pdf');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  base64ToBlob(base64: string, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64.split(',')[1] || base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: contentType });
  }
}

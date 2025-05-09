import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan/loan.service';

@Component({
  standalone: true,
  selector: 'app-personal-loan',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-loan.component.html',
  styleUrl: './personal-loan.component.css'
})

export class PersonalLoanComponent {
  personalLoanForm: FormGroup;
  service = inject(LoanService);
  proofOfWorkFile: File | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.personalLoanForm = this.fb.group({
      fullName: [{value: localStorage.getItem('Name') || '', disabled: true}, Validators.required],
      amount: [null, [Validators.required, Validators.min(1000)]],
      term: ['', Validators.required],
      purpose: ['', Validators.required],
      annualIncome: [null, Validators.required],
      workingOrganisation: ['', Validators.required],
    });
  }

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.personalLoanForm.valid) {
      const form = new FormData();
      form.append('Name', this.personalLoanForm.get('fullName')?.value);
      form.append('Amount', this.personalLoanForm.get('amount')?.value);
      form.append('Purpose', this.personalLoanForm.get('purpose')?.value);
      form.append('Terms', this.personalLoanForm.get('term')?.value);
      form.append('AnnualIncome', this.personalLoanForm.get('annualIncome')?.value);
      form.append('WorkingOrganisation', this.personalLoanForm.get('workingOrganisation')?.value);
      form.append('ProofOfWork', this.proofOfWorkFile as File);

      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }

      this.service.requestPersonalLoan(form).subscribe({
        next: (data) => {
          this.successMessage = 'Loan application submitted successfully!';
          this.personalLoanForm.reset();
          this.proofOfWorkFile = null;

          // Re-populate disabled fullName field
          this.personalLoanForm.get('fullName')?.disable();
          this.personalLoanForm.get('fullName')?.setValue(localStorage.getItem('Name') || '');
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error requesting loan. Please try again.';
        },
      });
    } else {
      this.personalLoanForm.markAllAsTouched();
    }
  }

  getFileAttach(event: any) {
    const file: File = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      this.proofOfWorkFile = file;
    } else {
      alert('Only PDF files are allowed.');
      this.proofOfWorkFile = null;
    }
  }
}

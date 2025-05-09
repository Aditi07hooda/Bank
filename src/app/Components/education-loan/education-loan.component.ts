import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoanService } from '../../services/loan/loan.service';

@Component({
  selector: 'app-education-loan',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './education-loan.component.html',
  styleUrl: './education-loan.component.css',
})
export class EducationLoanComponent {
  educationLoanForm: FormGroup;
  service = inject(LoanService);
  proofOfAdmissionFile: File | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.educationLoanForm = fb.group({
      fullName: [
        { value: localStorage.getItem('Name') || '', disabled: true },
        Validators.required,
      ],
      amount: [null, [Validators.required, Validators.min(1000)]],
      term: ['', Validators.required],
      purpose: ['', Validators.required],
      institute: ['', Validators.required],
      instituteCountry: ['', Validators.required],
      courseName: [null, Validators.required],
    });
  }

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.educationLoanForm.valid) {
      const form = new FormData();
      form.append('Name', this.educationLoanForm.get('fullName')?.value);
      form.append('Amount', this.educationLoanForm.get('amount')?.value);
      form.append('Purpose', this.educationLoanForm.get('purpose')?.value);
      form.append('Terms', this.educationLoanForm.get('term')?.value);
      form.append('InstituteName', this.educationLoanForm.get('institute')?.value);
      form.append('InstituteCountry', this.educationLoanForm.get('instituteCountry')?.value);
      form.append('CourseName', this.educationLoanForm.get('courseName')?.value);
      form.append('ProofOfAdmission', this.proofOfAdmissionFile as File);

      this.service.requestEducationLoan(form).subscribe({
        next: (data) => {
          this.successMessage = 'Loan application submitted successfully!';
          this.educationLoanForm.reset();
          this.proofOfAdmissionFile = null;

          // Re-populate disabled fullName field
          this.educationLoanForm.get('fullName')?.disable();
          this.educationLoanForm.get('fullName')?.setValue(localStorage.getItem('Name') || '');
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error requesting loan. Please try again.';
        },
      });
    } else {
      this.educationLoanForm.markAllAsTouched();
    }
  }

  getFileAttach(event: any) {
    const file: File = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      this.proofOfAdmissionFile = file;
    } else {
      alert('Only PDF files are allowed.');
      this.proofOfAdmissionFile = null;
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoanService } from '../../services/loan/loan.service';

@Component({
  standalone: true,
  selector: 'app-home-loan',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-loan.component.html',
  styleUrl: './home-loan.component.css',
})
export class HomeLoanComponent {
  homeLoanForm: FormGroup;
  service = inject(LoanService);
  proofOfPropertyFile: File | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.homeLoanForm = fb.group({
      fullName: [
        { value: localStorage.getItem('Name') || '', disabled: true },
        Validators.required,
      ],
      amount: [null, [Validators.required, Validators.min(1000)]],
      term: ['', Validators.required],
      purpose: ['', Validators.required],
      propertyName: [null, Validators.required],
      propertyAddress: [null, Validators.required],
    });
  }

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.homeLoanForm.valid) {
      const form = new FormData();
      form.append('Name', this.homeLoanForm.get('fullName')?.value);
      form.append('Amount', this.homeLoanForm.get('amount')?.value);
      form.append('Purpose', this.homeLoanForm.get('purpose')?.value);
      form.append('Terms', this.homeLoanForm.get('term')?.value);
      form.append('PropertyName', this.homeLoanForm.get('propertyName')?.value);
      form.append(
        'PropertyAddress',
        this.homeLoanForm.get('propertyAddress')?.value
      );
      form.append('ProofOfProperty', this.proofOfPropertyFile as File);

      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }

      this.service.requestHomeLoan(form).subscribe({
        next: (data) => {
          console.log(data);
          this.successMessage = 'Loan application submitted successfully!';
          this.homeLoanForm.reset();
          this.proofOfPropertyFile = null;

          this.homeLoanForm.get('fullName')?.disable();
          this.homeLoanForm.get('fullName')?.setValue(localStorage.getItem('Name') || '');
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Error requesting loan. Please try again.';
        }
      });
    } else {
      this.homeLoanForm.markAllAsTouched();
    }
  }

  getFileAttach(event: any) {
    const file: File = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      this.proofOfPropertyFile = file;
    } else {
      alert('Only PDF files are allowed.');
      this.proofOfPropertyFile = null;
    }
  }
}

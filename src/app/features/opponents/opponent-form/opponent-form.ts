import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { OpponentService } from '../../../core/services/opponent';

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-opponent-form',
  styleUrl: './opponent-form.scss',
  templateUrl: './opponent-form.html',
})
export class OpponentForm {
  // Inject the OpponentService and Router
  private readonly opponentService = inject(OpponentService);
  private readonly router = inject(Router);

  // Define signals for saving state and error message
  readonly saving = signal(false);
  readonly errorMessage = signal('');

  // Define the form group with form controls for name and notes
  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      // Validators for the name field: required, max length of 100, and must contain at least one non-whitespace character
      validators: [Validators.required, Validators.maxLength(100), Validators.pattern(/\S/)],
    }),
    notes: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)],
    }),
  });

  // Handle form submission
  onSubmit(): void {
    if (this.saving()) {
      return;
    } else if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.form.valid &&
      this.opponentService.createOpponent(this.form.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['/opponents']);
        },
        error: () => {
          this.errorMessage.set('Could not save opponent. Please try again later.');
          this.saving.set(false);
        },
      });
    this.errorMessage.set('');
    this.saving.set(true);
  }
}

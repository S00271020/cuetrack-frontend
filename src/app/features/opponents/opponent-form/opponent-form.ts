import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
export class OpponentForm implements OnInit {
  // Inject the OpponentService and Router
  private readonly opponentService = inject(OpponentService);
  private readonly router = inject(Router);

  // Define signals for saving state and error message
  readonly saving = signal(false);
  readonly errorMessage = signal('');
  readonly loading = signal(false);
  readonly loadingFailed = signal(false);

  // Inject the ActivatedRoute to access route parameters
  private readonly route = inject(ActivatedRoute);

  // Define the opponent ID from the route parameters
  readonly opponentId = this.route.snapshot.paramMap.get('id');

  // Define the form group with form controls for name and notes
  readonly form = new FormGroup({
    name: new FormControl('', {
      // Ensure the name field is non-nullable and has validators for required, max length, and pattern
      nonNullable: true,
      // Validators for the name field: required, max length of 100, and must contain at least one non-whitespace character
      validators: [Validators.required, Validators.maxLength(100), Validators.pattern(/\S/)],
    }),
    notes: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)],
    }),
  });

  ngOnInit(): void {
    if (!this.opponentId) {
      return;
    }

    this.loading.set(true);

    this.opponentService.getOpponent(this.opponentId).subscribe({
      next: (opponent) => {
        this.form.patchValue({
          name: opponent.name,
          notes: opponent.notes ?? '',
        });
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not load opponent. Please try again later.');
        this.loadingFailed.set(true);
        this.loading.set(false);
      },
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.saving() || this.loading() || this.loadingFailed()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const data = this.form.getRawValue();
    const request = this.opponentId
      ? this.opponentService.editOpponent(this.opponentId, data)
      : this.opponentService.createOpponent(data);
    this.errorMessage.set('');
    this.saving.set(true);

    request.subscribe({
      next: () => {
        this.router.navigate(['/opponents']);
      },
      error: () => {
        this.errorMessage.set('Could not save opponent. Please try again later.');
        this.saving.set(false);
      },
    });
  }
}

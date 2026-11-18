import { Component, inject, signal, OnInit } from '@angular/core';
import { OpponentService } from '../../../core/services/opponent';
import { Opponent, OpponentInput } from '../../../core/models/opponent';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-opponent-list',
  styleUrl: './opponent-list.scss',
  templateUrl: './opponent-list.html',
})
export class OpponentList implements OnInit {
  private readonly opponentService = inject(OpponentService);

  // Define signals to hold the list of opponents, loading state, and error message
  readonly opponents = signal<Opponent[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly deleteErrorMessage = signal('');

  // The ngOnInit lifecycle hook is called when the component is initialized
  ngOnInit(): void {
    this.opponentService.getOpponents().subscribe({
      next: (opponents) => {
        this.opponents.set(opponents);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not load opponents. Please try again later.');
        this.loading.set(false);
      },
    });
  }

  deleteOpponent(id: string): void {
    // If the user confirms, delete the opponent
    if (!window.confirm('Delete this opponent?')) {
      return;
    }

    this.deleteErrorMessage.set('');

    this.opponentService.deleteOpponent(id).subscribe({
      next: () => {
        this.opponents.update((opponents) => opponents.filter((opponent) => opponent._id !== id));
      },
      error: (error) => {
        this.deleteErrorMessage.set(
          error.status === 409
            ? 'This opponent has recorded matches and cannot be deleted.'
            : 'Could not delete opponent. Please try again.',
        );
      },
    });
  }
}

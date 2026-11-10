import { Component, inject, signal, OnInit } from '@angular/core';
import { OpponentService } from '../../../core/services/opponent';
import { Opponent } from '../../../core/models/opponent';

@Component({
  imports: [],
  selector: 'app-opponent-list',
  styleUrl: './opponent-list.scss',
  templateUrl: './opponent-list.html',
})
export class OpponentList implements OnInit {
  private readonly opponentService = inject(OpponentService);

  readonly opponents = signal<Opponent[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');

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
}

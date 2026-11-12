import { Component, inject, signal, OnInit } from '@angular/core';
import { Statistics } from '../../../core/models/statistics';
import { StatisticsService } from '../../../core/services/statistics';
import { OpponentService } from '../../../core/services/opponent';
import { Opponent } from '../../../core/models/opponent';

@Component({
  imports: [],
  selector: 'app-statistics-page',
  styleUrl: './statistics-page.scss',
  templateUrl: './statistics-page.html',
})
export class StatisticsPage implements OnInit {
  // Inject the StatisticsService and OpponentService to fetch statistics and opponents data
  private readonly statisticsService = inject(StatisticsService);
  private readonly opponentService = inject(OpponentService);

  // Define signals to hold the statistics data, loading state, error message, and list of opponents
  readonly statistics = signal<Statistics | null>(null);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly opponentsErrorMessage = signal('');
  readonly opponents = signal<Opponent[]>([]);

  // The ngOnInit lifecycle hook is called when the component is initialized
  ngOnInit(): void {
    this.loadStatistics();
    this.opponentService.getOpponents().subscribe({
      next: (opponents) => {
        this.opponents.set(opponents);
      },
      error: () => {
        this.opponentsErrorMessage.set('Could not load opponents. Please try again later.');
      },
    });
  }

  // Fetch statistics when the component initializes
  loadStatistics(opponentId?: string) {
    this.loading.set(true);
    this.errorMessage.set('');
    // Call the getStatistics method from the StatisticsService and subscribe to the observable
    this.statisticsService.getStatistics(opponentId).subscribe({
      next: (stats) => {
        this.statistics.set(stats);
        this.loading.set(false);
      },
      // Handle errors by setting an error message and updating the loading state
      error: () => {
        this.errorMessage.set('Could not load statistics. Please try again later.');
        this.loading.set(false);
      },
    });
  }
}

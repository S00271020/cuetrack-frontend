import { Component, inject, signal } from '@angular/core';
import { Statistics } from '../../../core/models/statistics';
import { StatisticsService } from '../../../core/services/statistics';
import { OnInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-statistics-page',
  styleUrl: './statistics-page.scss',
  templateUrl: './statistics-page.html',
})
export class StatisticsPage implements OnInit {
  readonly statistics = signal<Statistics | null>(null);
  private readonly statisticsService = inject(StatisticsService);
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loadStatistics();
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

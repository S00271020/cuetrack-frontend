import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Statistics } from '../models/statistics';

@Service()
export class StatisticsService {
  private readonly http = inject(HttpClient);

  getStatistics(opponentId?: string) {
    const options = opponentId ? { params: { opponentId } } : {};
    return this.http.get<Statistics>('/api/statistics', options);
  }
}

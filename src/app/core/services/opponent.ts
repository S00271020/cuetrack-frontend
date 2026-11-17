import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Opponent, OpponentInput } from '../models/opponent';

@Service()
export class OpponentService {
  private readonly http = inject(HttpClient);

  // Sends http requests to certain urls

  // Get all opponents
  getOpponents() {
    return this.http.get<Opponent[]>('/api/opponents');
  }

  // Create new opponent
  createOpponent(data: OpponentInput) {
    return this.http.post<Opponent>('/api/opponents', data);
  }

  // Edit opponent
  editOpponent(id: string, data: OpponentInput) {
    return this.http.put<Opponent>(`/api/opponents/${id}`, data);
  }

  // Delete opponent
  deleteOpponent(id: string) {
    return this.http.delete<void>(`/api/opponents/${id}`);
  }
}

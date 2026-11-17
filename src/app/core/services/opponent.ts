import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Opponent, OpponentInput } from '../models/opponent';

@Service()
export class OpponentService {
  private readonly http = inject(HttpClient);

  // Sends http requests to certain urls
  getOpponents() {
    return this.http.get<Opponent[]>('/api/opponents');
  }

  createOpponent(data: OpponentInput) {
    return this.http.post<Opponent>('/api/opponents', data);
  }

  editOpponent(id: string, data: OpponentInput) {
    return this.http.put<Opponent>(`/api/opponents/${id}`, data);
  }

  deleteOpponent(id: string) {
    return this.http.delete<void>(`/api/opponents/${id}`);
  }
}

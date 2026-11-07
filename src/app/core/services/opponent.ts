import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Opponent, OpponentInput } from '../models/opponent';

@Service()
export class OpponentService {
  private readonly http = inject(HttpClient);

  getOpponents() {
    return this.http.get<Opponent[]>('/api/opponents');
  }

  createOpponent(data: OpponentInput) {
    return this.http.post<Opponent>('/api/opponents', data);
  }
}

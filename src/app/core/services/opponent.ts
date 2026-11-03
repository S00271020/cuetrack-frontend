import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Opponent } from '../models/opponent';

@Service()
export class OpponentService {
  private readonly http = inject(HttpClient);

  getOpponents() {
    return this.http.get<Opponent[]>('http://localhost:3000/api/opponents');
  }
}

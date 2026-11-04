import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { OpponentService } from '../../../core/services/opponent';
import { OnInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-opponent-list',
  styleUrl: './opponent-list.scss',
  templateUrl: './opponent-list.html',
})
export class OpponentList implements OnInit {
  private readonly opponentService = inject(OpponentService);

  ngOnInit(): void {
    this.opponentService.getOpponents().subscribe({
      next: (opponents) => console.log(opponents),
      error: (error) => console.error('Could not load opponents:', error),
    });
  }
}

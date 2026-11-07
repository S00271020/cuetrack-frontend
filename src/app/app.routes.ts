import { Routes } from '@angular/router';
import { OpponentList } from './features/opponents/opponent-list/opponent-list';
import { OpponentForm } from './features/opponents/opponent-form/opponent-form';

export const routes: Routes = [
  { path: 'opponents', component: OpponentList },
  { path: 'opponents/new', component: OpponentForm },
];

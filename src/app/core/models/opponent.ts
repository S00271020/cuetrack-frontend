export interface Opponent {
  _id: string;
  name: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpponentInput {
  name: string;
  notes?: string;
}

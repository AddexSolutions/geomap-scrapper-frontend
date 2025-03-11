export interface Job {
  id: number;
  status: string;
  queries: string[];
  created_at: string; // ISO date string format
}
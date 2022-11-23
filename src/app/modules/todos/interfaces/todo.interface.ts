export type ITodos = ITodo[];

export interface ITodo {
  id: number;
  title: string;
  checked: boolean;
  createdAt: number;
}

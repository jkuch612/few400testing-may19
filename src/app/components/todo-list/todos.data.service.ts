import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoEntity } from './reducers';

@Injectable()
export class TodosDataService {
  constructor(private client: HttpClient) {

  }

  addToDo(description: string) {
    return this.client.post<ToDoEntity>('http://localhost:3000/todos',
      { description });
  }
}

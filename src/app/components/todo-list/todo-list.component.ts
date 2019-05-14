import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToDoListItem } from './models';
import { selectToDoListItems, State } from './reducers';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private store: Store<State>) { }

  todoList$: Observable<ToDoListItem[]>;

  ngOnInit() {
    this.todoList$ = this.store.select(selectToDoListItems);
  }

  add(item: HTMLInputElement) {
    console.log('adding', item.value);
    item.value = '';
    item.focus();
  }

}

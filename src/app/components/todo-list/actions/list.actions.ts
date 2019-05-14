import { Action } from '@ngrx/store';
import { ToDoListItem } from '../models';
import { ToDoEntity } from '../reducers';

export const ITEM_COMPLETED = '[todos] Item Completed';
export class CompletedItem implements Action {
  readonly type = ITEM_COMPLETED;
  item: ToDoEntity;
  constructor(item: ToDoListItem) {
    this.item = {
      id: item.id,
      description: item.description
    };
  }
}

let nextId = 0;

export const ITEM_ADDED = '[todos] Item Added';
export class AddedItem implements Action {
  readonly type = ITEM_ADDED;
  item: ToDoEntity;
  constructor(description: string) {
    this.item = {
      id: 'T' + nextId++,
      description
    };
  }

}

export const ITEM_ADDED_SUCCESS = '[todos] Item added success';
export class ItemAddedSuccesfully implements Action {
  readonly type = ITEM_ADDED_SUCCESS;
  constructor(public oldId: string, public item: ToDoEntity) { }
}


export type All = CompletedItem | AddedItem | ItemAddedSuccesfully;


import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as actions from './actions/list.actions';
import { TodosDataService } from './todos.data.service';

@Injectable()
export class TodosEffects {

  @Effect() itemAdded$ = this.action$.pipe(
    ofType(actions.ITEM_ADDED),
    map(a => a as actions.AddedItem),
    switchMap(a => this.service.addToDo(a.item.description)
      .pipe(
        map(result => new actions.ItemAddedSuccesfully(a.item.id, result))
      )
    )
  );

  constructor(private action$: Actions, private service: TodosDataService) { }
}

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, ReplaySubject } from 'rxjs';
import * as listActions from './actions/list.actions';
import { ToDoEntity } from './reducers';
import { TodosDataService } from './todos.data.service';
import { TodosEffects } from './todos.effects';

class FakeDataService extends TodosDataService {
  constructor() {
    super(null);
  }

  addToDo(description: string) {
    const response: ToDoEntity = { description, id: '42' };
    return of(response);
  }

}

describe('the todos effect', () => {
  let effect: TodosEffects;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        { provide: TodosDataService, useClass: FakeDataService },
        provideMockActions(() => actions)
      ]
    });

    effect = TestBed.get(TodosEffects);
  });

  it('turns an item added into item added successfully', () => {
    actions = new ReplaySubject(1);

    const action = new listActions.AddedItem('Tacos');

    actions.next(action);

    effect.itemAdded$.subscribe(result => {
      const expected: listActions.ItemAddedSuccesfully = {
        type: listActions.ITEM_ADDED_SUCCESS,
        oldId: action.item.id,
        item: {
          id: '42',
          description: 'Tacos'
        }
      };

      expect(result.oldId).toEqual(expected.oldId);
      expect(result.type).toBe(expected.type);
      expect(result.item).toEqual(expected.item);
    });
  });
});



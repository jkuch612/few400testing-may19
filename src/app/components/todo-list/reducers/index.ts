import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tassign } from 'tassign';
import * as actions from '../actions/list.actions';
import { ToDoListItem } from '../models';

export interface ToDoEntity {
  id: string;
  description: string;
}
export interface State extends EntityState<ToDoEntity> {
  completedIds: string[];
}

const initialState: State = {
  ids: ['1', '2'],
  entities: {
    1: { id: '1', description: 'Clean Garage' },
    2: { id: '2', description: 'Finish Daryl\'s deck' }
  },
  completedIds: ['1']
};

export const adaptor = createEntityAdapter<ToDoEntity>();

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.ITEM_ADDED: {
      return adaptor.addOne(action.item, state);
    }
    case actions.ITEM_COMPLETED: {
      // return Object.assign({}, state, { completedIds: [action.item.id, ...state.completedIds] });
      return tassign(state, { completedIds: [action.item.id, ...state.completedIds] });
    }
    case actions.ITEM_ADDED_SUCCESS: {
      const tempstate = adaptor.removeOne(action.oldId, state);
      return adaptor.addOne(action.item, tempstate);
    }
    default: {
      return state;
    }
  }
}

// feature selector
export const _selectTodosFeature = createFeatureSelector<State>('todos');

// per branch

// helpers
export const { selectAll: _selectAllToDos } = adaptor.getSelectors(_selectTodosFeature);
export const _selectCompletedIds = createSelector(_selectTodosFeature, f => f.completedIds);

// component selectors
export const selectToDoListItems = createSelector(_selectAllToDos, _selectCompletedIds, (todos, ids) => {
  return todos.map(todo => {
    return ({
      id: todo.id,
      description: todo.description,
      completed: ids.some(i => i === todo.id),
      temporary: todo.id.startsWith('T')
    }) as ToDoListItem;
  });
});

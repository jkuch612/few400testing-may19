import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
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

const adaptor = createEntityAdapter<ToDoEntity>();

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
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
      completed: ids.some(i => i === todo.id)
    }) as ToDoListItem;
  });
});

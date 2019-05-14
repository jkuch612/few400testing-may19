import { ToDoListItem } from '../models';
import { CompletedItem } from './list.actions';

describe('the actions', () => {
  describe('the completed actions', () => {
    it('copies the right properties', () => {
      const inputItem: ToDoListItem = {
        id: '42',
        description: 'Pizza',
        completed: true
      };

      const result = new CompletedItem(inputItem);

      expect(result.item).toEqual({ id: '42', description: 'Pizza' });

    });
  });
});

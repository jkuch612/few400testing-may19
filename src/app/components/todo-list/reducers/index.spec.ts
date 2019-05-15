import * as rootReducer from '../../../reducers';
import * as actions from '../actions/list.actions';
import * as fromReducer from './index';

describe('the reducer', () => {
  describe('adding an item', () => {
    it('adding to an empty state', () => {
      const initialState = fromReducer.adaptor.getInitialState({
        completedIds: []
      });

      const action: actions.AddedItem = {
        type: actions.ITEM_ADDED,
        item: {
          id: '42',
          description: 'tacos'
        }
      };

      const resultsState = fromReducer.reducer(initialState, action);

      expect(resultsState).toEqual({
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: []
      });
    });

    it('adding an item to the state when something else already exists', () => {
      const initialState = {
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: []
      };

      const action: actions.AddedItem = {
        type: actions.ITEM_ADDED,
        item: {
          id: '19',
          description: 'beer'
        }
      };

      const resultState = fromReducer.reducer(initialState, action);

      expect(resultState).toEqual({
        ids: ['42', '19'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          },
          19: {
            id: '19',
            description: 'beer'
          }
        },
        completedIds: []
      });

    });

  });
  describe('marking an item complete', () => {
    it('can be done', () => {
      const initialState = {
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: []
      };

      const action: actions.CompletedItem = {
        type: actions.ITEM_COMPLETED,
        item: {
          id: '42',
          description: 'tacos'
        }
      };

      const result = fromReducer.reducer(initialState, action);

      expect(result).toEqual({
        ids: ['42'],
        entities: {
          42: {
            id: '42',
            description: 'tacos'
          }
        },
        completedIds: ['42']
      });
    });
  });

  describe('selectors', () => {
    const initialState: rootReducer.State = {
      todos: {
        ids: [
          '1',
          '2',
          'T0'
        ],
        entities: {
          1: {
            id: '1',
            description: 'Clean Garage'
          },
          2: {
            id: '2',
            description: 'Finish Daryl\'s deck'
          },
          T0: {
            id: 'T0',
            description: 'Pizza'
          }
        },
        completedIds: [
          '1'
        ]
      }
    };

    it('has a feature selector', () => {

      const todoState = fromReducer._selectTodosFeature(initialState);

      expect(todoState).toEqual({
        ids: [
          '1',
          '2',
          'T0'
        ],
        entities: {
          1: {
            id: '1',
            description: 'Clean Garage'
          },
          2: {
            id: '2',
            description: 'Finish Daryl\'s deck'
          },
          T0: {
            id: 'T0',
            description: 'Pizza'
          }
        },
        completedIds: [
          '1'
        ]
      });
    });

    it('can get completedIds', () => {
      const completedIds = fromReducer._selectCompletedIds(initialState);

      expect(completedIds).toEqual(['1']);
    });

    it('can give you the model fro the component', () => {
      const model = fromReducer.selectToDoListItems(initialState);

      expect(model).toEqual([
        {
          id: '1',
          description: 'Clean Garage',
          completed: true,
          temporary: false
        },
        {
          id: '2',
          description: 'Finish Daryl\'s deck',
          completed: false,
          temporary: false
        },
        {
          id: 'T0',
          description: 'Pizza',
          completed: false,
          temporary: true
        }
      ]);
    });
  });
});

import reducer, { feedInitialState, getFeeds } from './feedSlice';

describe('checking feedReducer', () => {
  const testFeed = [
    {
      _id: '1',
      status: 'done',
      name: 'name',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      number: 1,
      ingredients: ['1', '2', '3']
    }
  ];

  test('getFeeds', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: {
        orders: testFeed
      }
    };

    const state = reducer(feedInitialState, action);

    expect(state.feeds).toEqual(testFeed);
    expect(state.isLoading).toBeFalsy();
  });
});

import reducer, { getOrders, orderInitialState } from './orderSlice';

describe('checking orderReducer', () => {
  const testOrder = [
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

  test('getOrder', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: testOrder
    };

    const state = reducer(orderInitialState, action);

    expect(state.profileOrders).toEqual(testOrder);
    expect(state.isLoading).toBeFalsy();
  });
});

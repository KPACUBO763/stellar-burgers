import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient,
  constructorInitialState
} from './constructorSlice';

const firstIngredient = {
  id: '1',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const secondIngredient = {
  id: '2',
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('checking constructorReducer', () => {
  describe('checking add/remove ingredient', () => {
    const initialState = {
      ...constructorInitialState,
      constructorItems: {
        bun: null,
        ingredients: []
      }
    };

    test('add ingredient', () => {
      const state = constructorReducer(
        initialState,
        addIngredient(firstIngredient)
      );

      expect(state.constructorItems.ingredients[0]).toEqual({
        ...firstIngredient,
        id: expect.any(String)
      });
    });

    test('remove ingredient', () => {
      const state = constructorReducer(
        initialState,
        removeIngredient(firstIngredient)
      );

      expect(state.constructorItems.ingredients).toEqual([]);
    });
  });

  describe('checking move ingredients', () => {
    const initialState = {
      ...constructorInitialState,
      constructorItems: {
        bun: null,
        ingredients: [firstIngredient, secondIngredient]
      }
    };

    test('move down ingredient', () => {
      const state = constructorReducer(
        initialState,
        moveDownIngredient(firstIngredient)
      );

      expect(state.constructorItems.ingredients).toEqual([
        secondIngredient,
        firstIngredient
      ]);
    });

    test('move up ingredient', () => {
      const state = constructorReducer(
        initialState,
        moveUpIngredient(firstIngredient)
      );
      expect(state.constructorItems.ingredients).toEqual([
        firstIngredient,
        secondIngredient
      ]);
    });
  });
});

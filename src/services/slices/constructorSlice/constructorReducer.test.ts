import { expect, test, describe } from '@jest/globals';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  constructorInitialState
} from './constructorSlice';
import type { constructorState } from './types';
import { nanoid } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'mockedID')
}));

describe('Constructor slice reducer', () => {
  let initialState: constructorState;

  beforeEach(() => {
    jest.clearAllMocks();
    initialState = {
      ...constructorInitialState,
      constructorItems: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          id: '0'
        },
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093f',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
            id: '1'
          },
          {
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
            id: '2'
          },
          {
            _id: '643d69a5c3f7b9001cfa094a',
            name: 'Сыр с астероидной плесенью',
            type: 'main',
            proteins: 84,
            fat: 48,
            carbohydrates: 420,
            calories: 3377,
            price: 4142,
            image: 'https://code.s3.yandex.net/react/code/cheese.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
            id: '3'
          },
          {
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            id: '4'
          }
        ]
      }
    };
  });

  test('Добавляет ингредиент корректно', () => {
    const ingredient: TIngredient = {
      _id: '643d69a5c3f7b9001cfa0949',
      name: 'Мини-салат Экзо-Плантаго',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 6,
      price: 4400,
      image: 'https://code.s3.yandex.net/react/code/salad.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
    };

    const expectedState: constructorState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          ...initialState.constructorItems.ingredients,
          { ...ingredient, id: 'mockedID' }
        ]
      }
    };

    const newState = constructorReducer(initialState, addIngredient(ingredient));

    expect(nanoid).toHaveBeenCalledTimes(1);
    expect(newState).toEqual(expectedState);
  });

  test('Удаляет ингредиент корректно', () => {
    const idToRemove = '4';

    const expectedState: constructorState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: initialState.constructorItems.ingredients.filter(
          (item) => item.id !== idToRemove
        )
      }
    };

    const newState = constructorReducer(initialState, removeIngredient(idToRemove));

    expect(newState).toEqual(expectedState);
  });

  describe('Изменение порядка ингредиентов', () => {
    test('Перемещает вверх корректно', () => {
      const index = 3;

      const expected = [...initialState.constructorItems.ingredients];
      [expected[index - 1], expected[index]] = [expected[index], expected[index - 1]];

      const expectedState: constructorState = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: expected
        }
      };

      const newState = constructorReducer(initialState, moveIngredientUp(index));
      expect(newState).toEqual(expectedState);
    });

    test('Перемещает вниз корректно', () => {
      const index = 4;

      const expected = [...initialState.constructorItems.ingredients];
      [expected[index], expected[index + 1]] = [expected[index + 1], expected[index]];

      const expectedState: constructorState = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: expected
        }
      };

      const newState = constructorReducer(initialState, moveIngredientDown(index));
      expect(newState).toEqual(expectedState);
    });
  });
});

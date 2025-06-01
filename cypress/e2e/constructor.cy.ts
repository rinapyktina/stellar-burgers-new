import { URL } from '@api';
import { deleteCookie, setCookie } from '../../src/utils/cookie';
import { selectorList } from '../support/selectorList';
import { url } from '../support/url';

describe('Constructor is Operational', () => {
  beforeEach(() => {
    setCookie(
      'access-token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzk3ZDY1YjI3YjA2MDAxYzNlOGE0OCIsImlhdCI6MTczODAzNzEyNCwiZXhwIjoxNzM4MDM4MzI0fQ.Kwnk_t6T8AakgOpAm-OGVmUgtA1NUH0jSPxFbRXnhPs'
    );
    localStorage.setItem(
      'refresh-token',
      '4dc1321e3d171637d48b1ddcf4943c8a6486fbb412e5cf940c606e2326e37b95349df81c4772fc2f'
    );
    cy.intercept('GET', `${URL}//auth/user`, { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('GET', `${URL}/ingredients`, {
      fixture: 'ingredients.json'
    });
    cy.visit(url);
    cy.wait('@getUser');
  });

  it('Receive Ingredients from the Server', () => {
    cy.get(selectorList.constructor).as('constructor');

    // Add a Bun
    cy.addBun('Флюоресцентная булка R2-D3');

    // Add Ingredient
    cy.addIngredient('Биокотлета из марсианской Магнолии');
    cy.addIngredient('Филе Люминесцентного тетраодонтимформа');
    cy.addIngredient('Мясо бессмертных моллюсков Protostomia');
    cy.addIngredient('Говяжий метеорит (отбивная)');
    cy.addIngredient('Хрустящие минеральные кольца');
    cy.addIngredient('Плоды Фалленианского дерева');
    cy.addIngredient('Кристаллы марсианских альфа-сахаридов');
    cy.addIngredient('Мини-салат Экзо-Плантаго');
    cy.addIngredient('Сыр с астероидной плесенью');

    // Add Sauce
    cy.addSauce('Соус Spicy-X');
    cy.addSauce('Соус фирменный Space Sauce');
    cy.addSauce('Соус традиционный галактический');
    cy.addSauce('Соус с шипами Антарианского плоскоходца');

    // Check Bun
    cy.get('@constructor').should('contain', 'Флюоресцентная булка R2-D3');

    // Check Indgredients
    cy.get('@constructor').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('@constructor').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
    cy.get('@constructor').should(
      'contain',
      'Мясо бессмертных моллюсков Protostomia'
    );
    cy.get('@constructor').should('contain', 'Говяжий метеорит (отбивная)');
    cy.get('@constructor').should('contain', 'Хрустящие минеральные кольца');
    cy.get('@constructor').should('contain', 'Плоды Фалленианского дерева');
    cy.get('@constructor').should(
      'contain',
      'Кристаллы марсианских альфа-сахаридов'
    );
    cy.get('@constructor').should('contain', 'Мини-салат Экзо-Плантаго');
    cy.get('@constructor').should('contain', 'Сыр с астероидной плесенью');

    // Check Sauces
    cy.get('@constructor').should('contain', 'Соус Spicy-X');
    cy.get('@constructor').should('contain', 'Соус фирменный Space Sauce');
    cy.get('@constructor').should('contain', 'Соус традиционный галактический');
    cy.get('@constructor').should(
      'contain',
      'Соус с шипами Антарианского плоскоходца'
    );
  });

  it('Open and Close Modal on Overlay Click', () => {
    // Open Modal
    cy.get(selectorList.ingredientItem).eq(1).click();
    cy.get(selectorList.modal).as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', 'Флюоресцентная булка R2-D3');

    // Close Modal via Overlay
    cy.get(selectorList.modalOverlay).click('left', { force: true });
    cy.get('@modal').should('not.exist');
  });

  it('Open and Close Modal on Cross Click', () => {
    // Open Modal
    cy.get(selectorList.ingredientItem).eq(1).click();
    cy.get(selectorList.modal).as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', 'Флюоресцентная булка R2-D3');

    // Close Modal via X Btn
    cy.get(selectorList.modalCloseBtn).click();
    cy.get('@modal').should('not.exist');
  });

  it('Create Order', () => {
    cy.get(selectorList.constructor).as('constructor');
    cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as(
      'orderAPI'
    );

    cy.addBun('Флюоресцентная булка R2-D3');
    cy.addIngredient('Мясо бессмертных моллюсков Protostomia');
    cy.addIngredient('Хрустящие минеральные кольца');
    cy.addIngredient('Сыр с астероидной плесенью');
    cy.addIngredient('Говяжий метеорит (отбивная)');
    cy.addIngredient('Мини-салат Экзо-Плантаго');
    cy.addIngredient('Сыр с астероидной плесенью');
    cy.addSauce('Соус фирменный Space Sauce');

    cy.get('@constructor').children('div').children('button').click();

    cy.wait('@orderAPI').then((interception) => {
      // Test Request
      expect(interception.request.method).to.equal('POST');
      expect(interception.request.body).to.have.property('ingredients');
      expect(interception.request.body.ingredients).to.include.members([
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0943'
      ]);

      // Test Response
      expect(interception.response).to.not.be.undefined;
      expect(interception.response!.statusCode).to.equal(200);
      expect(interception.response!.body).to.have.property('order');
      expect(interception.response!.body.order).to.have.property(
        'number',
        67010
      );
      expect(interception.response!.body.order).to.have.property(
        'price',
        19377
      );
    });

    cy.get(selectorList.modal).as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '67010');
    cy.get(selectorList.modalCloseBtn).click();
    cy.get('@modal').should('not.exist');

    cy.get('@constructor').should('not.contain', 'Флюоресцентная булка R2-D3');
    cy.get('@constructor').should(
      'not.contain',
      'Мясо бессмертных моллюсков Protostomia'
    );
    cy.get('@constructor').should(
      'not.contain',
      'Хрустящие минеральные кольца'
    );
    cy.get('@constructor').should('not.contain', 'Сыр с астероидной плесенью');
    cy.get('@constructor').should('not.contain', 'Говяжий метеорит (отбивная)');
    cy.get('@constructor').should('not.contain', 'Мини-салат Экзо-Плантаго');
    cy.get('@constructor').should('not.contain', 'Сыр с астероидной плесенью');
    cy.get('@constructor').should('not.contain', 'Соус фирменный Space Sauce');
  });

  after(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});

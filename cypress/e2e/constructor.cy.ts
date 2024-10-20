const burgerConstructor = '[data-cy=burgerConstructor]';
const constructorIngredients = '[data-cy=constructorIngredients]';
const bun = 'Краторная булка N-200i';
const main = 'Биокотлета из марсианской Магнолии';
const sauce = 'Соус фирменный Space Sauce';
const addButton = 'Добавить';
const order = '[data-cy=order]';

describe('checking constructor', () => {
  beforeEach(() => {
    // Intercepting a user request
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

    // Intercepting ingredients request
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.visit('/');
    cy.wait('@ingredients');
  });

  it('add ingredients to constructor', () => {
    // Add buns
    cy.get(`li:contains(${bun})`).within(() => {
      cy.get(`button:contains(${addButton})`).click();
    });
    cy.get(burgerConstructor).contains(bun).should('exist');

    // Add main
    cy.get(`li:contains(${main})`).within(() => {
      cy.get(`button:contains(${addButton})`).click();
    });
    cy.get(constructorIngredients).contains(main).should('exist');

    // Add sauce
    cy.get(`li:contains(${sauce})`).within(() => {
      cy.get(`button:contains(${addButton})`).click();
    });
    cy.get(constructorIngredients).contains(sauce).should('exist');
  });
});

describe('checking order', () => {
  beforeEach(() => {
    // Intercepting a user request
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

    // Intercepting ingredients request
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    // Intercepting order request
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('order');

    cy.visit('/');
    cy.wait('@ingredients');
    window.localStorage.setItem('accessToken', 'token');
  });

  afterEach(() => {
    window.localStorage.removeItem('accessToken');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('placing an order', () => {
    // Add buns
    cy.get(`li:contains(${bun})`).within(() => {
      cy.get(`button:contains(${addButton})`).click();
    });
    cy.get(burgerConstructor).contains(bun).should('exist');

    // Add main
    cy.get(`li:contains(${main})`).within(() => {
      cy.get(`button:contains(${addButton})`).click();
    });
    cy.get(constructorIngredients).contains(main).should('exist');

    // Add sauce
    cy.get(`li:contains(${sauce})`).within(() => {
      cy.get(`button:contains(${addButton})`).click();
    });
    cy.get(constructorIngredients).contains(sauce).should('exist');

    cy.get(order).click();
    cy.wait('@order');
    cy.get('[data-cy=closeModal]').click();

    cy.get(burgerConstructor).should('contain', 'Выберите булки');
    cy.get(constructorIngredients).should('contain', 'Выберите начинку');
  });
});

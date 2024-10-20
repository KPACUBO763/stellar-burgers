const modal = '[data-cy=modal]';
const closeButton = '[data-cy=closeModal]';

describe('checking modal', () => {
  beforeEach(() => {
    // Intercepting a user request
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

    // Intercepting ingredients request
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('open/close modal', () => {
    cy.get(modal).should('not.exist');
    cy.contains('Краторная булка N-200i').click();

    cy.get(modal).should('exist');
    cy.get(closeButton).click();
    cy.get(modal).should('not.exist');
  });
});


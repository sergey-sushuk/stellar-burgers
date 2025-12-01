describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен открыть модальное окно при клике на ингредиент', () => {
    cy.get('[data-testid^="ingredient-"]')
      .contains('Краторная булка')
      .parent()
      .find('a')
      .click();

    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal"]').contains('Краторная булка').should('exist');
  });

  it('должен отображать правильные данные ингредиента в модальном окне', () => {
    cy.get('[data-testid^="ingredient-"]')
      .contains('Биокотлета')
      .parent()
      .find('a')
      .click();

    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal"]').should('be.visible');

    cy.get('[data-testid="modal"]').within(() => {
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.contains('4242').should('exist');
      cy.contains('420').should('exist');
      cy.contains('142').should('exist');
      cy.contains('242').should('exist');
    });
  });

  it('должен закрыть модальное окно при клике на крестик', () => {
    cy.get('[data-testid^="ingredient-"]')
      .contains('Краторная булка')
      .parent()
      .find('a')
      .click();

    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal"]').should('be.visible');

    cy.get('[data-testid="modal-close"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('должен закрыть модальное окно при клике на оверлей', () => {
    cy.get('[data-testid^="ingredient-"]')
      .contains('Краторная булка')
      .parent()
      .find('a')
      .click();

    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal"]').should('be.visible');

    cy.get('[data-testid="modal-overlay"]').click({ force: true });

    cy.get('[data-testid="modal"]').should('not.exist');
  });
});

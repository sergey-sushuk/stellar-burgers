describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
    // Ждём, пока ингредиенты появятся на странице
    cy.get('[data-testid^="ingredient-"]', { timeout: 15000 }).should('have.length.at.least', 1);
  });

  it('должен открыть модальное окно при клике на ингредиент', () => {
    cy.get('[data-testid^="ingredient-"]')
      .should('have.length.at.least', 1)
      .contains('Краторная булка')
      .closest('[data-testid^="ingredient-"]')
      .find('a')
      .click();

    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal"]').contains('Краторная булка').should('exist');
  });

  it('должен отображать правильные данные ингредиента в модальном окне', () => {
    cy.get('[data-testid^="ingredient-"]')
      .should('have.length.at.least', 1)
      .contains('Биокотлета')
      .closest('[data-testid^="ingredient-"]')
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
      .should('have.length.at.least', 1)
      .contains('Краторная булка')
      .closest('[data-testid^="ingredient-"]')
      .find('a')
      .click();

    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal"]').should('be.visible');

    cy.get('[data-testid="modal-close"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('должен закрыть модальное окно при клике на оверлей', () => {
    cy.get('[data-testid^="ingredient-"]')
      .should('have.length.at.least', 1)
      .contains('Краторная булка')
      .closest('[data-testid^="ingredient-"]')
      .find('a')
      .click();

    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal"]').should('be.visible');

    cy.get('[data-testid="modal-overlay"]').click({ force: true });

    cy.get('[data-testid="modal"]').should('not.exist');
  });
});

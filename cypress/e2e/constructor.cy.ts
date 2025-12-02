describe('Добавление ингредиентов в конструктор', () => {
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

  it('должен добавить булку в конструктор', () => {
    cy.get('[data-testid^="ingredient-"]')
      .should('have.length.at.least', 1)
      .contains('Краторная булка')
      .closest('[data-testid^="ingredient-"]')
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="constructor-bun-top"]').should('contain', 'Краторная булка');

    cy.get('[data-testid="constructor-bun-bottom"]').should('contain', 'Краторная булка');
  });

  it('должен добавить начинку в конструктор', () => {
    cy.get('[data-testid^="ingredient-"]')
      .should('have.length.at.least', 1)
      .contains('Биокотлета')
      .closest('[data-testid^="ingredient-"]')
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="constructor-fillings"]').should('contain', 'Биокотлета');
  });

  it('должен добавить несколько ингредиентов в конструктор', () => {
    cy.get('[data-testid^="ingredient-"]')
      .should('have.length.at.least', 1)
      .contains('Краторная булка')
      .closest('[data-testid^="ingredient-"]')
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-testid^="ingredient-"]')
      .contains('Биокотлета')
      .closest('[data-testid^="ingredient-"]')
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="constructor-bun-top"]').should('contain', 'Краторная булка');

    cy.get('[data-testid="constructor-fillings"]').children().should('have.length', 1);
  });
});

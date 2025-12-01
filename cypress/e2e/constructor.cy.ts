describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен добавить булку в конструктор', () => {
    cy.get('[data-testid^="ingredient-"]')
      .contains('Краторная булка')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="constructor-bun-top"]').should('contain', 'Краторная булка');

    cy.get('[data-testid="constructor-bun-bottom"]').should('contain', 'Краторная булка');
  });

  it('должен добавить начинку в конструктор', () => {
    cy.get('[data-testid^="ingredient-"]')
      .contains('Биокотлета')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="constructor-fillings"]').should('contain', 'Биокотлета');
  });

  it('должен добавить несколько ингредиентов в конструктор', () => {
    cy.get('[data-testid^="ingredient-"]')
      .contains('Краторная булка')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-testid^="ingredient-"]')
      .contains('Биокотлета')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="constructor-bun-top"]').should('contain', 'Краторная булка');

    cy.get('[data-testid="constructor-fillings"]').children().should('have.length', 1);
  });
});

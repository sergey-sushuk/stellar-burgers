import { SELECTORS } from '../support/selectors';

describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.waitForIngredients();
  });

  it('должен добавить булку в конструктор', () => {
    cy.addIngredientToConstructor('Краторная булка');

    cy.get(SELECTORS.constructorBunTop).should('contain', 'Краторная булка');
    cy.get(SELECTORS.constructorBunBottom).should('contain', 'Краторная булка');
  });

  it('должен добавить начинку в конструктор', () => {
    cy.addIngredientToConstructor('Биокотлета');

    cy.get(SELECTORS.constructorFillings).should('contain', 'Биокотлета');
  });

  it('должен добавить несколько ингредиентов в конструктор', () => {
    cy.addIngredientToConstructor('Краторная булка');
    cy.addIngredientToConstructor('Биокотлета');

    cy.get(SELECTORS.constructorBunTop).should('contain', 'Краторная булка');
    cy.get(SELECTORS.constructorFillings).children().should('have.length', 1);
  });
});

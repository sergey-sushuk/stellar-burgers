/// <reference types="cypress" />
import { SELECTORS } from './selectors';

// Команда для ожидания загрузки ингредиентов
Cypress.Commands.add('waitForIngredients', () => {
  cy.intercept('GET', '**/ingredients', {
    statusCode: 200,
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.visit('/');
  cy.wait('@getIngredients');
  cy.get(SELECTORS.ingredient, { timeout: 15000 })
    .should('have.length.at.least', 1)
    .as('ingredients');
});

// Команда для добавления ингредиента в конструктор
Cypress.Commands.add(
  'addIngredientToConstructor',
  { prevSubject: false },
  (ingredientName: string) => {
    cy.get('@ingredients')
      .contains(ingredientName)
      .closest(SELECTORS.ingredient)
      .find('button')
      .contains('Добавить')
      .click();
  }
);

// Команда для открытия модального окна ингредиента
Cypress.Commands.add(
  'openIngredientModal',
  { prevSubject: false },
  (ingredientName: string) => {
    cy.get('@ingredients')
      .contains(ingredientName)
      .closest(SELECTORS.ingredient)
      .find('a')
      .click();
    cy.get(SELECTORS.modal, { timeout: 5000 })
      .should('exist')
      .should('be.visible')
      .as('modal');
  }
);

// Команда для закрытия модального окна
Cypress.Commands.add('closeModal', () => {
  cy.get(SELECTORS.modalClose).click();
  cy.get(SELECTORS.modal).should('not.exist');
});

declare global {
  namespace Cypress {
    interface Chainable {
      waitForIngredients(): Chainable<void>;
      addIngredientToConstructor(ingredientName: string): Chainable<void>;
      openIngredientModal(ingredientName: string): Chainable<void>;
      closeModal(): Chainable<void>;
    }
  }
}



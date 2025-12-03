import { SELECTORS } from '../support/selectors';

describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.waitForIngredients();
  });

  it('должен открыть модальное окно при клике на ингредиент', () => {
    cy.openIngredientModal('Краторная булка');

    cy.get('@modal').contains('Краторная булка').should('exist');
  });

  it('должен отображать правильные данные ингредиента в модальном окне', () => {
    cy.openIngredientModal('Биокотлета');

    cy.get('@modal').within(() => {
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.contains('4242').should('exist');
      cy.contains('420').should('exist');
      cy.contains('142').should('exist');
      cy.contains('242').should('exist');
    });
  });

  it('должен закрыть модальное окно при клике на крестик', () => {
    cy.openIngredientModal('Краторная булка');
    cy.closeModal();
  });

  it('должен закрыть модальное окно при клике на оверлей', () => {
    cy.openIngredientModal('Краторная булка');

    cy.get(SELECTORS.modalOverlay).click({ force: true });
    cy.get(SELECTORS.modal).should('not.exist');
  });
});

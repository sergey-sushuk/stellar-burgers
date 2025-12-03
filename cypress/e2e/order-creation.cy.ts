import { SELECTORS } from '../support/selectors';

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('postOrder');

    cy.setCookie('accessToken', 'fake');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'fake');
    });

    cy.waitForIngredients();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('должен создать заказ и показать модальное окно с номером заказа', () => {
    cy.addIngredientToConstructor('Краторная булка');
    cy.addIngredientToConstructor('Биокотлета');

    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder');

    cy.get(SELECTORS.modal, { timeout: 5000 })
      .should('exist')
      .should('be.visible')
      .as('orderModal');

    cy.get(SELECTORS.orderNumber).should('contain', '12345');
  });

  it('должен закрыть модальное окно заказа', () => {
    cy.addIngredientToConstructor('Краторная булка');

    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder');

    cy.get(SELECTORS.modal, { timeout: 5000 }).should('exist');
    cy.closeModal();
  });

  it('должен очистить конструктор после создания заказа', () => {
    cy.addIngredientToConstructor('Краторная булка');
    cy.addIngredientToConstructor('Биокотлета');

    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder');

    cy.get(SELECTORS.modal, { timeout: 5000 }).should('exist');
    cy.closeModal();

    // Ждём очистки конструктора
    cy.get(SELECTORS.constructorBunTop, { timeout: 2000 }).should('not.exist');
    cy.contains('Выберите начинку').should('exist');
  });
});

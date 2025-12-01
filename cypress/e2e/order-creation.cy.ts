describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('postOrder');

    cy.setCookie('accessToken', 'fake');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'fake');
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('должен создать заказ и показать модальное окно с номером заказа', () => {
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

    cy.get('button').contains('Оформить заказ').click();

    cy.wait('@postOrder');

    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal"]').should('be.visible');

    cy.get('[data-testid="order-number"]').should('contain', '12345');
  });

  it('должен закрыть модальное окно заказа', () => {
    cy.get('[data-testid^="ingredient-"]')
      .contains('Краторная булка')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('button').contains('Оформить заказ').click();

    cy.wait('@postOrder');
    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal-close"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('должен очистить конструктор после создания заказа', () => {
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

    cy.get('button').contains('Оформить заказ').click();

    cy.wait('@postOrder');
    cy.get('[data-testid="modal"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    // Ждём очистки конструктора
    cy.get('[data-testid="constructor-bun-top"]', { timeout: 2000 }).should('not.exist');
    cy.contains('Выберите начинку').should('exist');
  });
});

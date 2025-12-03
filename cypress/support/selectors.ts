// Селекторы для использования в тестах
export const SELECTORS = {
  ingredient: '[data-testid^="ingredient-"]',
  modal: '[data-testid="modal"]',
  modalClose: '[data-testid="modal-close"]',
  modalOverlay: '[data-testid="modal-overlay"]',
  constructorBunTop: '[data-testid="constructor-bun-top"]',
  constructorBunBottom: '[data-testid="constructor-bun-bottom"]',
  constructorFillings: '[data-testid="constructor-fillings"]',
  orderNumber: '[data-testid="order-number"]'
} as const;



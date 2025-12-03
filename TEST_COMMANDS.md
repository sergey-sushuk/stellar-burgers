# Команды для проверки тестов

## 1. Юнит-тесты всех слайсов

```bash
# Запустить все тесты
npm test

# Запустить только тесты слайсов
npm test -- src/services/slices/__tests__

# Запустить конкретный тест
npm test -- constructorSlice.test.ts
npm test -- ingredientsSlice.test.ts
npm test -- orderSlice.test.ts
npm test -- feedSlice.test.ts
npm test -- profileOrdersSlice.test.ts
npm test -- userSlice.test.ts
```

## 2. Cypress тесты

```bash
# Интерактивный режим (рекомендуется для первого запуска)
npm run cypress:open

# Headless режим (для CI/CD)
npm run cypress:run

# Запустить конкретный тест
npm run cypress:run -- --spec "cypress/e2e/constructor.cy.ts"
npm run cypress:run -- --spec "cypress/e2e/ingredient-details.cy.ts"
npm run cypress:run -- --spec "cypress/e2e/order-creation.cy.ts"
```

## 3. Проверка покрытия кода

```bash
npm run test:coverage
```

## Что проверяется:

### Юнит-тесты (6 файлов):
- ✅ constructorSlice.test.ts
- ✅ ingredientsSlice.test.ts
- ✅ orderSlice.test.ts (новый)
- ✅ feedSlice.test.ts (новый)
- ✅ profileOrdersSlice.test.ts (новый)
- ✅ userSlice.test.ts (новый)

### Cypress тесты (3 файла):
- ✅ constructor.cy.ts (обновлен - использует константы и команды)
- ✅ ingredient-details.cy.ts (обновлен - использует константы и команды)
- ✅ order-creation.cy.ts (обновлен - использует константы и команды)


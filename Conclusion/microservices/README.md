
# Мікросервіси на Node.js із RabbitMQ та CQRS

Цей проект складається з двох мікросервісів: **Orders** та **Notifications**. Вони взаємодіють між собою через RabbitMQ, використовуючи принцип CQRS.

## Огляд

- **Orders**: Створює замовлення через REST API та надсилає події в RabbitMQ.
- **Notifications**: Слухає події з RabbitMQ і зберігає їх як список сповіщень. Також надає REST API для перегляду сповіщень.

## Технології
- Node.js
- RabbitMQ
- Docker та Docker Compose
- CQRS (Command Query Responsibility Segregation)

## Як запустити

### Вимоги
- Docker та Docker Compose встановлені на вашій машині.

### Інструкція
1. Клонуйте цей репозиторій.
2. У кореневій папці виконайте:

   ```bash
   docker-compose up --build
   ```

3. Сервіси будуть доступні на наступних портах:
   - Orders: `http://localhost:3000`
   - Notifications: `http://localhost:3001`

### API

#### Orders
- `POST /orders`
  - Опис: Створити нове замовлення.
  - Приклад запиту:
    ```json
    {
      "product": "Телефон",
      "quantity": 2
    }
    ```
  - Відповідь:
    ```json
    {
      "message": "Order created",
      "order": {
        "id": 1698749812345,
        "product": "Телефон",
        "quantity": 2
      }
    }
    ```

#### Notifications
- `GET /notifications`
  - Опис: Отримати всі сповіщення.
  - Відповідь:
    ```json
    [
      {
        "id": 1698749812345,
        "product": "Телефон",
        "quantity": 2
      }
    ]
    ```


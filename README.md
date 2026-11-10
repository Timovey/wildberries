# Wildberries Tariffs

Сервис по расписанию собирает тарифы Wildberries на доставку и хранение коробов по складам, сохраняет их в
PostgreSQL и выгружает в Google Таблицу — отдельный лист на каждый день.

**Стек:** Node.js · TypeScript · Express · Knex · PostgreSQL · node-cron · Google Sheets API · Docker

## Как это работает

| Когда | Что происходит |
| --- | --- |
| каждый час в :23 | запрос к `common-api.wildberries.ru/api/v1/tariffs/box` за текущий день; тарифы по складам обновляются в таблице `warehouse` (upsert по складу и дате) |
| каждый час в :25 | данные за день выгружаются в Google Таблицу на лист с датой, лист создаётся при необходимости |

## Запуск

1. Создайте `.env` по образцу `.env.example`: доступ к PostgreSQL, токен API Wildberries (`AUTH_WB`),
   ID Google Таблицы (`GOOGLE_SHEET_ID`).
2. Положите ключ сервисного аккаунта Google в `credentials.json` в корне проекта (файл в `.gitignore`) и выдайте
   этому аккаунту доступ к таблице.
3. Запустите:

```bash
docker compose up --build
```

Или локально: `npm install`, `npm run migrate`, затем `npm run dev`.

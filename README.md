# ERP-AERO

Описание системы:

- Node v20.12.1
- typescript v5.4.4
- npm v10.5.0
- Windows 10

Запуск:

- создаем и корректируем .env файл, по подобию .env.example
- создаем в корне проекта файл credentials.json и вставляем данные, которые пришли в сопроводительном письме на hh
- запускаем докер контейнеры из корня проекта
```bash
docker-compose up --build
```

- можно проверить данные подключившись к Postgres: localhost:5555
-проверить файл в Google Sheets: [Таблица](https://docs.google.com/spreadsheets/d/1fWTuPRjpqSjXOBQbZ17089z05w7Hn70RUZLbHqKTy1g/edit?gid=1294745453#gid=1294745453) 

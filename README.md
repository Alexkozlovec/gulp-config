# Сборка gulp для вёрстки сайта.

## Запуск:
- Установка зависимостей: `npm install`
- Команда для разработки: `npm run dev`

## Сборка:
- Команда для сборки в production: `npm run build`
- При сборке файлы HTML / CSS / JS минифицируются.
  Для CSS применяется [autoprefixer](https://www.npmjs.com/package/autoprefixer) и [группировка медиа-запросов](https://www.npmjs.com/package/gulp-group-css-media-queries). 
  JS Прогоняется через [babel](https://babeljs.io/)

## Дополнительно:
- Любые дополнительные файлы должны храниться в папке assets. Можно разбить их на дополнительные папки внутри, если нужно.
- В gulpfile присутствует [таск преобразования изображений в формат webp](https://www.npmjs.com/package/gulp-webp?activeTab=readme), можно использовать при необходимости. Изначально закомментирован.
- Скрипты собираются через [webpack-stream](https://www.npmjs.com/package/webpack-stream), что позволяет использовать import напрямую как из npm/yarn так и из соседних скриптов.
- Картинки оптимизируются автоматически, некоторые параметры можно отредактировать в gulpfile.

### SCSS структура:

  |— scss/                 # Папка для файлов стилей.
    |- style.scss          # Главный файл стилей, в него подключаются все остальные.
    |- _base.scss          # Файл для базовых стилей проекта.
    |- _fonts.scss         # Файл для подключения шрифтов.
    |- _mixins.scss        # Файл для sass/scss-миксинов
    |- _vars.scss          # Файл для sass/css-переменных. Изначально используются нативные.
    |— components/         # Папка для стилей отдельных блоков на сайте.
      |- _header.scss      # Файл для стилей header'a. Остальные блоки добавите сами по ситуации.
    |— vendor/             # Папка для внешних загружаемых стилей, например библиотек.
      |- _normalize.scss   # Стандартный файл нормализации стилей.

### Используется stylelint. Плагины в конфиге перечислены ниже:
* https://www.npmjs.com/package/stylelint
* https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties
* https://www.npmjs.com/package/stylelint-order
* https://www.npmjs.com/package/stylelint-scss

[Плагин stylelint для VS Code](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

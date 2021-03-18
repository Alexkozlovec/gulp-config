# Стартовая сборка gulp для вёрстки сайта.

## Запуск
### Установка зависимостей: `npm install`
### Команда для разработки (Перемещает файлы из src в dist и запускает оттуда live-reload): `npm run dev`

## Сборка
- Команда для сборки в production: `npm run build`
- При сборке файлы HTML / CSS / JS минифицируются.
  Для CSS применяется [autoprefixer](https://www.npmjs.com/package/autoprefixer) и [группировка медиа-запросов](https://www.npmjs.com/package/gulp-group-css-media-queries). 
  JS Прогоняется через [babel](https://babeljs.io/)

## Дополнительно:
- Любые дополнительные файлы должны храниться в папке assets. Можно разбить их на дополнительные папки внутри, если нужно.
- В gulpfile присутствует [таск преобразования изображений в формат webp](https://www.npmjs.com/package/gulp-webp?activeTab=readme), можно использовать при необходимости. Изначально закомментирован.
- Скрипты собираются через [webpack-stream](https://www.npmjs.com/package/webpack-stream), что позволяет использовать import напрямую как из npm/yarn так и из соседних скриптов.
- Картинки оптимизируются автоматически, некоторые параметры можно отредактировать в gulpfile.

## Рекомендуется использование stylelint. Плагины в конфиге перечислены ниже:
* https://www.npmjs.com/package/stylelint
* https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties
* https://www.npmjs.com/package/stylelint-order
* https://www.npmjs.com/package/stylelint-scss

# Тестирование производительности и доступности для Mushroom Matters

## Цели производительности

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: ≤ 2.5s (мобильный 4G)
- **CLS (Cumulative Layout Shift)**: ≤ 0.1
- **INP (Interaction to Next Paint)**: ≤ 200ms

### Дополнительные метрики
- **FCP (First Contentful Paint)**: ≤ 1.8s
- **TTI (Time to Interactive)**: ≤ 3.8s
- **Speed Index**: ≤ 3.4s

## Инструменты тестирования

### 1. Google Lighthouse
```bash
# Установка Lighthouse CLI
npm install -g lighthouse

# Тестирование производительности
lighthouse https://mushroom-matters.myshopify.com --output html --output-path ./lighthouse-report.html

# Тестирование доступности
lighthouse https://mushroom-matters.myshopify.com --only-categories=accessibility --output html --output-path ./accessibility-report.html
```

### 2. PageSpeed Insights
- URL: https://pagespeed.web.dev/
- Тестирование мобильной и десктопной версий
- Анализ Core Web Vitals
- Рекомендации по улучшению

### 3. GTmetrix
- URL: https://gtmetrix.com/
- Детальный анализ производительности
- Waterfall диаграммы
- Рекомендации по оптимизации

## Оптимизация изображений

### Настройка изображений
```liquid
<!-- Оптимизированное изображение -->
{{ product.featured_image | image_url: width: 800 | image_tag:
  class: 'product-image',
  loading: 'lazy',
  width: 800,
  height: 600,
  alt: product.featured_image.alt
}}
```

### WebP поддержка
```liquid
<!-- WebP изображения с fallback -->
<picture>
  <source srcset="{{ image | image_url: width: 800, format: 'webp' }}" type="image/webp">
  <img src="{{ image | image_url: width: 800 }}" alt="{{ image.alt }}" loading="lazy">
</picture>
```

### Lazy Loading
```liquid
<!-- Lazy loading для изображений -->
<img src="{{ image | image_url: width: 400 }}" 
     alt="{{ image.alt }}" 
     loading="lazy"
     width="400"
     height="300">
```

## Оптимизация CSS

### Критический CSS
```css
/* Критический CSS для выше-the-fold контента */
.hero-section {
  /* Стили для hero секции */
}

.header {
  /* Стили для header */
}

/* Остальные стили загружаются асинхронно */
```

### Минификация CSS
```bash
# Минификация CSS файлов
npm install -g clean-css-cli
cleancss -o assets/component-mushroom-hero.min.css assets/component-mushroom-hero.css
```

## Оптимизация JavaScript

### Асинхронная загрузка
```html
<!-- Асинхронная загрузка скриптов -->
<script src="{{ 'analytics-enhanced.js' | asset_url }}" defer></script>
<script src="{{ 'mushroom-hero.js' | asset_url }}" defer></script>
```

### Минификация JavaScript
```bash
# Минификация JS файлов
npm install -g uglify-js
uglifyjs assets/analytics-enhanced.js -o assets/analytics-enhanced.min.js
```

## Оптимизация шрифтов

### Preload критических шрифтов
```html
<!-- Preload критических шрифтов -->
<link rel="preload" href="{{ 'fonts/main-font.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
```

### Font-display: swap
```css
@font-face {
  font-family: 'Main Font';
  src: url('{{ "fonts/main-font.woff2" | asset_url }}') format('woff2');
  font-display: swap;
}
```

## Тестирование доступности (A11y)

### WCAG 2.1 AA соответствие
- **Контрастность**: Минимум 4.5:1 для обычного текста
- **Навигация с клавиатуры**: Все элементы доступны
- **Семантическая разметка**: Правильные HTML теги
- **Alt-тексты**: Для всех изображений

### Инструменты тестирования A11y
```bash
# axe-core для автоматического тестирования
npm install -g @axe-core/cli
axe https://mushroom-matters.myshopify.com

# WAVE для визуального тестирования
# URL: https://wave.webaim.org/
```

### Чек-лист доступности
- [ ] Все изображения имеют alt-тексты
- [ ] Контрастность текста ≥ 4.5:1
- [ ] Навигация работает с клавиатуры
- [ ] Формы имеют labels
- [ ] Кнопки имеют описательный текст
- [ ] Цвет не единственный способ передачи информации
- [ ] Текст масштабируется до 200%
- [ ] Нет мигающего контента

## Оптимизация для мобильных устройств

### Viewport настройки
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```

### Touch-friendly элементы
```css
/* Минимальный размер touch-элементов 44px */
.button, .link, .input {
  min-height: 44px;
  min-width: 44px;
}
```

### Мобильная оптимизация
- Адаптивные изображения
- Оптимизированные размеры шрифтов
- Touch-friendly интерфейс
- Быстрая загрузка на медленных соединениях

## Мониторинг производительности

### Google Analytics 4
- Core Web Vitals отчеты
- Пользовательские метрики
- Анализ производительности

### Real User Monitoring (RUM)
```javascript
// Отслеживание Core Web Vitals
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: 'LCP',
        value: Math.round(entry.startTime)
      });
    }
  }
}).observe({entryTypes: ['largest-contentful-paint']});
```

## Чек-лист производительности

### Обязательные проверки
- [ ] Lighthouse Score ≥ 90
- [ ] LCP ≤ 2.5s
- [ ] CLS ≤ 0.1
- [ ] INP ≤ 200ms
- [ ] FCP ≤ 1.8s
- [ ] TTI ≤ 3.8s
- [ ] Speed Index ≤ 3.4s

### Дополнительные проверки
- [ ] Изображения оптимизированы
- [ ] CSS минифицирован
- [ ] JavaScript минифицирован
- [ ] Шрифты оптимизированы
- [ ] Кэширование настроено
- [ ] CDN используется
- [ ] Gzip сжатие включено

## Автоматизация тестирования

### GitHub Actions
```yaml
name: Performance Testing
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v7
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### Lighthouse CI конфигурация
```json
{
  "ci": {
    "collect": {
      "url": ["https://mushroom-matters.myshopify.com"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

## Отчеты и мониторинг

### Еженедельные отчеты
- Lighthouse результаты
- Core Web Vitals метрики
- A11y проверки
- Рекомендации по улучшению

### Ежемесячные отчеты
- Тренды производительности
- Пользовательские метрики
- Конкурентный анализ
- Планы оптимизации

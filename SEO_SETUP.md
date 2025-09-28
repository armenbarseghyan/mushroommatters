# Настройка SEO для Mushroom Matters

## SEO-оптимизация

### 1. Мета-теги
- **Title**: Оптимизированные заголовки страниц
- **Description**: Уникальные описания для каждой страницы
- **Keywords**: Ключевые слова для грибных экстрактов
- **Open Graph**: Социальные сети
- **Twitter Cards**: Twitter

### 2. Структурированные данные (JSON-LD)
- **Organization**: Информация о компании
- **Product**: Данные о товарах
- **BreadcrumbList**: Навигационные цепочки
- **AggregateRating**: Рейтинги товаров

### 3. Техническая SEO
- **Canonical URLs**: Предотвращение дублирования
- **Hreflang**: Многоязычность
- **Sitemap**: XML карта сайта
- **Robots.txt**: Инструкции для поисковиков

## Ключевые слова

### Основные ключевые слова
- mushroom extracts
- Lion's Mane extract
- Reishi extract
- Cordyceps extract
- medicinal mushrooms
- beta-glucans
- premium supplements

### Длинные ключевые слова
- best mushroom extracts
- organic mushroom supplements
- dual extraction mushrooms
- high beta-glucan mushrooms
- medicinal mushroom tinctures

### Локальные ключевые слова
- mushroom extracts Russia
- грибные экстракты
- экстракт львиной гривы
- экстракт рейши
- экстракт кордицепса

## Оптимизация страниц

### Главная страница
- **Title**: "Mushroom Matters — Premium Mushroom Extracts | Lion's Mane, Reishi, Cordyceps"
- **Description**: "Premium mushroom extracts with high beta-glucan content. Lion's Mane, Reishi, and Cordyceps extracts for cognitive health and immunity."
- **Keywords**: mushroom extracts, Lion's Mane, Reishi, Cordyceps, beta-glucans

### Страницы товаров
- **Title**: "{{ product.title }} — {{ product.vendor }} | Mushroom Matters"
- **Description**: "{{ product.description | truncate: 160 }}"
- **Keywords**: {{ product.title }}, {{ product.type }}, mushroom extract, beta-glucans

### Коллекции
- **Title**: "{{ collection.title }} | Mushroom Extracts | Mushroom Matters"
- **Description**: "Shop {{ collection.title }} mushroom extracts. High-quality, organic supplements for health and wellness."
- **Keywords**: {{ collection.title }}, mushroom extracts, organic supplements

## Структурированные данные

### Organization Schema
```json
{
  "@type": "Organization",
  "name": "Mushroom Matters",
  "url": "https://mushroom-matters.com",
  "logo": "https://mushroom-matters.com/logo.png",
  "description": "Premium mushroom extracts for health and wellness",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Moscow",
    "addressRegion": "Moscow",
    "postalCode": "101000",
    "addressCountry": "RU"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-xxx-xxx-xxxx",
    "contactType": "customer service",
    "email": "info@mushroom-matters.com"
  }
}
```

### Product Schema
```json
{
  "@type": "Product",
  "name": "Lion's Mane Extract 30ml",
  "description": "Premium Lion's Mane extract with dual extraction method",
  "image": "https://mushroom-matters.com/products/lions-mane.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Mushroom Matters"
  },
  "category": "Mushroom Extracts",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Extraction Method",
      "value": "Dual extraction"
    },
    {
      "@type": "PropertyValue",
      "name": "Beta-glucans",
      "value": "25%"
    }
  ]
}
```

## Настройка в Shopify Admin

### 1. SEO настройки
1. Перейдите в Online Store → Preferences
2. Настройте Title и Meta description
3. Добавьте Google Analytics ID
4. Настройте Google Search Console

### 2. Настройка URL
- Используйте короткие, описательные URL
- Избегайте специальных символов
- Используйте дефисы вместо подчеркиваний

### 3. Настройка изображений
- Оптимизируйте размер изображений
- Добавляйте alt-тексты
- Используйте WebP формат
- Настройте lazy loading

## Мониторинг SEO

### Инструменты
1. **Google Search Console** - основные метрики
2. **Google Analytics** - трафик и поведение
3. **SEMrush** - анализ ключевых слов
4. **Ahrefs** - анализ ссылок
5. **Screaming Frog** - техническая SEO

### Ключевые метрики
- **Organic Traffic** - органический трафик
- **Click-Through Rate** - CTR из поиска
- **Average Position** - средняя позиция
- **Core Web Vitals** - производительность
- **Mobile Usability** - мобильная версия

### Отчеты
- Еженедельные отчеты по трафику
- Ежемесячные отчеты по позициям
- Квартальные отчеты по производительности

## Локальная SEO

### Настройка для России
- Регистрация в Яндекс.Вебмастере
- Настройка hreflang для ru/en
- Оптимизация для Яндекс.Поиска
- Настройка локальных ключевых слов

### Настройка для Армении
- Регистрация в Google My Business
- Настройка валют AMD
- Локальные ключевые слова
- Оптимизация для армянского рынка

## Контент-маркетинг

### Блог
- Статьи о пользе грибов
- Рецепты с экстрактами
- Интервью с экспертами
- Исследования и научные данные

### Ключевые темы
- Польза Lion's Mane для мозга
- Reishi для иммунитета
- Cordyceps для энергии
- Beta-glucans и здоровье
- Сравнение методов экстракции

## Ссылочная масса

### Внутренние ссылки
- Ссылки между товарами
- Ссылки на блог
- Ссылки на страницы
- Хлебные крошки

### Внешние ссылки
- Партнерские программы
- Гостевые статьи
- Упоминания в прессе
- Социальные сети

## Мониторинг конкурентов

### Анализ конкурентов
- Ключевые слова конкурентов
- Контент-стратегия
- Ценообразование
- Позиции в поиске

### Инструменты
- SEMrush Competitor Analysis
- Ahrefs Site Explorer
- Google Alerts
- Social Media Monitoring

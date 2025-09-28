# Mushroom Matters - Shopify Theme

Премиальная тема Shopify для магазина экстрактов грибов с поддержкой многоязычности, аналитики и SEO-оптимизации.

## 🍄 Особенности

### Основной функционал
- **Многоязычность**: Русский и английский языки
- **Мультивалюта**: RUB, AMD, USD
- **Продуктовые метафилды**: Метод экстракции, β-глюканы, происхождение
- **Поиск и фильтрация**: Продвинутые фильтры по типу гриба, объёму, цене
- **Аналитика**: GA4, GTM, Meta Pixel с отслеживанием e-commerce
- **SEO**: JSON-LD, Open Graph, Twitter Cards
- **Доступность**: WCAG 2.1 AA соответствие

### Секции
- **Mushroom Hero**: Главная секция с CTA
- **Mushroom Products**: Сетка товаров с фильтрами
- **Mushroom Reviews**: Интеграция с Judge.me/Loox/Okendo
- **Mushroom Search**: Продвинутый поиск с фильтрами
- **Product Metafields**: Отображение метафилдов товаров
- **Cookies Banner**: GDPR-совместимый баннер согласия

## 🚀 Быстрый старт

### 1. Установка
```bash
# Клонирование репозитория
git clone https://github.com/your-org/mushroom-matters-theme.git
cd mushroom-matters-theme

# Установка зависимостей
npm install
```

### 2. Настройка Shopify CLI
```bash
# Вход в Shopify
shopify login --store your-store.myshopify.com

# Запуск dev-сервера
shopify theme dev
```

### 3. Загрузка темы
```bash
# Загрузка темы в Shopify
shopify theme push
```

## 📁 Структура проекта

```
mushroom-matters-theme/
├── assets/                          # CSS, JS, изображения
│   ├── component-mushroom-*.css     # Стили секций
│   ├── analytics-enhanced.js        # Расширенная аналитика
│   └── component-cookies-banner.css # Стили cookies banner
├── sections/                        # Секции темы
│   ├── mushroom-hero.liquid         # Главная секция
│   ├── mushroom-products.liquid     # Сетка товаров
│   ├── mushroom-reviews.liquid      # Отзывы
│   ├── mushroom-search.liquid       # Поиск
│   ├── product-metafields.liquid    # Метафилды товаров
│   ├── analytics.liquid             # Аналитика
│   └── cookies-banner.liquid       # Cookies banner
├── snippets/                        # Переиспользуемые компоненты
│   ├── json-ld.liquid              # Структурированные данные
│   ├── seo-meta.liquid             # SEO мета-теги
│   └── sitemap.liquid               # XML sitemap
├── templates/                       # Шаблоны страниц
│   ├── page.privacy-policy.json     # Политика конфиденциальности
│   ├── page.terms-of-service.json  # Условия использования
│   └── page.refund-policy.json     # Политика возврата
├── locales/                        # Переводы
│   ├── ru.json                     # Русский язык
│   ├── ru.schema.json              # Схема переводов (русский)
│   └── en.default.json             # Английский язык
├── robots.txt                      # Инструкции для поисковиков
└── README.md                       # Документация
```

## ⚙️ Настройка

### 1. Метафилды продуктов
Создайте следующие метафилды в Shopify Admin:
- `custom.extraction_method` - Метод экстракции
- `custom.beta_glucans_percent` - β-глюканы (%)
- `custom.alcohol_percent` - Крепость настойки (%)
- `custom.ingredients` - Состав
- `custom.dosage` - Дозировка
- `custom.servings` - Порций в упаковке
- `custom.origin` - Происхождение сырья
- `custom.coa_url` - Сертификаты
- `custom.warnings` - Предупреждения
- `custom.taste_notes` - Органолептика

### 2. Аналитика
Настройте в секции Analytics:
- **Google Tag Manager ID**: GTM-XXXXXXX
- **Meta Pixel ID**: 123456789012345
- **Google Analytics 4 ID**: G-XXXXXXXXXX

### 3. Поиск и фильтрация
Подключите Search & Discovery app:
- Фасеты по типу гриба
- Фасеты по объёму (30/60 мл)
- Фасеты по цене
- Фасеты по β-глюканам

### 4. Отзывы
Выберите приложение для отзывов:
- Judge.me (рекомендуется)
- Loox
- Okendo

## 🌍 Многоязычность

### Поддерживаемые языки
- **Русский** (ru) - основной
- **Английский** (en) - дополнительный

### Поддерживаемые валюты
- **RUB** - Российский рубль
- **AMD** - Армянский драм
- **USD** - Доллар США

### Настройка языков
1. Перейдите в Settings → Languages
2. Добавьте русский и английский языки
3. Настройте переключатель в header

## 📊 Аналитика

### Отслеживаемые события
- **E-commerce**: просмотр товара, добавление в корзину, покупка
- **Поиск**: поисковые запросы, фильтры
- **Пользовательские**: подписка на рассылку, отправка форм
- **Продуктовые**: взаимодействие с метафилдами, отзывами

### Настройка GA4
```javascript
// Пример настройки событий
gtag('event', 'view_item', {
  currency: 'RUB',
  value: 2999,
  items: [{
    item_id: 'PROD123',
    item_name: 'Lion\'s Mane Extract',
    item_category: 'Mushroom Extracts',
    price: 2999,
    quantity: 1
  }]
});
```

## 🔍 SEO

### Структурированные данные
- **Organization**: информация о компании
- **Product**: данные о товарах с метафилдами
- **BreadcrumbList**: навигационные цепочки

### Мета-теги
- Оптимизированные title и description
- Open Graph для социальных сетей
- Twitter Cards
- Canonical URLs

### Ключевые слова
- mushroom extracts
- Lion's Mane extract
- Reishi extract
- Cordyceps extract
- beta-glucans
- medicinal mushrooms

## ♿ Доступность

### WCAG 2.1 AA соответствие
- Контрастность текста ≥ 4.5:1
- Навигация с клавиатуры
- Семантическая разметка
- Alt-тексты для изображений
- Масштабирование до 200%

### Тестирование
```bash
# Lighthouse accessibility
lighthouse https://your-store.myshopify.com --only-categories=accessibility

# axe-core
axe https://your-store.myshopify.com
```

## 🚀 Производительность

### Цели Core Web Vitals
- **LCP**: ≤ 2.5s
- **CLS**: ≤ 0.1
- **INP**: ≤ 200ms

### Оптимизация
- Lazy loading изображений
- Минификация CSS/JS
- Оптимизация шрифтов
- Критический CSS

### Тестирование
```bash
# Lighthouse performance
lighthouse https://your-store.myshopify.com --only-categories=performance

# PageSpeed Insights
# https://pagespeed.web.dev/
```

## 📱 Мобильная оптимизация

### Адаптивный дизайн
- Mobile-first подход
- Touch-friendly элементы
- Оптимизированные изображения
- Быстрая загрузка на медленных соединениях

### Тестирование
- Lighthouse mobile
- Chrome DevTools
- Real device testing

## 🔒 Безопасность

### GDPR соответствие
- Cookies banner
- Согласие на обработку данных
- Право на удаление данных
- Прозрачность использования данных

### Legal страницы
- Политика конфиденциальности
- Условия использования
- Политика возврата

## 🧪 Тестирование

### Автоматическое тестирование
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Performance testing
lighthouse https://your-store.myshopify.com --output html
```

### Ручное тестирование
- [ ] Все секции работают
- [ ] Многоязычность функционирует
- [ ] Аналитика отслеживает события
- [ ] Поиск и фильтры работают
- [ ] Мобильная версия адаптивна
- [ ] Доступность соблюдена

## 📈 Мониторинг

### Ключевые метрики
- Core Web Vitals
- Conversion rate
- Bounce rate
- Time on page
- Search queries

### Инструменты
- Google Analytics 4
- Google Search Console
- Shopify Analytics
- Custom dashboards

## 🤝 Поддержка

### Документация
- [Настройка метафилдов](METAFIELDS_SETUP.md)
- [Настройка аналитики](ANALYTICS_SETUP.md)
- [Настройка поиска](SEARCH_DISCOVERY_SETUP.md)
- [Legal страницы](LEGAL_PAGES_SETUP.md)
- [SEO оптимизация](SEO_SETUP.md)
- [Тестирование производительности](PERFORMANCE_TESTING.md)

### Контакты
- **Email**: support@mushroom-matters.com
- **Telegram**: @mushroom_matters_support
- **GitHub Issues**: [Создать issue](https://github.com/your-org/mushroom-matters-theme/issues)

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл для деталей.

## 🙏 Благодарности

- Shopify Dawn theme за основу
- Сообщество Shopify за лучшие практики
- Пользователи за обратную связь

---

**Mushroom Matters** - премиальные экстракты грибов для здоровья и благополучия 🍄
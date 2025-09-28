# Настройка Search & Discovery для Mushroom Matters

## Включение Search & Discovery

1. Перейдите в админку Shopify: Settings → Apps and sales channels
2. Найдите "Search & Discovery" и установите приложение
3. Настройте поиск и фильтры для вашего магазина

## Настройка фасетов (Filters)

### 1. Тип гриба (Product Type)
- **Facet Key**: product_type
- **Display Name**: "Тип гриба" / "Mushroom Type"
- **Values**: 
  - Экстракт Lion's Mane
  - Экстракт Reishi  
  - Экстракт Cordyceps

### 2. Объём (Volume)
- **Facet Key**: options.volume_ml
- **Display Name**: "Объём" / "Volume"
- **Values**:
  - 30 мл
  - 60 мл

### 3. Цена (Price)
- **Facet Key**: price
- **Display Name**: "Цена" / "Price"
- **Type**: Price range
- **Ranges**:
  - До 2000 ₽
  - 2000-4000 ₽
  - 4000-6000 ₽
  - Свыше 6000 ₽

### 4. β-глюканы (Beta-glucans)
- **Facet Key**: metafields.custom.beta_glucans_percent
- **Display Name**: "β-глюканы" / "Beta-glucans"
- **Type**: Number range
- **Ranges**:
  - До 10%
  - 10-20%
  - 20-30%
  - Свыше 30%

### 5. Метод экстракции (Extraction Method)
- **Facet Key**: metafields.custom.extraction_method
- **Display Name**: "Метод экстракции" / "Extraction Method"
- **Values**:
  - Dual extraction
  - Alcohol extraction
  - Water extraction

### 6. Происхождение (Origin)
- **Facet Key**: metafields.custom.origin
- **Display Name**: "Происхождение" / "Origin"
- **Values**: Настраивается в зависимости от поставщиков

## Настройка поиска

### Поисковые запросы
- Lion's Mane, Lion's Mane extract, Львиная грива
- Reishi, Reishi extract, Рейши
- Cordyceps, Cordyceps extract, Кордицепс
- Mushroom extract, Экстракт грибов
- Beta-glucans, β-глюканы
- Medicinal mushrooms, Лекарственные грибы

### Синонимы
- Lion's Mane = Львиная грива = Hericium erinaceus
- Reishi = Рейши = Ganoderma lucidum
- Cordyceps = Кордицепс = Cordyceps sinensis

## Настройка коллекций

### Основные коллекции
1. **Все продукты** - все экстракты
2. **Lion's Mane** - только экстракты Lion's Mane
3. **Reishi** - только экстракты Reishi
4. **Cordyceps** - только экстракты Cordyceps
5. **По объёму**:
   - 30 мл
   - 60 мл
6. **По цене**:
   - До 2000 ₽
   - 2000-4000 ₽
   - 4000-6000 ₽
   - Свыше 6000 ₽

## Настройка сортировки

### Доступные опции сортировки
1. **По популярности** (default)
2. **По цене: от низкой к высокой**
3. **По цене: от высокой к низкой**
4. **По названию: A-Z**
5. **По названию: Z-A**
6. **По дате добавления: новые сначала**
7. **По дате добавления: старые сначала**

## Настройка результатов поиска

### Количество результатов на странице
- **По умолчанию**: 12 товаров
- **Опции**: 12, 24, 48 товаров

### Пагинация
- Включить бесконечную прокрутку
- Или стандартную пагинацию

## Настройка автодополнения

### Поисковые подсказки
- Включить автодополнение
- Показывать до 5 подсказок
- Включать товары, коллекции, страницы

### Популярные запросы
- Lion's Mane
- Reishi
- Cordyceps
- Mushroom extract
- Beta-glucans

## Настройка аналитики

### Отслеживаемые метрики
- Популярные поисковые запросы
- Эффективность фильтров
- Конверсия поиска
- Время на странице результатов

### Цели
- Увеличить конверсию поиска до 15%
- Снизить количество пустых результатов поиска
- Улучшить пользовательский опыт поиска

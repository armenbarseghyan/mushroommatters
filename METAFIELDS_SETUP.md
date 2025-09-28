# Настройка метафилдов для Mushroom Matters

## Product Metafields

Создайте следующие метафилды в админке Shopify (Settings → Custom data → Products):

### 1. Метод экстракции
- **Namespace**: custom
- **Key**: extraction_method
- **Type**: Single line text
- **Description**: Метод экстракции (dual/alcohol/water)

### 2. β-глюканы
- **Namespace**: custom
- **Key**: beta_glucans_percent
- **Type**: Number (decimal)
- **Description**: β‑глюканы, %

### 3. Крепость настойки
- **Namespace**: custom
- **Key**: alcohol_percent
- **Type**: Number (decimal)
- **Description**: Крепость настойки, % об.

### 4. Состав
- **Namespace**: custom
- **Key**: ingredients
- **Type**: Multi-line text
- **Description**: Состав

### 5. Дозировка
- **Namespace**: custom
- **Key**: dosage
- **Type**: Multi-line text
- **Description**: Рекомендации по применению / дозировке

### 6. Порций в упаковке
- **Namespace**: custom
- **Key**: servings
- **Type**: Number (integer)
- **Description**: Порций в упаковке

### 7. Происхождение сырья
- **Namespace**: custom
- **Key**: origin
- **Type**: Single line text
- **Description**: Страна/регион происхождения сырья

### 8. Сертификаты
- **Namespace**: custom
- **Key**: coa_url
- **Type**: URL
- **Description**: Ссылка на COA/сертификаты (если есть)

### 9. Предупреждения
- **Namespace**: custom
- **Key**: warnings
- **Type**: Multi-line text
- **Description**: Предупреждения/дисклеймер

### 10. Органолептика
- **Namespace**: custom
- **Key**: taste_notes
- **Type**: Single line text
- **Description**: Органолептика (по желанию)

## Collection Metafields

### Бейдж коллекции
- **Namespace**: custom
- **Key**: badge
- **Type**: Single line text
- **Description**: Бейдж коллекции (new/hit/sale)

## Shop Metafields

### История бренда
- **Namespace**: custom
- **Key**: brand_story_short
- **Type**: Multi-line text
- **Description**: Короткая история бренда для блоков

## Product Types

Создайте следующие типы продуктов:
1. Экстракт Lion's Mane
2. Экстракт Reishi
3. Экстракт Cordyceps

## Product Options

Создайте опцию продукта:
- **Name**: volume_ml
- **Values**: 30 мл, 60 мл

# codecrypt-backend

# Menu Extraction API

This API extracts menu items and their prices from an image. Send a POST request to `/extract-menu` with a JSON payload containing an `image_url` parameter.

## Endpoint

- **POST** `/extract-menu`

## Request Payload

```json
{
  "image_url": "URL_of_the_image"
}
```
## Response Payload
the sample url used was  [menu_image](https://b.zmtcdn.com/data/menus/433/19486433/962156b3391b77e9cba835133c1eadea.jpg)



```json
{
  "menu_items": {
    "Chicken Twister": 100,
    "Chicken Cheese Twister": 110,
    // ... (other menu items)
  }
}

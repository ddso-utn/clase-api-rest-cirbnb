# API REST - Sistema de Alojamientos

API REST desarrollada con Node.js y Express para gestionar alojamientos

## Características

- API RESTful con Express.js
- Validación de datos con Zod

## Uso

```bash
npm run dev
```

## Endpoints

- `GET /alojamientos` - Obtener todos los alojamientos
- `POST /alojamientos` - Crear un nuevo alojamiento
- `GET /alojamientos/:id` - Obtener un alojamiento específico
- `PUT /alojamientos/:id` - Actualizar un alojamiento
- `DELETE /alojamientos/:id` - Eliminar un alojamiento

## Probar la API con Postman

### Importar la Collection

1. **Descargar la collection:**
   - En este repositorio se encuentra el archivo `clase-rest.postman_collection.json`
   - Este archivo contiene todos los endpoints de la API listos para probar

2. **Importar la collection:**
   - Dentro de Postman, hacer click en el botón **"Import"** en la esquina superior izquierda
   - Hacer click en el botón **"Files"**
   - Seleccionar el archivo `clase-rest.postman_collection.json`

# Guion de Presentación Técnica: FoodStore Fullstack (15 min) 🍕🚀

Este guion está estructurado para una defensa técnica profunda. Dividiremos el tiempo en: Introducción (2m), Deep Dive Backend (5m), Deep Dive Frontend (5m), Demo en vivo (2m) y Conclusión (1m).

---

## 1. Introducción y Contexto (2 min)
*   **Acción**: Mostrar la Home de la app y el archivo `README.md`.
*   **Voz**: "Bienvenidos. Hoy voy a presentar FoodStore, un sistema de gestión integral para tiendas de alimentos. El objetivo fue crear una plataforma escalable, segura y con una experiencia de usuario de alto nivel."
*   **Tech Stack**: "Utilizamos FastAPI en el backend por su alto rendimiento y tipado asincrónico. En el frontend, React 19 con TypeScript para máxima robustez, y Tailwind CSS v4 para un diseño minimalista y moderno. La persistencia se maneja con PostgreSQL."

## 2. Deep Dive Backend: El Corazón del Sistema (5 min)

### 2.1 Modelado y SQLModel (1.5 min)
*   **Acción**: Abrir `backend/app/modules/producto/models.py`.
*   **Voz**: "Usamos SQLModel, que unifica Pydantic y SQLAlchemy. Aquí vemos el modelo de Producto. Noten cómo manejamos las relaciones N:N con Categorías e Ingredientes mediante `link_model`. También incluimos campos de auditoría (`created_at`, `updated_at`) para trazabilidad de datos."

### 2.2 Patrones: Repository y Unit of Work (2 min)
*   **Acción**: Abrir `backend/app/core/repository.py` y luego `unit_of_work.py`.
*   **Voz**: "Para evitar el acoplamiento directo con la base de datos, implementamos el patrón **Repository**. Tenemos un `BaseRepository` genérico que maneja el CRUD básico. Pero la clave de la integridad es el **Unit of Work**. Este patrón nos asegura que todas las operaciones dentro de un servicio ocurran en una única transacción: o se guarda todo, o no se guarda nada."

### 2.3 Capa de Servicio y Lógica N:N (1.5 min)
*   **Acción**: Mostrar `backend/app/modules/producto/service.py`.
*   **Voz**: "En la capa de servicio orquestamos la lógica compleja. Al crear un producto, no solo guardamos el registro base, sino que gestionamos manualmente los enlaces en las tablas intermedias. Usamos `session.flush()` para obtener IDs antes del commit final, garantizando atomicidad."

## 3. Deep Dive Frontend: Experiencia de Usuario (5 min)

### 3.1 Estructura y Tailwind v4 (1.5 min)
*   **Acción**: Mostrar `frontend/src/layouts/MainLayout.tsx` y `index.css`.
*   **Voz**: "El frontend se diseñó con un enfoque 'Glassmorphism' usando las nuevas capacidades de **Tailwind v4**. Configuramos un sistema de diseño oscuro premium con `backdrop-blur` y bordes sutiles. La estructura es modular, separando layouts, páginas y componentes UI reutilizables."

### 3.2 Gestión de Estado con TanStack Query (2 min)
*   **Acción**: Mostrar `frontend/src/hooks/useProductos.ts` y `useCreateProducto.ts`.
*   **Voz**: "No usamos un estado global pesado. Optamos por **TanStack Query (React Query)** para el 'Server State'. Esto nos da cacheo automático y una sincronización perfecta. Al mutar un dato (crear o editar), invalidamos las queries relacionadas para que la UI se refresque instantáneamente sin recargar la página."

### 3.3 Formularios y Relaciones Complejas (1.5 min)
*   **Acción**: Abrir `frontend/src/components/productos/ProductosForm.tsx`.
*   **Voz**: "El formulario de productos es el más complejo. Maneja estados locales para checkboxes de relaciones y una lista dinámica de URLs de imágenes. Todo está estrictamente tipado con interfaces de TypeScript sincronizadas con los Schemas de FastAPI."

## 4. Demo en Vivo: Funcionalidad de Punta a Punta (2 min)

### 4.1 Jerarquías y Alérgenos (1 min)
*   **Acción**:
    1. Crear una categoría padre e hija.
    2. Crear un ingrediente marcándolo como Alérgeno.
*   **Voz**: "Miren la flexibilidad: puedo crear jerarquías de categorías infinitas. Y en ingredientes, el sistema alerta visualmente si uno es alérgeno, un requerimiento vital para el cumplimiento de normativas alimentarias."

### 4.2 El Flujo del Producto (1 min)
*   **Acción**:
    1. Crear un producto asignando las categorías e ingredientes creados.
    2. Ir al **Detalle del Producto**.
    3. Editar un campo y ver cómo impacta.
    4. Borrar un producto.
*   **Voz**: "Al crear un producto, vemos la integración total. En la página de detalle, la info se presenta de forma premium. Si editamos, el backend procesa solo los cambios necesarios gracias a nuestros Schemas de Update parcial."

## 5. Conclusión y Aprendizajes (1 min)
*   **Acción**: Mostrar de nuevo la Home.
*   **Voz**: "FoodStore no es solo un CRUD; es una base sólida para un sistema escalable. El desafío más grande fue manejar las relaciones N:N manteniendo la simplicidad en el frontend, algo que logramos gracias al patrón UoW. Este proyecto demuestra cómo las tecnologías modernas como FastAPI y React pueden crear herramientas profesionales de forma ágil. Muchas gracias."

---

### 💡 Consejos para los 15 minutos:
1.  **Ritmo**: No corras. Tenés tiempo. Si una parte del código es muy interesante (ej. el UoW), dedicate 30 segundos más ahí.
2.  **Errores**: Si algo falla en la demo, no entres en pánico. Explicá qué debería pasar: *"Aquí hubo un tema de cache, pero la lógica del commit en el UoW nos asegura que la DB está íntegra"*. Eso suma puntos de madurez.
3.  **Preparación**: Tené el backend y el front ya corriendo antes de empezar a grabar.
4.  **Cursor**: Usá un resaltador de cursor o movelo suavemente para que el profe siga lo que explicás.

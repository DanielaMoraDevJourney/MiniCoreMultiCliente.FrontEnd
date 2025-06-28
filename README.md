
# MiniCoreMultiCliente.FrontEnd

Aplicación frontend desarrollada con **React + Vite + TypeScript**, diseñada para consumir la API REST del sistema MiniCoreMultiCliente. Permite a los usuarios gestionar vendedores, ventas, clientes y calcular comisiones según las reglas definidas en el backend.

---

## Estructura del proyecto

Este proyecto sigue una estructura modular basada en componentes reutilizables y principios de diseño limpio:

```

MiniCoreMultiCliente.FrontEnd/
│
├── src/
│   ├── api/                   # Servicios para llamadas HTTP (axios)
│   ├── auth/                  # Lógica de autenticación (tokens, sesión)
│   ├── components/            # Componentes reutilizables de UI
│   ├── context/               # Contextos globales (ej. usuario)
│   ├── pages/                 # Vistas principales por módulo
│   ├── routes/                # Rutas y navegación
│   ├── styles/                # Archivos CSS y configuración visual
│   └── main.tsx              # Punto de entrada de la app

````

---

## Funcionalidades

- Visualización y creación de clientes
- Registro de ventas por vendedor
- Consulta de comisiones por vendedor
- Filtro de ventas por rango de fechas
- Integración con backend mediante axios
- Interfaz moderna, responsiva y ligera
- Despliegue en Render y compatible con Docker

---

## Tecnologías principales

- React 18 + TypeScript
- Vite como bundler
- Axios para consumo de API REST
- React Router DOM
- CSS personalizado y estructura modular
- Render para hosting
- GitHub Actions (opcional) para CI/CD

---

## Instalación local

1. Clona el repositorio

```bash
git clone https://github.com/DanielaMoraDevJourney/MiniCoreMultiCliente.FrontEnd.git
cd MiniCoreMultiCliente.FrontEnd
````

2. Instala las dependencias

```bash
npm install
```

3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:

```
VITE_API_BASE_URL=https://minicoremulticlienteapi.onrender.com/api
```

4. Ejecuta el servidor de desarrollo

```bash
npm run dev
```

---

## Scripts disponibles

| Script          | Descripción                       |
| --------------- | --------------------------------- |
| npm run dev     | Ejecuta la app en modo desarrollo |
| npm run build   | Genera la versión para producción |
| npm run preview | Visualiza la build de producción  |

---

## Integración con el backend

Este frontend se conecta a la API desarrollada en .NET 8. Todos los endpoints están documentados en Swagger y se consumen a través del servicio central `api/axiosInstance.ts`.

---

## Despliegue

El proyecto está desplegado en Render en la siguiente URL:

[https://minicoremulticliente-frontend.onrender.com](https://minicoremulticliente-frontend.onrender.com)

---

## Repositorio del backend

El sistema se complementa con el backend en .NET 8 disponible en:

[MiniCoreMultiCliente.API](https://github.com/DanielaMoraDevJourney/MiniCoreMultiCliente.API.git)

---

## Autor

Desarrollado por [Daniela Mora](https://github.com/DanielaMoraDevJourney) como proyecto full stack orientado a buenas prácticas, arquitectura limpia, separación de responsabilidades y patrones de diseño reutilizables.


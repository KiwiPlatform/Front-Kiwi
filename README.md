# Frontend Kiwi

Frontend para el sistema de gestión de leads de KiwiPay.

## Requisitos

- Node.js v18 o superior
- npm v9 o superior

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```

3. Copia el archivo de variables de entorno:
```bash
cp env.example .env
```

4. Configura las variables según tu entorno:
```
VITE_API_URL=http://localhost:8080/api/v1
VITE_USE_MOCKS=true  # Cambia a false para usar el API real
VITE_DEBUG=true
```

## Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Sistema de Mocks

El proyecto incluye un sistema de mocks que permite trabajar sin necesidad de tener el backend operativo. 

### Activar/Desactivar Mocks

Para activar los mocks, configura en tu archivo `.env`:
```
VITE_USE_MOCKS=true
```

Para desactivar los mocks y usar el backend real:
```
VITE_USE_MOCKS=false
```

### Usuarios de Prueba (Modo Mock)

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| `admin` | `admin123` | ADMIN |
| `user` | `user123` | USER |

### Más Información

Consulta la documentación completa del sistema de mocks en [src/mocks/README.md](./src/mocks/README.md).
## Integración con Backend

Para información sobre la integración con el backend real, consulta [MOCK_SETUP.md](./MOCK_SETUP.md).

## Construcción para Producción

Genera los archivos para producción:
```bash
npm run build
```

Preview de la versión de producción:
```bash
npm run preview
```

## Tecnologías Utilizadas

- React
- TypeScript
- Vite
- React Router
- Axios
```

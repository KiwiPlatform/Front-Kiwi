# Configuración de Mocks y Variables de Entorno

## 📋 Resumen

Este proyecto utiliza un sistema híbrido de mocks que permite alternar fácilmente entre datos simulados y llamadas reales a la API, facilitando el desarrollo y la transición al backend real.

## 🚀 Configuración Rápida

### 1. Variables de Entorno

Copia el archivo `env.example` a `.env` y configura las variables:

```bash
cp env.example .env
```

### 2. Configuración del archivo `.env`

```env
# Variables de entorno para desarrollo
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCKS=true
VITE_APP_NAME=FRONT-kiwi
VITE_APP_VERSION=1.0.0
```

## 🔧 Cómo Funciona

### Modo Mock (Desarrollo)
- `VITE_USE_MOCKS=true`: Usa datos simulados
- Los servicios devuelven datos mock con delays realistas
- Logs detallados en consola para debugging

### Modo API Real (Producción)
- `VITE_USE_MOCKS=false`: Usa llamadas reales a la API
- Interceptores automáticos para autenticación y manejo de errores
- Redirección automática al login si el token expira

## 📁 Estructura de Archivos

```
src/
├── config/
│   └── environment.ts          # Configuración centralizada
├── services/
│   ├── apiClient.ts           # Cliente HTTP con interceptores
│   ├── authService.ts         # Servicio de autenticación
│   └── leadService.ts         # Servicio de leads
└── types/
    └── Lead.ts               # Tipos TypeScript
```

## 🛠️ Uso de los Servicios

### Autenticación
```typescript
import authService from '../services/authService';

// Login (funciona con mocks y API real)
const user = await authService.login('miriam', 'password');
```

### Gestión de Leads
```typescript
import { getLeads, createLead, updateLead, deleteLead } from '../services/leadService';

// Obtener todos los leads
const leads = await getLeads();

// Crear nuevo lead
const newLead = await createLead({
  cliente: 'Nuevo Cliente',
  clinica: 'Clínica Test',
  // ... otros campos
});

// Actualizar lead
const updatedLead = await updateLead(1, { costo: '3000' });

// Eliminar lead
await deleteLead(1);
```

## 🔄 Transición al Backend Real

### Paso 1: Configurar la URL del backend
```env
VITE_API_URL=https://tu-backend.com/api
```

### Paso 2: Desactivar mocks
```env
VITE_USE_MOCKS=false
```

### Paso 3: Verificar endpoints
Los servicios ya están configurados para usar estos endpoints:
- `POST /auth/login` - Autenticación
- `GET /leads` - Listar leads
- `GET /leads/:id` - Obtener lead específico
- `POST /leads` - Crear lead
- `PUT /leads/:id` - Actualizar lead
- `DELETE /leads/:id` - Eliminar lead

## 🐛 Debugging

### Logs de Desarrollo
Los logs aparecen en la consola del navegador:
- `[DEV]` - Información general
- `[DEV] API Request:` - Llamadas salientes
- `[DEV] API Response:` - Respuestas entrantes
- `[DEV] API Response Error:` - Errores de API

### Verificar Configuración
```typescript
import { config, isUsingMocks } from '../config/environment';

console.log('Using mocks:', isUsingMocks());
console.log('API URL:', config.API_URL);
```

## 📊 Ventajas de esta Implementación

### ✅ Pros
- **Transición suave**: Cambio fácil entre mocks y API real
- **Desarrollo independiente**: No depende del backend para desarrollar
- **Testing realista**: Los mocks simulan delays y errores
- **Mantenimiento simple**: No requiere librerías adicionales
- **Control total**: Comportamiento completamente personalizable

### ⚠️ Consideraciones
- Los mocks se resetean al recargar la página
- No persisten cambios entre sesiones
- Requiere sincronización manual con el backend real

## 🎯 Recomendaciones

1. **Desarrollo**: Mantén `VITE_USE_MOCKS=true`
2. **Testing**: Usa mocks para tests unitarios
3. **Integración**: Cambia a `VITE_USE_MOCKS=false` cuando el backend esté listo
4. **Producción**: Siempre usa `VITE_USE_MOCKS=false`

## 🔗 Dependencias

- `axios`: Cliente HTTP
- `react`: Framework de UI
- `typescript`: Tipado estático

No se requieren librerías adicionales para mocks. 
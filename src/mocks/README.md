# Configuración de Mocks para Frontend Kiwi

## Introducción

Este documento explica cómo usar el sistema de mocks implementado en el Frontend Kiwi. Los mocks permiten desarrollar y probar la aplicación sin necesidad de tener un backend funcional.

## Activar/Desactivar Mocks

Los mocks se activan mediante la variable de entorno `VITE_USE_MOCKS`:

1. **Activar mocks**: Establece `VITE_USE_MOCKS=true` en tu archivo `.env`
2. **Desactivar mocks**: Establece `VITE_USE_MOCKS=false` en tu archivo `.env` (valor por defecto)

Ejemplo de configuración en `.env`:
```
VITE_USE_MOCKS=true
VITE_API_URL=http://localhost:8080/api/v1
VITE_DEBUG=true
```

## Endpoints Mockeados

El sistema de mocks actualmente soporta los siguientes endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/auth/login` | Autenticación de usuario |
| `GET` | `/leads/all` | Listar todos los leads |
| `GET` | `/leads/:id` | Obtener lead específico |
| `POST` | `/leads` | Crear nuevo lead |
| `PUT` | `/leads/:id` | Actualizar lead |
| `DELETE` | `/leads/:id` | Eliminar lead |

## Usuarios de Prueba

Cuando los mocks están activados, puedes usar los siguientes usuarios para iniciar sesión:

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| `admin` | `admin123` | ADMIN |
| `user` | `user123` | USER |

## Persistencia de Datos

Los datos de los leads se guardan en localStorage, lo que permite:
- Mantener los cambios entre recargas de página
- Simular un entorno de desarrollo más realista

## Identificación Visual de Modo Mock

Cuando los mocks están activados, verás lo siguiente en la consola del navegador:

```
✅ 🔶 MOCK MODE ENABLED - Using mock data instead of real API 🔶
```

Además, cada llamada a API mostrará un indicador `🔶 MOCK MODE: Intercepting...` en los logs.

## Estructura de Archivos

El sistema de mocks se organiza en los siguientes archivos:

```
src/
├── mocks/
│   ├── MockData.ts        # Datos iniciales y funciones de persistencia
│   ├── MockHandlers.ts    # Manejadores para cada endpoint 
│   ├── MockService.ts     # Interceptor de Axios para las llamadas API
│   ├── AuthServiceMock.ts # Implementación directa del servicio de autenticación
│   ├── LeadServiceMock.ts # Implementación directa del servicio de leads
│   └── README.md          # Esta documentación
└── main.tsx               # Inicialización del sistema de mocks
```

## Implementación Directa vs Interceptores

El sistema de mocks tiene dos enfoques complementarios:

1. **Interceptores de Axios**: Interceptan las llamadas a la API y devuelven datos mockeados sin realizar solicitudes de red.

2. **Implementación Directa de Servicios**: Reemplaza los servicios reales (authService, leadService) con implementaciones mockeadas cuando `VITE_USE_MOCKS=true`.

La implementación directa de servicios es más confiable ya que:

- Evita completamente cualquier problema con interceptores Axios
- Asegura que nunca se realicen solicitudes de red
- Funciona incluso cuando se realizan llamadas directas a los servicios
- Protege de cambios futuros en la implementación de servicios

La implementación actual utiliza **ambos enfoques** para garantizar la máxima compatibilidad y robustez.

## Añadir Nuevos Mocks

Para añadir soporte para nuevos endpoints:

### Enfoque con Interceptores Axios:
1. Añade los datos necesarios en `MockData.ts`
2. Crea un nuevo manejador en `MockHandlers.ts`
3. Agrega la lógica de intercepción en `MockService.ts`

### Enfoque con Implementación Directa (recomendado):
1. Añade los datos necesarios en `MockData.ts`
2. Crea un nuevo archivo de mock para el servicio (ej: `NuevoServiceMock.ts`)
3. Implementa la lógica directa para cada función del servicio
4. Modifica el servicio original para usar la implementación mock cuando `isUsingMocks()` es true

## Depuración

Si encuentras problemas con los mocks:

1. Asegúrate de que `VITE_USE_MOCKS=true` y `VITE_DEBUG=true` estén configurados
2. Revisa la consola del navegador para ver los logs detallados
3. Verifica que la ruta de la API coincida exactamente con los patrones esperados

## Ventajas del Sistema de Mocks

- **Desarrollo independiente**: No requiere tener el backend funcionando
- **Pruebas rápidas**: Respuestas instantáneas sin latencia de red real
- **Casos específicos**: Permite probar escenarios de error y casos borde
- **Consistencia**: Datos predecibles para desarrollo y pruebas
- **Doble capa de protección**: Implementación directa + interceptores
- **Persistencia**: Los datos modificados persisten entre recargas
- **Mínima intrusión**: Cambios mínimos en el código de producción
- **Debugging visual**: Indicadores claros del uso de mocks en consola
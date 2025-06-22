# Integración Frontend con Backend KiwiPay

## 📋 Resumen

Este frontend está **completamente integrado** con el backend KiwiPay. Ya no utiliza mocks por defecto, sino que consume directamente los endpoints reales del backend en `http://localhost:8080/api/v1`.

## 🚀 Configuración Rápida

### 1. Variables de Entorno

Copia el archivo `env.example` a `.env` y configura:

```bash
cp env.example .env
```

### 2. Configuración del archivo `.env`

```env
# Backend KiwiPay
VITE_API_URL=http://localhost:8080/api/v1
VITE_USE_MOCKS=false
VITE_APP_NAME=KiwiPay Loan Management
VITE_APP_VERSION=1.0.0
VITE_DEBUG=true
```

## 🔌 Endpoints Implementados

### ✅ Endpoints Compatibles/Coincidentes (IMPLEMENTADOS)

| Método | Endpoint | Descripción | Status |
|--------|----------|-------------|---------|
| `POST` | `/auth/login` | Autenticación de usuario | ✅ **Funcionando** |
| `GET` | `/leads` | Listar todos los leads | ✅ **Funcionando** |
| `GET` | `/leads/:id` | Obtener lead específico | ✅ **Funcionando** |
| `POST` | `/leads` | Crear nuevo lead | ✅ **Funcionando** |
| `PUT` | `/leads/:id` | Actualizar lead | ✅ **Funcionando** |
| `DELETE` | `/leads/:id` | Eliminar lead | ✅ **Funcionando** |

### 🔄 Adaptación de Datos

El frontend mantiene compatibilidad total con la interfaz actual mediante adaptadores automáticos:

```typescript
// Frontend (interfaz actual)
interface Lead {
  id: number;
  cliente: string;
  clinica: string;
  correo: string;
  // ...
}

// Backend KiwiPay (adaptado automáticamente)
interface BackendLead {
  id: number;
  clientName: string;
  clinicName: string;
  email: string;
  // ...
}
```

## 🔧 Estructura de Archivos Actualizada

```
src/
├── config/
│   └── environment.ts          # Configuración KiwiPay + logs mejorados
├── services/
│   ├── apiClient.ts           # Cliente HTTP con interceptores KiwiPay
│   ├── authService.ts         # Servicio auth adaptado a KiwiPay
│   ├── leadService.ts         # Servicio leads adaptado a KiwiPay
│   └── testEndpoints.ts       # Testing completo de endpoints
└── types/
    └── Lead.ts               # Tipos TypeScript (sin cambios)
```

## 🛠️ Sistema de Logging Mejorado

### Logs Automáticos
Todos los endpoints generan logs detallados:

```typescript
🚀 [10:30:15] KIWIPAY API REQUEST: POST /auth/login
📥 [10:30:16] KIWIPAY API RESPONSE: POST /auth/login - Status: 200
✅ [10:30:16] KIWIPAY API SUCCESS: Login successful from KiwiPay backend
```

### Configuración de Debug
```env
VITE_DEBUG=true  # Activa logs detallados
VITE_DEBUG=false # Solo errores en producción
```

## 🧪 Testing de Endpoints

### Testing Completo Automático
```typescript
import endpointTesting from '../services/testEndpoints';

// Probar todos los endpoints
const results = await endpointTesting.testAllEndpoints();

// Probar solo autenticación
const authOk = await endpointTesting.testAuthEndpoint('usuario', 'password');

// Probar solo leads
const leadsResults = await endpointTesting.testLeadsEndpoints();
```

### Ejecutar desde Consola del Navegador
```javascript
// Importar el tester en cualquier componente y ejecutar:
import { testAllEndpoints } from '../services/testEndpoints';

// Ejecutar testing completo
testAllEndpoints().then(results => {
  console.log('Testing completado:', results.summary);
});
```

## 📊 Verificación de Funcionamiento

### ✅ Cómo Verificar que Todo Funciona

1. **Inicia tu backend KiwiPay** en el puerto 8080
2. **Inicia el frontend**: `npm run dev`
3. **Abre la consola del navegador** (F12)
4. **Verifica los logs automáticos**:
   ```
   ✅ [timestamp] KIWIPAY API SUCCESS: KiwiPay API Client initialized
   ✅ [timestamp] KIWIPAY API SUCCESS: AuthService initialized for KiwiPay backend
   ✅ [timestamp] KIWIPAY API SUCCESS: LeadService initialized for KiwiPay backend
   ```
5. **Realiza cualquier acción** (login, ver leads, etc.)
6. **Observa los logs detallados** de cada operación

### 🎯 Log de Confirmación
Si todo funciona correctamente, verás este mensaje en consola:
```
🎉 ¡TODOS LOS ENDPOINTS FUNCIONAN CORRECTAMENTE!
✅ El frontend está completamente integrado con el backend KiwiPay
```

## 🔄 Endpoints Backend KiwiPay

### Autenticación
```typescript
POST /auth/login
{
  "username": "string",
  "password": "string"
}

// Respuesta:
{
  "token": "jwt-token",
  "type": "Bearer",
  "username": "usuario",
  "email": "email@example.com",
  "role": "USER",
  "expiresIn": 86400
}
```

### Gestión de Leads
```typescript
// GET /leads - Obtener todos los leads
// Respuesta: BackendLead[]

// GET /leads/:id - Obtener lead específico
// Respuesta: BackendLead

// POST /leads - Crear lead
{
  "receptionistName": "string",
  "clientName": "string", 
  "clinicId": 1,
  "medicalSpecialtyId": 1,
  "dni": "12345678",
  "monthlyIncome": 5000,
  "treatmentCost": 10000,
  "phone": "987654321",
  "email": "optional@email.com"
}

// PUT /leads/:id - Actualizar lead
// Same structure as POST, all fields optional

// DELETE /leads/:id - Eliminar lead
// Response: 200/204 status
```

## 🚨 Manejo de Errores RFC 7807

El frontend maneja automáticamente los errores en formato RFC 7807 del backend:

```typescript
// Error del backend:
{
  "title": "Validation Failed",
  "detail": "Request validation failed",
  "status": 400,
  "errors": {
    "dni": "DNI debe tener 8 dígitos",
    "email": "Email inválido"
  }
}

// El frontend automáticamente:
// 1. Logea el error detalladamente
// 2. Expone los errores de validación
// 3. Maneja redirecciones automáticas (401 -> login)
```

## 🎯 Ventajas de la Implementación

### ✅ Pros
- **✅ Integración real**: Conectado directamente al backend KiwiPay
- **✅ Logs detallados**: Debugging completo de todas las operaciones
- **✅ Compatible 100%**: Los componentes actuales funcionan sin cambios
- **✅ Adaptadores automáticos**: Convierte formatos automáticamente
- **✅ Testing integrado**: Verificación automática de endpoints
- **✅ Manejo de errores**: RFC 7807 completamente soportado
- **✅ Autenticación JWT**: Integrada con tu sistema de autenticación

### ⚠️ Nota Importante
- Los campos `clinicId` y `medicalSpecialtyId` usan valores por defecto (1) para crear leads
- Cuando implementes los endpoints de catálogos, se podrán obtener los IDs reales

## 🔗 Dependencias

- `axios`: Cliente HTTP (ya existente)
- `react`: Framework UI (ya existente)  
- `typescript`: Tipado estático (ya existente)

**No se requieren librerías adicionales** - Todo funciona con las dependencias existentes.

## 🏁 Estado Actual

**✅ IMPLEMENTACIÓN COMPLETA**
- ✅ Todos los endpoints compatibles funcionando
- ✅ Adaptadores de datos implementados
- ✅ Logs detallados funcionando
- ✅ Testing automático implementado
- ✅ Manejo de errores RFC 7807
- ✅ Autenticación JWT integrada
- ✅ Compatibilidad total con componentes existentes

**El frontend está listo para usar con tu backend KiwiPay.** 
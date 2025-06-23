import authService from './authService';
import { getLeads, getLeadById, createLead, updateLead, deleteLead } from './leadService';
import { apiLog } from '../config/environment';

/**
 * TESTING COMPLETO DE ENDPOINTS KIWIPAY
 * 
 * Este módulo verifica que todos los endpoints del backend KiwiPay funcionen correctamente.
 * Ejecuta todas las operaciones CRUD y genera logs detallados.
 */

interface TestResult {
  endpoint: string;
  method: string;
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

const testResults: TestResult[] = [];

const addTestResult = (endpoint: string, method: string, success: boolean, message: string, data?: any, error?: any) => {
  testResults.push({ endpoint, method, success, message, data, error });
  
  const emoji = success ? '✅' : '❌';
  const timestamp = new Date().toLocaleTimeString();
  
  console.log(`${emoji} [${timestamp}] ${method} ${endpoint}: ${message}`);
  
  if (data) {
    console.log('📄 Data:', data);
  }
  
  if (error) {
    console.log('⚠️ Error:', error);
  }
};

export const testAllEndpoints = async () => {
  apiLog('REQUEST', 'Starting complete KiwiPay backend endpoint testing', {
    timestamp: new Date().toISOString()
  });

  console.log('\n🚀 INICIANDO PRUEBAS DE ENDPOINTS KIWIPAY\n');
  console.log('========================================\n');

  // Limpiar resultados anteriores
  testResults.length = 0;

  // 1. TEST DE AUTENTICACIÓN
  console.log('🔐 TESTING AUTHENTICATION ENDPOINT\n');
  
  try {
    // Intentar login (necesitarás credenciales válidas)
    const loginResult = await authService.login('testuser', 'testpassword');
    addTestResult('/auth/login', 'POST', true, 'Login successful', {
      username: loginResult.user.name,
      email: loginResult.user.email,
      hasToken: !!loginResult.token
    });
  } catch (error: any) {
    addTestResult('/auth/login', 'POST', false, 'Login failed - credentials may be invalid', null, {
      status: error.response?.status,
      message: error.message,
      detail: error.response?.data?.detail
    });
  }

  // 2. TEST DE LEADS - OBTENER TODOS
  console.log('\n📋 TESTING LEADS ENDPOINTS\n');
  
  try {
    const leads = await getLeads();
    addTestResult('/leads', 'GET', true, `Retrieved ${leads.length} leads successfully`, {
      count: leads.length,
      sampleLead: leads[0] ? {
        id: leads[0].id,
        cliente: leads[0].cliente,
        clinica: leads[0].clinica
      } : null
    });
  } catch (error: any) {
    addTestResult('/leads', 'GET', false, 'Failed to retrieve leads', null, {
      status: error.response?.status,
      message: error.message,
      detail: error.response?.data?.detail
    });
  }

  // 3. TEST DE LEADS - OBTENER POR ID
  try {
    const leadById = await getLeadById(1);
    if (leadById) {
      addTestResult('/leads/1', 'GET', true, 'Retrieved lead by ID successfully', {
        id: leadById.id,
        cliente: leadById.cliente,
        clinica: leadById.clinica
      });
    } else {
      addTestResult('/leads/1', 'GET', false, 'Lead with ID 1 not found', null, {
        message: 'Lead not found or returned undefined'
      });
    }
  } catch (error: any) {
    addTestResult('/leads/1', 'GET', false, 'Failed to retrieve lead by ID', null, {
      status: error.response?.status,
      message: error.message,
      detail: error.response?.data?.detail
    });
  }

  // 4. TEST DE LEADS - CREAR NUEVO
  const testLead = {
    cliente: 'Test Client KiwiPay',
    clinica: 'Test Clinic KiwiPay',
    correo: 'test@kiwipay.com',
    costo: '5000',
    dni: '12345678',
    especialidad: 'Test Specialty',
    ingreso: '10000',
    recepcionista: 'Test Receptionist',
    telefono: '987654321'
  };

  let createdLeadId: number | null = null;

  try {
    const newLead = await createLead(testLead);
    createdLeadId = newLead.id;
    addTestResult('/leads', 'POST', true, 'Created new lead successfully', {
      id: newLead.id,
      cliente: newLead.cliente,
      clinica: newLead.clinica
    });
  } catch (error: any) {
    addTestResult('/leads', 'POST', false, 'Failed to create new lead', null, {
      status: error.response?.status,
      message: error.message,
      detail: error.response?.data?.detail,
      validationErrors: error.validationErrors
    });
  }

  // 5. TEST DE LEADS - ACTUALIZAR
  if (createdLeadId) {
    try {
      const updatedLead = await updateLead(createdLeadId, {
        cliente: 'Updated Test Client KiwiPay',
        costo: '6000'
      });
      addTestResult(`/leads/${createdLeadId}`, 'PUT', true, 'Updated lead successfully', {
        id: updatedLead.id,
        cliente: updatedLead.cliente,
        costo: updatedLead.costo
      });
    } catch (error: any) {
      addTestResult(`/leads/${createdLeadId}`, 'PUT', false, 'Failed to update lead', null, {
        status: error.response?.status,
        message: error.message,
        detail: error.response?.data?.detail,
        validationErrors: error.validationErrors
      });
    }
  }

  // 6. TEST DE LEADS - ELIMINAR
  if (createdLeadId) {
    try {
      await deleteLead(createdLeadId);
      addTestResult(`/leads/${createdLeadId}`, 'DELETE', true, 'Deleted lead successfully', {
        deletedId: createdLeadId
      });
    } catch (error: any) {
      addTestResult(`/leads/${createdLeadId}`, 'DELETE', false, 'Failed to delete lead', null, {
        status: error.response?.status,
        message: error.message,
        detail: error.response?.data?.detail
      });
    }
  }

  // RESUMEN DE RESULTADOS
  console.log('\n========================================\n');
  console.log('📊 RESUMEN DE PRUEBAS KIWIPAY\n');

  const successCount = testResults.filter(r => r.success).length;
  const failCount = testResults.filter(r => !r.success).length;
  const totalTests = testResults.length;

  console.log(`✅ Exitosas: ${successCount}/${totalTests}`);
  console.log(`❌ Fallidas: ${failCount}/${totalTests}`);
  console.log(`📈 Porcentaje de éxito: ${((successCount / totalTests) * 100).toFixed(1)}%\n`);

  // Mostrar detalles de pruebas fallidas
  const failedTests = testResults.filter(r => !r.success);
  if (failedTests.length > 0) {
    console.log('🔍 DETALLES DE PRUEBAS FALLIDAS:\n');
    failedTests.forEach((test, index) => {
      console.log(`${index + 1}. ${test.method} ${test.endpoint}`);
      console.log(`   Mensaje: ${test.message}`);
      if (test.error) {
        console.log(`   Error: ${JSON.stringify(test.error, null, 2)}`);
      }
      console.log('');
    });
  }

  const allEndpointsWorking = failCount === 0;
  
  if (allEndpointsWorking) {
    console.log('🎉 ¡TODOS LOS ENDPOINTS FUNCIONAN CORRECTAMENTE!');
    console.log('✅ El frontend está completamente integrado con el backend KiwiPay');
  } else {
    console.log('⚠️ Algunos endpoints necesitan atención');
    console.log('📋 Revisa los errores arriba para más detalles');
  }

  apiLog('SUCCESS', 'Endpoint testing completed', {
    totalTests,
    successCount,
    failCount,
    success: allEndpointsWorking
  });

  return {
    success: allEndpointsWorking,
    results: testResults,
    summary: {
      total: totalTests,
      passed: successCount,
      failed: failCount,
      percentage: ((successCount / totalTests) * 100).toFixed(1)
    }
  };
};

export const testAuthEndpoint = async (username: string, password: string) => {
  console.log('\n🔐 TESTING AUTH ENDPOINT ONLY\n');
  
  try {
    const result = await authService.login(username, password);
    console.log('✅ AUTH ENDPOINT WORKING');
    console.log('📄 Response:', {
      username: result.user.name,
      email: result.user.email,
      hasToken: !!result.token
    });
    return true;
  } catch (error: any) {
    console.log('❌ AUTH ENDPOINT FAILED');
    console.log('⚠️ Error:', {
      status: error.response?.status,
      message: error.message,
      detail: error.response?.data?.detail
    });
    return false;
  }
};

export const testLeadsEndpoints = async () => {
  console.log('\n📋 TESTING LEADS ENDPOINTS ONLY\n');
  
  const results = [];
  
  // Test GET /leads
  try {
    const leads = await getLeads();
    console.log('✅ GET /leads WORKING');
    console.log(`📄 Retrieved ${leads.length} leads`);
    results.push({ endpoint: 'GET /leads', success: true });
  } catch (error: any) {
    console.log('❌ GET /leads FAILED');
    console.log('⚠️ Error:', error.message);
    results.push({ endpoint: 'GET /leads', success: false });
  }
  
  return results;
};

// Exportar para uso en componentes
export default {
  testAllEndpoints,
  testAuthEndpoint,
  testLeadsEndpoints
}; 
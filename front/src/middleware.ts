import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('🔍 Middleware ejecutándose para:', pathname);

  // 1. Lista de rutas protegidas
  const protectedPaths = ['/dashboard']; // Añade más si es necesario
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  // 2. Si la ruta no está protegida, continuar sin verificación
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // 3. Verificar autenticación (usando auth_data)
  const authCookie = request.cookies.get('auth_data')?.value;
  console.log('🍪 Valor de auth_data:', authCookie ? 'PRESENTE' : 'AUSENTE');

  if (!authCookie) {
    console.log('❌ Redirigiendo a / (cookie ausente)');
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // 4. Parsear y validar los datos de la cookie
    const parsedData = JSON.parse(authCookie);
    console.log('📦 Contenido de auth_data:', {
      id: parsedData.id,
      email: parsedData.email,
      role: parsedData.role,
      cryptoToken: '...' // No mostramos el token completo por seguridad
    });

    // 5. Verificar estructura básica
    if (!parsedData.id || !parsedData.cryptoToken) {
      throw new Error('Estructura de cookie inválida');
    }

    console.log('✅ Usuario autenticado, acceso permitido');
    return NextResponse.next();

  } catch (error) {
    console.error('🛑 Error al validar auth_data:', error);
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Configuración opcional para rutas específicas
export const config = {
  matcher: ['/dashboard'], // Ajusta según tus rutas
};
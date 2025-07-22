import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string;

// Función simplificada para verificar autenticación
const isAuthenticated = (request: NextRequest): boolean => {
  const authToken = request.cookies.get('auth_token')?.value;
  const userData = request.cookies.get('user_data')?.value;
  
  console.log('🍪 Auth token exists:', !!authToken);
  console.log('🍪 User data exists:', !!userData);
  console.log('🍪 Auth token value:', authToken ? 'PRESENTE' : 'AUSENTE');
  console.log('🍪 User data value:', userData ? 'PRESENTE' : 'AUSENTE');
  
  // Verificar que ambas cookies existen
  const isAuth = !!(authToken && userData);
  console.log('🔐 Final auth result:', isAuth);
  
  return isAuth;
};

export function middleware(request: NextRequest) {
    console.log('🔍 Middleware ejecutándose para:', request.nextUrl.pathname);
    
    const protectedPaths = ['/dashboard'];
    const isProtectedPath = protectedPaths.some(path =>
      request.nextUrl.pathname.startsWith(path)
    );
  
    if (!isProtectedPath) {
      return NextResponse.next();
    }
  
    const authenticated = isAuthenticated(request);
    
    if (!authenticated) {
      console.log('❌ Redirigiendo a login...');
      const loginUrl = new URL('/', request.url);
      return NextResponse.redirect(loginUrl);
    }
  
    console.log('✅ Acceso permitido');
    return NextResponse.next();
  }
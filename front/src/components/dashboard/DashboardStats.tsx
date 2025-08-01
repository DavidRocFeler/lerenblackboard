import { 
    CalendarCheck, 
    ClipboardList, 
    DollarSign, 
    Users 
  } from "lucide-react";
  import Link from "next/link";
  
  const DashboardStats = () => {
    // Datos de ejemplo
    const stats = {
      alumnosPendientes: 3,
      proximosEventos: 2,
      gastosMes: 2450,
      anotacionesRecientes: 5,
    };
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tarjeta 1: Alumnos con pagos pendientes */}
        <div className="border border-blue-200 rounded-lg bg-white">
          <div className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-blue-600">
                Pagos Pendientes
              </h3>
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-800">
              {stats.alumnosPendientes}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Alumnos con pagos atrasados
            </p>
            <Link 
              href="/alumnos?filter=pending" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
            >
              Ver detalles
            </Link>
          </div>
        </div>
  
        {/* Tarjeta 2: Próximos eventos */}
        <div className="border border-green-200 rounded-lg bg-white">
          <div className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-green-600">
                Eventos Próximos
              </h3>
              <CalendarCheck className="h-4 w-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-800">
              {stats.proximosEventos}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Eventos en los próximos 7 días
            </p>
            <Link 
              href="/calendario" 
              className="text-green-600 hover:text-green-800 text-sm font-medium mt-2 inline-block"
            >
              Ver calendario
            </Link>
          </div>
        </div>
  
        {/* Tarjeta 3: Gastos del mes */}
        <div className="border border-amber-200 rounded-lg bg-white">
          <div className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-amber-600">
                Gastos del Mes
              </h3>
              <DollarSign className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-800">
              S/. {stats.gastosMes.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Total de gastos registrados
            </p>
            <Link 
              href="/contabilidad?tab=gastos" 
              className="text-amber-600 hover:text-amber-800 text-sm font-medium mt-2 inline-block"
            >
              Ver desglose
            </Link>
          </div>
        </div>
  
        {/* Tarjeta 4: Anotaciones recientes */}
        <div className="border border-red-200 rounded-lg bg-white">
          <div className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-red-600">
                Anotaciones Recientes
              </h3>
              <ClipboardList className="h-4 w-4 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-red-800">
              {stats.anotacionesRecientes}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Nuevas en los últimos 3 días
            </p>
            <Link 
              href="/alumnos?tab=control" 
              className="text-red-600 hover:text-red-800 text-sm font-medium mt-2 inline-block"
            >
              Revisar
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardStats;
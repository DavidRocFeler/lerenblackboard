'use client'
import { useState, useRef } from "react";
import { Calendar, Plus, Edit, Trash2 } from "lucide-react";
import Swal from 'sweetalert2';

const CalendarioEscolar = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: "Día del Maestro",
      fecha: "2024-07-06",
      descripcion: "Celebración especial para nuestros profesores",
      tipo: "celebración",
    },
    {
      id: 2,
      titulo: "Día de Olimpiadas",
      fecha: "2024-08-15",
      descripcion: "Deportes y actividades para todos los estudiantes",
      tipo: "deportes",
    },
    {
      id: 3,
      titulo: "Reunión de Padres",
      fecha: "2024-06-20",
      descripcion: "Reunión mensual del comité",
      tipo: "reunión",
    },
    {
      id: 4,
      titulo: "Feria Escolar",
      fecha: "2024-09-10",
      descripcion: "Evento anual de recaudación de fondos",
      tipo: "recaudación",
    },
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: "",
    fecha: "",
    descripcion: "",
    tipo: "celebración",
  });
  const fechaInputRef = useRef<HTMLInputElement>(null);

  // Manejador para mostrar el placeholder personalizado
  const handleFechaFocus = () => {
    if (!nuevoEvento.fecha && fechaInputRef.current) {
      fechaInputRef.current.type = "text";
      fechaInputRef.current.value = "00/00/0000";
    }
  };

  const handleFechaBlur = () => {
    if (fechaInputRef.current) {
      fechaInputRef.current.type = "date";
      if (!nuevoEvento.fecha) {
        fechaInputRef.current.value = "";
      }
    }
  };

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoEvento({...nuevoEvento, fecha: e.target.value});
  };

  const mostrarAlertaExito = () => {
    Swal.fire({
      title: '¡Éxito!',
      text: 'Evento creado correctamente',
      icon: 'success',
      confirmButtonColor: '#2563eb', // azul-600
      background: '#ffffff',
      iconColor: '#10b981', // verde-500
      confirmButtonText: 'Aceptar'
    });
  };

  const mostrarAlertaError = (mensaje: string) => {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error',
      confirmButtonColor: '#2563eb',
      background: '#ffffff',
      iconColor: '#ef4444', // rojo-500
      confirmButtonText: 'Entendido'
    });
  };

  const obtenerColorTipoEvento = (tipo: string) => {
    switch (tipo) {
      case "celebración":
        return "bg-yellow-100 text-yellow-800";
      case "deportes":
        return "bg-green-100 text-green-800";
      case "reunión":
        return "bg-blue-100 text-blue-800";
      case "recaudación":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const obtenerDiasDelMes = () => {
    const año = fechaSeleccionada.getFullYear();
    const mes = fechaSeleccionada.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaInicioSemana = primerDia.getDay();

    const dias = [];
    
    for (let i = 0; i < diaInicioSemana; i++) {
      dias.push(null);
    }
    
    for (let dia = 1; dia <= diasEnMes; dia++) {
      dias.push(dia);
    }
    
    return dias;
  };

  const tieneEvento = (dia: number) => {
    const fechaStr = `${fechaSeleccionada.getFullYear()}-${String(fechaSeleccionada.getMonth() + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    return eventos.some(evento => evento.fecha === fechaStr);
  };

  const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const handleAgregarEvento = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de campos
    if (!nuevoEvento.titulo) {
      mostrarAlertaError('Por favor ingrese un título para el evento');
      return;
    }
    
    if (!nuevoEvento.fecha || nuevoEvento.fecha === "??/??/??") {
      mostrarAlertaError('Por favor seleccione una fecha válida');
      return;
    }
    
    if (!nuevoEvento.descripcion) {
      mostrarAlertaError('Por favor ingrese una descripción para el evento');
      return;
    }

    const nuevoId = Date.now();
    const evento = {
      id: nuevoId,
      titulo: nuevoEvento.titulo,
      fecha: nuevoEvento.fecha,
      descripcion: nuevoEvento.descripcion,
      tipo: nuevoEvento.tipo
    };
    
    setEventos(prevEventos => [evento, ...prevEventos]);
    setNuevoEvento({
      titulo: "",
      fecha: "",
      descripcion: "",
      tipo: "celebración"
    });
    setMostrarModal(false);
    mostrarAlertaExito();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vista de Calendario */}
        <div className="lg:col-span-2 border-0 shadow-lg rounded-lg bg-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-blue-900">
                  <Calendar className="h-5 w-5" />
                  {nombresMeses[fechaSeleccionada.getMonth()]} {fechaSeleccionada.getFullYear()}
                </h2>
                <p className="text-sm sm:w-auto w-[10rem] text-gray-500">Eventos escolares y fechas importantes</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFechaSeleccionada(new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() - 1))}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
                >
                  ←
                </button>
                <button
                  onClick={() => setFechaSeleccionada(new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1))}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-50"
                >
                  →
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="grid grid-cols-7 gap-1">
                {diasSemana.map(dia => (
                  <div key={dia} className="p-2 text-center font-semibold text-gray-600 text-sm">
                    {dia}
                  </div>
                ))}
                {obtenerDiasDelMes().map((dia, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square p-1 text-center text-sm border rounded-lg cursor-pointer transition-colors
                      ${dia ? 'hover:bg-blue-50' : ''}
                      ${dia && tieneEvento(dia) ? 'bg-yellow-100 border-yellow-300' : 'border-gray-200'}
                    `}
                  >
                    {dia && (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className={tieneEvento(dia) ? 'font-bold text-blue-900' : 'text-gray-700'}>
                          {dia}
                        </span>
                        {tieneEvento(dia) && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Eventos */}
        <div className="border-0 shadow-lg h-fit rounded-lg bg-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-900">Próximos Eventos</h2>
              <button 
                onClick={() => setMostrarModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-cente cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-1" />
                Agregar
              </button>
            </div>
            
            <div className="mt-6 space-y-3">
              {[...eventos]
                .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                .slice(0, 6)
                .map((evento) => (
                  <div key={evento.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-blue-900">{evento.titulo}</h3>
                      <div className="flex gap-1">
                        <button className="p-1 rounded-md hover:bg-gray-100">
                          <Edit className="h-3 w-3" />
                        </button>
                        <button className="p-1 rounded-md hover:bg-gray-100">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{evento.descripcion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{evento.fecha}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${obtenerColorTipoEvento(evento.tipo)}`}>
                        {evento.tipo}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar eventos */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="mb-4">
              <h3 className="text-lg font-bold">Agregar Nuevo Evento</h3>
              <p className="text-sm text-gray-500">Crear un nuevo evento en el calendario</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">Título del Evento</label>
                <input 
                  id="titulo" 
                  type="text" 
                  placeholder="Ingrese el título del evento"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={nuevoEvento.titulo}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, titulo: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha *
                </label>
                <input
                  id="fecha"
                  ref={fechaInputRef}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onFocus={handleFechaFocus}
                  onBlur={handleFechaBlur}
                  onChange={handleFechaChange}
                  value={nuevoEvento.fecha}
                />
                {!nuevoEvento.fecha && (
                  <p className="text-xs text-gray-500 mt-1">Por favor selecciona una fecha</p>
                )}
              </div>
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea 
                  id="descripcion" 
                  placeholder="Descripción del evento"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={nuevoEvento.descripcion}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
                <select
                  id="tipo"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={nuevoEvento.tipo}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, tipo: e.target.value})}
                >
                  <option value="celebración">Celebración</option>
                  <option value="deportes">Deportes</option>
                  <option value="reunión">Reunión</option>
                  <option value="recaudación">Recaudación</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={handleAgregarEvento}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md cursor-pointer"
                >
                  Crear Evento
                </button>
                <button 
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioEscolar;


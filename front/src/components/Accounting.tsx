'use client'
import { useEffect } from 'react';
import { useState } from 'react';
import { 
  DollarSign, 
  ClipboardList, 
  FileText, 
  Download,
  X,
  Plus,
  User,
  BookCopy,
  Gift,
  ChevronDown
} from 'lucide-react';

const Accounting = () => {
  // Datos de ejemplo
  const payments = [
    { id: 1, student: 'Valentina A.', date: '07/2024', amount: 35, status: 'paid', type: 'Gastos' },
    { id: 2, student: 'Alessca', date: '07/2024', amount: 35, status: 'pending', type: 'Gastos' },
    { id: 3, student: 'Rafaella', date: '07/2024', amount: 35, status: 'paid', type: 'Gastos' },
    { id: 4, student: 'Denzel', date: '07/2024', amount: 35, status: 'pending', type: 'Gastos' },
    { id: 5, student: 'Austin', date: '07/2024', amount: 35, status: 'paid', type: 'Gastos' },
    { id: 6, student: 'Mateo', date: '07/2024', amount: 35, status: 'pending', type: 'Gastos' },
    { id: 7, student: 'Anthuan', date: '07/2024', amount: 35, status: 'paid', type: 'Gastos' },
    { id: 8, student: 'Dominic', date: '07/2024', amount: 35, status: 'pending', type: 'Gastos' },
    { id: 9, student: 'Alex', date: '07/2024', amount: 35, status: 'paid', type: 'Gastos' },
    { id: 10, student: 'Alessandro', date: '07/2024', amount: 35, status: 'pending', type: 'Gastos' },
  ];

  const [fixedExpenses, setFixedExpenses] = useState([
    { id: 1, concept: 'Copias', amount: 8, date: '', category: 'Materiales' },
    { id: 2, concept: 'Salario auxiliar', amount: 25, date: '', category: 'Personal' },
  ]);

  const [variableExpenses, setVariableExpenses] = useState([
    { id: 1, concept: 'Día del Padre', amount: 20, date: '12/06', category: 'Eventos' },
    { id: 2, concept: 'Materiales aniversario', amount: 10, date: '20/06', category: 'Eventos' },
  ]);

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pagos');
  const [expenseTab, setExpenseTab] = useState('fijos');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('');
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    concept: '',
    amount: '',
    date: '',
    category: ''
  });

  // Obtener fecha actual en formato MM/YYYY para Perú (UTC-5)
  const getCurrentMonthYearPeru = () => {
    const now = new Date();
    const peruOffset = -5 * 60 * 60 * 1000;
    const peruTime = new Date(now.getTime() + peruOffset);
    
    const month = (peruTime.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = peruTime.getUTCFullYear();
    return `${month}/${year}`;
  };

  // Actualizar fechas de gastos fijos al cargar y cada mes
  useEffect(() => {
    const currentDate = getCurrentMonthYearPeru();
    setFixedExpenses(prev => prev.map(expense => ({
      ...expense,
      date: currentDate
    })));

    // Configurar para actualizar al inicio de cada mes
    const updateDateAtMonthStart = () => {
      const now = new Date();
      const peruTime = new Date(now.getTime() - 5 * 60 * 60 * 1000);
      const nextMonth = new Date(peruTime.getFullYear(), peruTime.getMonth() + 1, 1);
      const timeUntilNextMonth = nextMonth.getTime() - peruTime.getTime();
      
      setTimeout(() => {
        const newDate = getCurrentMonthYearPeru();
        setFixedExpenses(prev => prev.map(expense => ({
          ...expense,
          date: newDate
        })));
        updateDateAtMonthStart(); // Volver a programar para el próximo mes
      }, timeUntilNextMonth);
    };

    updateDateAtMonthStart();
  }, []);

  // Manejar cambios en el formulario de nuevo gasto
  const handleNewExpenseChange = (e:any) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Agregar nuevo gasto variable
  const handleAddExpense = () => {
    if (!newExpense.concept || !newExpense.amount || !newExpense.date || !newExpense.category) {
      alert('Por favor complete todos los campos');
      return;
    }

    const newId = variableExpenses.length > 0 
      ? Math.max(...variableExpenses.map(e => e.id)) + 1 
      : 1;

    setVariableExpenses(prev => [
      ...prev,
      {
        id: newId,
        concept: newExpense.concept,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date,
        category: newExpense.category
      }
    ]);

    // Resetear formulario y cerrar modal
    setNewExpense({
      concept: '',
      amount: '',
      date: '',
      category: ''
    });
    setShowAddExpenseModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-start sm:justify-between p-6 border-b">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-blue-900">Contabilidad</h1>
        </div>
      </div>
  
      {/* Tabs */}
      <div className="p-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('pagos')}
            className={`cursor-pointer px-4 py-2 flex items-center ${activeTab === 'pagos' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Pagos
          </button>
          <button
            onClick={() => setActiveTab('gastos')}
            className={`cursor-pointer px-4 py-2 flex items-center ${activeTab === 'gastos' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            Gastos
          </button>
        </div>
  
        {/* Contenido de Pagos */}
        {activeTab === 'pagos' && (
          <div className="mt-6 space-y-6">
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg">
              {/* Dropdown personalizado para estado */}
              <div className="relative">
                <button
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="w-full flex justify-between items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
                >
                  {filterStatus === 'all' ? 'Todos' : filterStatus === 'paid' ? 'Pagados' : 'Pendientes'}
                  <ChevronDown className={`h-4 w-4 transform transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isStatusOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200">
                    <button
                      onClick={() => {
                        setFilterStatus('all');
                        setIsStatusOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === 'all' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => {
                        setFilterStatus('paid');
                        setIsStatusOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === 'paid' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Pagados
                    </button>
                    <button
                      onClick={() => {
                        setFilterStatus('pending');
                        setIsStatusOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === 'pending' ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Pendientes
                    </button>
                  </div>
                )}
              </div>

              {/* Selector de mes */}
              <div className="relative">
                <input 
                  type="month" 
                  placeholder="Filtrar por mes"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                />
              </div>

              {/* Botón Exportar */}
              <button 
                className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                Exportar
              </button>
            </div>
  
            {/* Lista de pagos */}
            <div className="border rounded-lg overflow-hidden responsive-gradual-width-accounting">
              <div className="w-full overflow-x-auto">
                <div className="min-w-max">
                  <div className="grid grid-cols-12 bg-gray-50 p-3 font-medium text-sm text-gray-600">
                    <div className="col-span-4">Alumno</div>
                    <div className="col-span-2">Fecha</div>
                    <div className="col-span-2">Monto</div>
                    <div className="col-span-2">Tipo</div>
                    <div className="col-span-2">Estado</div>
                  </div>
                  {payments.map((payment) => (
                    <div key={payment.id} className="grid grid-cols-12 p-3 border-t hover:bg-blue-50">
                      <div className="col-span-4 flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        {payment.student}
                      </div>
                      <div className="col-span-2">{payment.date}</div>
                      <div className="col-span-2">S/. {payment.amount}</div>
                      <div className="col-span-2">{payment.type}</div>
                      <div className="col-span-2">
                        <span className={`ml-5 sm:ml-5 px-2 py-1 rounded-full text-xs ${
                          payment.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.status === 'paid' ? 'Pagado' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
  
        {/* Contenido de Gastos */}
        {activeTab === 'gastos' && (
          <div className="mt-6 space-y-6">
            {/* Subtabs para Gastos Fijos/Variables */}
            <div className="flex border-b">
              <button
                onClick={() => setExpenseTab('fijos')}
                className={`cursor-pointer px-4 py-2 flex items-center ${expenseTab === 'fijos' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                <BookCopy className="h-4 w-4 mr-2" />
                Gastos Fijos
              </button>
              <button
                onClick={() => setExpenseTab('variables')}
                className={`cursor-pointer px-4 py-2 flex items-center ${expenseTab === 'variables' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                <Gift className="h-4 w-4 mr-2" />
                Gastos Variables
              </button>
            </div>
  
            {/* Gastos Fijos */}
            {expenseTab === 'fijos' && (
                <div className="border rounded-lg overflow-hidden responsive-gradual-width-accounting">
                  <div className="w-[100%] sm:w-full overflow-x-auto">
                    <div className="min-w-max">
                      <div className="grid grid-cols-10 bg-gray-50 p-3 font-medium text-sm text-gray-600">
                        <div className="col-span-4">Concepto</div>
                        <div className="col-span-2">Fecha</div>
                        <div className="col-span-2">Monto</div>
                        <div className="col-span-2">Categoría</div>
                      </div>
                      {fixedExpenses.map((expense) => (
                        <div key={expense.id} className="grid grid-cols-10 p-3 border-t hover:bg-blue-50">
                          <div className="col-span-4">{expense.concept}</div>
                          <div className="col-span-2">{expense.date}</div>
                          <div className="col-span-2">S/. {expense.amount}</div>
                          <div className="col-span-2">{expense.category}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            )}
  
            {/* Gastos Variables */}
            {expenseTab === 'variables' && (
              <div className="py-4">
                <div className="mb-4 flex justify-end">
                  <button 
                    onClick={() => setShowAddExpenseModal(true)}
                    className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar Gasto
                  </button>
                </div>
                <div className="border rounded-lg overflow-hidden responsive-gradual-width-accounting">
                  <div className="w-[100%] sm:w-full overflow-x-auto">
                    <div className="min-w-max">
                      <div className="grid grid-cols-10 bg-gray-50 p-3 font-medium text-sm text-gray-600">
                        <div className="col-span-4">Concepto</div>
                        <div className="col-span-2">Fecha</div>
                        <div className="col-span-2">Monto</div>
                        <div className="col-span-2">Categoría</div>
                      </div>
                      {variableExpenses.map((expense) => (
                        <div key={expense.id} className="grid grid-cols-10 p-3 border-t hover:bg-blue-50">
                          <div className="col-span-4 sm:w-auto w-[5rem]">{expense.concept}</div>
                          <div className="col-span-2">{expense.date}</div>
                          <div className="col-span-2">S/. {expense.amount}</div>
                          <div className="col-span-2">{expense.category}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
  
      {/* Modal para agregar gastos */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Agregar Gasto Variable</h2>
              <button 
                onClick={() => setShowAddExpenseModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                <input
                  type="text"
                  name="concept"
                  value={newExpense.concept}
                  onChange={handleNewExpenseChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Descripción del gasto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto (S/.)</label>
                <input
                  type="number"
                  name="amount"
                  value={newExpense.amount}
                  onChange={handleNewExpenseChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleNewExpenseChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  name="category"
                  value={newExpense.category}
                  onChange={handleNewExpenseChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="Eventos">Eventos</option>
                  <option value="Materiales">Materiales</option>
                  <option value="Personal">Personal</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddExpense}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Agregar Gasto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accounting
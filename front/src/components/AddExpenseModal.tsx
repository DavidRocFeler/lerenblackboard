// import { useState } from "react";
// import {X} from 'lucide-react'

// const AddExpenseModal = () => {
//     return(
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 w-full max-w-md">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Agregar Gasto Variable</h2>
//             <button 
//               onClick={() => setShowAddExpenseModal(false)}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
//               <input
//                 type="text"
//                 name="concept"
//                 value={newExpense.concept}
//                 onChange={handleNewExpenseChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//                 placeholder="Descripción del gasto"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Monto (S/.)</label>
//               <input
//                 type="number"
//                 name="amount"
//                 value={newExpense.amount}
//                 onChange={handleNewExpenseChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//                 placeholder="0.00"
//                 step="0.01"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={newExpense.date}
//                 onChange={handleNewExpenseChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
//               <select
//                 name="category"
//                 value={newExpense.category}
//                 onChange={handleNewExpenseChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               >
//                 <option value="">Seleccione una categoría</option>
//                 <option value="Eventos">Eventos</option>
//                 <option value="Materiales">Materiales</option>
//                 <option value="Personal">Personal</option>
//                 <option value="Otros">Otros</option>
//               </select>
//             </div>
            
//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 onClick={() => setShowAddExpenseModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
//               >
//                 Cancelar
//               </button>
//               <button
//                 onClick={handleAddExpense}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 Agregar Gasto
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
// };

// export default AddExpenseModal
'use client'
import { BookOpen } from "lucide-react";
import { useState } from "react";
import PaymentsHistory from "./PaymentsHistory";
import ReceiptsHistory from "./ReceiptsHistory";
import { students } from "@/helpers/studentData.helpers";

const AccountingSection = () => {
  const [view, setView] = useState<'main' | 'payments' | 'receipts'>('main');
  
  // Obtenemos el estudiante
  const student = students.find(s => s.id === 'student-1');

  if (!student) {
    return <div>Estudiante no encontrado</div>;
  }

  // Extraemos los datos contables del estudiante según tu estructura
  const payments = student.countableBook?.payments.data || [];
  const receipts = student.countableBook?.receipt.data || [];
  
  // Calculamos los totales
  const lastPayment = payments.length > 0 ? payments[0].amount : 0;
  const totalReceipts = receipts.length;
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="border border-green-200 rounded-lg bg-white p-6">
      {view === 'main' ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-green-800 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Libro Contable
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div 
                className="bg-green-50 p-3 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                onClick={() => setView('payments')}
              >
                <p className="text-xs text-green-600">Último Pago</p>
                <p className="font-bold text-green-800">S/. {lastPayment.toFixed(2)}</p>
              </div>
              
              <div 
                className="bg-green-50 p-3 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                onClick={() => setView('receipts')}
              >
                <p className="text-xs text-green-600">Recibos</p>
                <p className="font-bold text-green-800">{totalReceipts}</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-600">Total Pagado</p>
                <p className="font-bold text-green-800">S/. {totalPaid.toFixed(2)}</p>
              </div>
            </div>
            
            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto">
              Descargar reporte
            </button>
          </div>
        </>
      ) : view === 'payments' ? (
        <PaymentsHistory 
          student={student}
          onBack={() => setView('main')} 
        />
      ) : (
        <ReceiptsHistory 
          receipts={receipts}
          onBack={() => setView('main')} 
        />
      )}
    </div>
  );
};

export default AccountingSection;
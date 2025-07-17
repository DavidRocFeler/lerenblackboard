'use client'
import { ArrowLeft } from "lucide-react";
import { IStudent } from "@/interface/types";

interface PaymentsHistoryProps {
  student: IStudent;
  onBack: () => void;
}

const PaymentsHistory = ({ student, onBack }: PaymentsHistoryProps) => {
  // Accedemos correctamente a los pagos según tu estructura
  const payments = student.countableBook?.payments?.data || [];
  
  return (
    <div className="border border-green-200 rounded-lg bg-white p-6">
      <button 
        onClick={onBack}
        className="cursor-pointer flex items-center gap-1 mb-4 text-green-600 hover:text-green-800 text-sm"
      >
        <ArrowLeft size={16} /> Volver
      </button>
      
      <h3 className="text-lg font-bold text-green-800 mb-4">Historial de Pagos</h3>
      
      <div className="space-y-3">
        {payments.map((payment) => (
          <div key={payment.id} className="border-b border-green-100 pb-3 last:border-b-0">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{payment.description}</p>
                <p className="text-sm text-gray-500">{payment.date}</p>
              </div>
              <p className="font-bold text-green-700">S/. {payment.amount.toFixed(2)}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">Método: {payment.method}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsHistory;
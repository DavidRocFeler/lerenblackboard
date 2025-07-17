'use client'
import { Clock } from "lucide-react";
import { IPaymentsProps } from "@/interface/types";

const PaymentsSection: React.FC<IPaymentsProps> = ({data}) => {
  return (
    <div className="border border-amber-200 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-amber-800 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pagos Pendientes ({data.pendingPayments.length})
        </h3>
      </div>
      <div className="space-y-4">
        {data.pendingPayments.map((payment) => (
          <div key={payment.id} className="border-b border-amber-100 pb-3 last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{payment.description}</p>
                <p className={`text-sm ${
                  payment.status === 'overdue' ? 'text-red-600' : 'text-amber-600'
                }`}>
                  Vence: {payment.dueDate}
                </p>
              </div>
    
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm font-bold">S/. {payment.amount.toFixed(2)}</p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-xs transition-colors cursor-pointer">
                Pagar ahora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsSection;
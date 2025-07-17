'use client'
import { ArrowLeft } from "lucide-react";
import { IReceipt } from "@/interface/types";
import Image from "next/image";

interface ReceiptsHistoryProps {
  receipts: IReceipt[];
  onBack: () => void;
}

const ReceiptsHistory = ({ receipts, onBack }: ReceiptsHistoryProps) => {
  return (
    <div className="border border-green-200 rounded-lg bg-white p-6">
      <button 
        onClick={onBack}
        className="cursor-pointer flex items-center gap-1 mb-4 text-green-600 hover:text-green-800 text-sm"
      >
        <ArrowLeft size={16} /> Volver
      </button>
      
      <h3 className="text-lg font-bold text-green-800 mb-4">Historial de Recibos</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {receipts.map((receipt) => (
          <div key={receipt.id} className="border rounded-lg p-3">
            <div className="relative h-40 bg-gray-100 rounded-md overflow-hidden">
              <Image 
                src={receipt.imageUrl}
                alt={receipt.description}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">{receipt.description}</p>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">{receipt.date}</p>
                <p className="text-xs font-bold">S/. {receipt.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiptsHistory;
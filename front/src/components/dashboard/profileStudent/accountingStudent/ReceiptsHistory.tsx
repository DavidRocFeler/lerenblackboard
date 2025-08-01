'use client'
import { useState, useRef, ChangeEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { IReceipt } from "@/interface/student.types";
import Image from "next/image";
import { sampleReceipts } from "@/helpers/receipts.helper";
import { X } from 'lucide-react'

interface ReceiptsHistoryProps {
  onBack: () => void;
}

const ReceiptsHistory = ({ onBack }: ReceiptsHistoryProps) => {
  const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedReceiptImage, setSelectedReceiptImage] = useState<string | null>(null);
  const [newReceipt, setNewReceipt] = useState<Omit<IReceipt, 'id' | 'imageUrl'>>({
    date: '',
    amount: 0,
    description: ''
  });
  const [localReceipts, setLocalReceipts] = useState<IReceipt[]>(sampleReceipts);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddReceipt = () => {
    if (!selectedImage) return;
    
    const receiptWithId: IReceipt = {
      ...newReceipt,
      id: Date.now().toString(),
      imageUrl: selectedImage
    };
    
    setLocalReceipts([receiptWithId, ...localReceipts]);
    setNewReceipt({
      date: '',
      amount: 0,
      description: ''
    });
    setSelectedImage(null);
    setShowAddReceiptModal(false);
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedReceiptImage(imageUrl);
    setShowImageModal(true);
  };

  return (
    <div className="border border-green-200 rounded-lg bg-white p-6">
      <div className="flex flex-col sm:flex-row mb-4">
        <button 
          onClick={onBack}
          className="cursor-pointer flex items-center gap-1 text-green-600 hover:text-green-800 text-sm"
        >
          <ArrowLeft size={16} /> Volver
        </button>
        
        <button
          onClick={() => setShowAddReceiptModal(true)}
          className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm ml-0 mt-5 sm:ml-auto sm:mt-0"
        >
          Agregar Recibo
        </button>
      </div>
      
      <h3 className="text-lg font-bold text-green-800 mb-4">Historial de Recibos</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {localReceipts.map((receipt) => (
          <div key={receipt.id} className="border rounded-lg p-3">
            <div 
              className="relative h-40 bg-gray-100 rounded-md overflow-hidden cursor-pointer"
              onClick={() => openImageModal(receipt.imageUrl)}
            >
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

      {/* Modal para visualizar imagen */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowImageModal(false)}
        >
            <button
              className="cursor-pointer absolute top-3 right-3 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
              onClick={() => setShowImageModal(false)}
            >
              <X/>
            </button>
            <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
              <Image
                src={selectedReceiptImage || ''}
                alt="Recibo ampliado"
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
        </div>
      )}

      {/* Modal para agregar recibos */}
      {showAddReceiptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9888] py-4">
          <div className="bg-white relative rounded-lg p-6 sm:max-w-md w-[90%] my-auto max-h-[90vh] overflow-y-auto">
            <X className="absolute top-3 right-3 z-[9888] cursor-pointer"
            onClick={() => {
              setShowAddReceiptModal(false);
              setSelectedImage(null);
            }}
            />
            <div className="mb-4">
              <h3 className="text-lg font-bold">Agregar Nuevo Recibo</h3>
              <p className="text-sm text-gray-500">Registre los datos del recibo</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <input 
                  id="descripcion" 
                  type="text" 
                  placeholder="Ej: Pago de matrícula"
                  className={`w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 ${
                    newReceipt.description && 'border-green-500 focus:border-green-500 focus:ring-green-200'
                  }`}
                  value={newReceipt.description}
                  onChange={(e) => setNewReceipt({...newReceipt, description: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha *
                </label>
                <div className="relative">
                  <input
                    id="fecha"
                    type="date"
                    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 ${
                      newReceipt.date && 'border-green-500 focus:border-green-500 focus:ring-green-200'
                    }`}
                    value={newReceipt.date}
                    onChange={(e) => setNewReceipt({...newReceipt, date: e.target.value})}
                  />
                  {newReceipt.date && (
                    <div className="absolute right-10 top-2 text-sm text-gray-600 pointer-events-none">
                      {new Date(newReceipt.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </div>
                  )}
                  <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                </div>
                {!newReceipt.date && (
                  <p className="text-xs text-gray-500 mt-1">Por favor selecciona una nueva fecha antes de agregar un nuevo recibo</p>
                )}
              </div>
              
              <div>
                <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-1">Monto (S/.) *</label>
                <div className="relative">
                  <input 
                    id="monto" 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 ${
                      newReceipt.amount > 0 && 'border-green-500 focus:border-green-500 focus:ring-green-200'
                    }`}
                    value={newReceipt.amount || ''}
                    onChange={(e) => setNewReceipt({...newReceipt, amount: parseFloat(e.target.value) || 0})}
                  />
                  <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
                    S/.
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">Imagen del recibo *</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="imagen"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {selectedImage ? (
                    <>
                      <div className="relative w-full h-40 mb-2">
                        <Image
                          src={selectedImage}
                          alt="Vista previa del recibo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm text-green-600 hover:text-green-800"
                      >
                        Cambiar imagen
                      </button>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-12 h-12 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Seleccionar imagen
                      </button>
                      <p className="mt-2 text-xs text-gray-500">
                        PNG, JPG o JPEG (Máx. 5MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={handleAddReceipt}
                  disabled={!newReceipt.description || !newReceipt.date || !newReceipt.amount || !selectedImage}
                  className={`
                    flex-1 py-2 rounded-md transition-colors
                    ${!newReceipt.description || !newReceipt.date || !newReceipt.amount || !selectedImage
                      ? 'bg-green-200 text-green-500 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                    }
                  `}
                >
                  Agregar Recibo
                </button>
                <button 
                  onClick={() => {
                    setShowAddReceiptModal(false);
                    setSelectedImage(null);
                  }}
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

export default ReceiptsHistory;
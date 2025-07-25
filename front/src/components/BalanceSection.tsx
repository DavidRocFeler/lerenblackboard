import { useAuthStore } from "@/store/auth.store";
import { useStudentStore } from "@/store/student.store";

const BalanceSection = () => {
  const { studentDetails } = useStudentStore();
  const { user } = useAuthStore(); // Cambiado getState() por el hook directo

  return (
    <div className="border border-blue-200 rounded-lg bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-blue-800">Saldo a Favor</h3>
      </div>
      <div className="text-center py-8">
        <p className="text-4xl font-bold text-blue-600 mb-2">S/. {studentDetails?.balance}</p>
        <p className="text-gray-600">Este saldo puede ser usado para futuros pagos</p>
        {user?.role === 'admin' && (
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
            Modificar Saldo
          </button>
        )}
        {/* No necesitas mostrar nada para 'student' ya que no hay elemento a renderizar */}
      </div>
    </div>
  );
};

export default BalanceSection;
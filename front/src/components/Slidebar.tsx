'use client'
import { X, Home, Calendar, FileText, Users, User2, BookText } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar = ({ isOpen, onClose, activeItem, setActiveItem }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Inicio", icon: Home },
    { id: "calendar", label: "Calendario", icon: Calendar },
    { id: "accounting", label: "Contabilidad", icon: FileText },
    { id: "students", label: "Estudiantes", icon: Users },
    { id: "profile", label: "Perfil", icon: User2 },
    { id: "syllabus", label: "Cursos", icon: BookText },
  ];

  // Función para combinar clases manualmente
  const combineClasses = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <>
      {isOpen && (
        <div
          className="inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={
          combineClasses(
            "fixed left-0 w-64 bg-white h-screen z-[8999] shadow-xl border-r border-blue-100 transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )
        }
      >
        <div className="p-6 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">2G</span>
              </div>
              <div>
                <h2 className="font-semibold text-blue-900">Section G</h2>
                <p className="text-xs text-blue-600">2nd Grade</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id);
                      onClose();
                    }}
                    className={
                      combineClasses(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer",
                        activeItem === item.id
                          ? "bg-blue-100 text-blue-900 border border-blue-200"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-800"
                      )
                    }
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="items-center w-full bottom-[-1rem] p-4 border-t border-blue-100 absolute">
          <div className=" bg-blue-900 rounded-lg p-3 text-white mb-5 mx-auto">
            <h3 className="font-semibold text-sm">Sor Ana de los Angeles 2025</h3>
            <p className="text-xs opacity-90">25 Students Enrolled</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
'use client'
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Slidebar";
import SchoolCalendar from "@/components/SchoolCalender";
import DashboardStats from "@/components/DashboardStats";
import Students from "@/components/Students";
import AccountingModal from "@/components/Accounting";
import Profile from "@/components/Profile";
import SyllabusSection from "@/components/SyllabusSection";


const DashboardView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabComponents = {
    dashboard: <DashboardStats />,
    // payments: <PaymentModule />,
    calendar: <SchoolCalendar />,
    accounting: <AccountingModal/>,
    students: <Students/>,
    profile: <Profile/>,
    syllabus: <SyllabusSection/>
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-yellow-50 overflow-x-hidden">
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          activeItem={activeTab}
          setActiveItem={setActiveTab}
        />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="bg-white fixed w-full py-[0.61rem] shadow-sm border-b border-blue-100 z-[8888]">

            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <Menu className="h-5 w-5 cursor-pointer" />
                  </button>
                <div>
                    <h1 className="text-[1.1rem] font-bold text-black hidden sm:inline">
                      LEREN BLACKBOARD
                    </h1>
                    <h1 className="text-[1.1rem] font-bold text-black sm:hidden">
                      BLACKBOARD
                    </h1>
                    {/* <p className="text-sm text-blue-600">
                      2nd Grade - Section G Parent Committee
                    </p> */}
                  </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <img src="/SorAnaLogo.png" alt="" />
                  </div>
                </div>
              </div>
            </div>

          </header>

          <main className="flex-1 p-6 pt-[6rem]">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-6">
                <div className="pt-6">
                  {Object.entries(tabComponents).map(([key, component]) => (
                    <div key={key} style={{ display: activeTab === key ? 'block' : 'none' }}>
                      {component}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
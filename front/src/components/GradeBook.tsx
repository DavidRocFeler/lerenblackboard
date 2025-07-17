import React from 'react';
import { User, GraduationCap, School, Calendar, BookOpen, Award, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { IGradeBookStudent } from '@/interface/types';

interface GradeBookProps {
  data: IGradeBookStudent;
  onBackToProfile: () => void;
}

const GradeBook: React.FC<GradeBookProps> = ({ data }) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'AD': return 'text-green-700 bg-green-100';
      case 'A': return 'text-blue-700 bg-blue-100';
      case 'B': return 'text-yellow-700 bg-yellow-100';
      case 'C': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
      <div >
        {/* Header */}
        <div className="rounded-2xl shadow-2xl p-6 mb-8 border border-purple-100 bg-white">
          <div className="flex flex-col md:flex-row mb-6">
              <h1 className="text-[1.5rem] font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Libreta de Notas
              </h1>
              <p className="text-gray-600 mt-2 text-[1rem] md:ml-auto font-bold">AÑO ESCOLAR {data.studentInfo.schoolYear}</p>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <School className="text-purple-600 w-10"/>
                <span className="font-semibold text-purple-800">Institución Educativa:</span>
              </div>
              <p className="text-gray-700">{data.studentInfo.ie}</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <User className="text-blue-600 w-10"/>
                <span className="font-semibold text-blue-800">Estudiante:</span>
              </div>
              <p className="text-gray-700">{data.studentInfo.studentName}</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="text-green-600 w-10"/>
                <span className="font-semibold text-green-800">Docente:</span>
              </div>
              <p className="text-gray-700">{data.studentInfo.teacher}</p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="text-yellow-600 w-10" />
                <span className="font-semibold text-yellow-800">Nivel:</span>
              </div>
              <p className="text-gray-700">{data.studentInfo.level}</p>
            </div>
            
            <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-pink-600 w-10"/>
                <span className="font-semibold text-pink-800">Grado y Sección:</span>
              </div>
              <p className="text-gray-700">{data.studentInfo.gradeSection}</p>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-indigo-600" size={20} />
                <span className="font-semibold text-indigo-800">UGEL N°:</span>
              </div>
              <p className="text-gray-700">{data.studentInfo.ugelNumber}</p>
            </div>
          </div>
        </div>

        {/* Subjects and Grades */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 border border-purple-100">
          <h2 className="text-[1.2rem] font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Calificaciones por Período
          </h2>
          
          <div className="space-y-6">
            {data.subjects.map((subject, index) => (
              <div key={index} className="rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-[1rem] font-bold mb-4 text-gray-800 flex flex-col sm:flex-row">
                  <BookOpen className="text-purple-600 mb-3 mr-3" size={20} />
                  <span className='mb-3'>{subject.name}</span>
                  <span className={`w-fit sm:ml-auto px-4 py-1 rounded-full items-center flex justify-center text-sm font-semibold ${getGradeColor(subject.areaGrade || '')}`}>
                    {subject.areaGrade}
                  </span>
                </h3>

                <div className="overflow-x-auto bg-white responsive-gradual-width  rounded-xl">
                  <div className="text-sm">
                    {/* Header */}
                    <div className="flex text-white w-full">
                      <div className="p-3 text-left rounded-tl-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 min-w-[200px] ">
                        Competencia
                      </div>
                      <div className="p-3 text-center bg-indigo-600 min-w-[60px] flex-shrink-0">
                        I
                      </div>
                      <div className="p-3 text-center bg-indigo-600 min-w-[60px] flex-shrink-0">
                        II
                      </div>
                      <div className="p-3 text-center bg-indigo-600 min-w-[60px] flex-shrink-0">
                        III
                      </div>
                      <div className="p-3 text-center bg-indigo-600 min-w-[60px] flex-shrink-0">
                        IV
                      </div>
                      <div className="p-3 text-center bg-indigo-600 min-w-[60px] flex-shrink-0">
                        Final
                      </div>
                      <div className="p-3 text-left rounded-tr-lg bg-gradient-to-l to-indigo-600 from-purple-600 flex-1 min-w-[250px]">
                        Conclusiones Descriptivas
                      </div>
                    </div>

                    {/* Body */}
                    <div>
                      {subject.competences.map((competence, compIndex) => (
                        <div 
                          key={compIndex} 
                          className={`flex ${compIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          <div className="p-3 font-medium text-gray-700 flex-1 min-w-[200px] break-words">
                            {competence.description}
                          </div>
                          <div className="p-3 text-center min-w-[60px] flex-shrink-0">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(competence.period1 || '')}`}>
                              {competence.period1}
                            </span>
                          </div>
                          <div className="p-3 text-center min-w-[60px] flex-shrink-0">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(competence.period2 || '')}`}>
                              {competence.period2}
                            </span>
                          </div>
                          <div className="p-3 text-center min-w-[60px] flex-shrink-0">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(competence.period3 || '')}`}>
                              {competence.period3}
                            </span>
                          </div>
                          <div className="p-3 text-center min-w-[60px] flex-shrink-0">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(competence.period4 || '')}`}>
                              {competence.period4}
                            </span>
                          </div>
                          <div className="p-3 text-center min-w-[60px] flex-shrink-0">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(competence.finalGrade || '')}`}>
                              {competence.finalGrade}
                            </span>
                          </div>
                          <div className="p-3 text-gray-600 text-xs flex-1 min-w-[250px] break-words">
                            {competence.descriptiveConclusions}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Grade Legend */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 border border-purple-100">
          <h2 className="text-[1.2rem] font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Escala de Calificación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { grade: 'AD', description: 'Logro destacado', color: 'from-green-500 to-emerald-500' },
              { grade: 'A', description: 'Logro esperado', color: 'from-blue-500 to-cyan-500' },
              { grade: 'B', description: 'En proceso', color: 'from-yellow-500 to-orange-500' },
              { grade: 'C', description: 'En inicio', color: 'from-red-500 to-pink-500' }
            ].map((item, index) => (
              <div key={index} className={`bg-gradient-to-r ${item.color} rounded-xl p-4 text-white shadow-lg`}>
                <div className="text-2xl font-bold mb-1">{item.grade}</div>
                <div className="text-sm">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance and Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attendance */}
          <div className="rounded-2xl shadow-2xl p-6 border border-purple-100">
            <h2 className="text-[1.2rem] font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex flex-col sm:flex-row">
              <Clock className="text-purple-600 mb-3 mr-3" />
              Asistencia a las Clases
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className=" text-white">
                    <th className="p-3 text-left rounded-tl-lg bg-gradient-to-r from-purple-600 to-indigo-600">Aspectos</th>
                    <th className="p-3 text-center bg-indigo-600">I</th>
                    <th className="p-3 text-center bg-indigo-600">II</th>
                    <th className="p-3 text-center bg-indigo-600">III</th>
                    <th className="p-3 text-center rounded-tr-lg bg-gradient-to-l  to-indigo-600 from-purple-600">IV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-3 font-medium text-gray-700">Asistió</td>
                    <td className="p-3 text-center text-green-600 font-semibold">{data.attendance.attended.period1}</td>
                    <td className="p-3 text-center text-green-600 font-semibold">{data.attendance.attended.period2}</td>
                    <td className="p-3 text-center text-green-600 font-semibold">{data.attendance.attended.period3}</td>
                    <td className="p-3 text-center text-green-600 font-semibold">{data.attendance.attended.period4}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">No Asistió</td>
                    <td className="p-3 text-center text-red-600 font-semibold">{data.attendance.notAttended.period1}</td>
                    <td className="p-3 text-center text-red-600 font-semibold">{data.attendance.notAttended.period2}</td>
                    <td className="p-3 text-center text-red-600 font-semibold">{data.attendance.notAttended.period3}</td>
                    <td className="p-3 text-center text-red-600 font-semibold">{data.attendance.notAttended.period4}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {data.attendance.observations && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Observaciones:</strong> {data.attendance.observations}
                </p>
              </div>
            )}
          </div>

          {/* Parent Evaluation */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-purple-100">
            <h2 className="text-[1.2rem] font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex flex-col sm:flex-row">
              <Users className="text-purple-600 mb-3 mr-3"/>
              Evaluación del Padre o Madre de Familia
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className=" text-white">
                    <th className="p-3 text-left rounded-tl-lg bg-gradient-to-r from-purple-600 to-indigo-600">Criterios de Evaluación</th>
                    <th className="p-3 text-center bg-indigo-600">I</th>
                    <th className="p-3 text-center bg-indigo-600">II</th>
                    <th className="p-3 text-center bg-gradient-to-l to-indigo-600 from-purple-600 ">III</th>
                    <th className="p-3 text-center rounded-tr-lg bg-purple-600">IV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-3 font-medium text-gray-700">Ayuda a su hijo(a) con sus tareas</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.helpsWithHomework.period1 || '')}`}>
                        {data.parentEvaluation.helpsWithHomework.period1}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.helpsWithHomework.period2 || '')}`}>
                        {data.parentEvaluation.helpsWithHomework.period2}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.helpsWithHomework.period3 || '')}`}>
                        {data.parentEvaluation.helpsWithHomework.period3}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.helpsWithHomework.period4 || '')}`}>
                        {data.parentEvaluation.helpsWithHomework.period4}
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 font-medium text-gray-700">Está pendiente de su hijo(a) en sus necesidades emocionales y físicas</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.attentiveToNeeds.period1 || '')}`}>
                        {data.parentEvaluation.attentiveToNeeds.period1}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.attentiveToNeeds.period2 || '')}`}>
                        {data.parentEvaluation.attentiveToNeeds.period2}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.attentiveToNeeds.period3 || '')}`}>
                        {data.parentEvaluation.attentiveToNeeds.period3}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.attentiveToNeeds.period4 || '')}`}>
                        {data.parentEvaluation.attentiveToNeeds.period4}
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-medium text-gray-700">Asiste a las reuniones programadas por el docente</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.attendsMeetings.period1 || '')}`}>
                        {data.parentEvaluation.attendsMeetings.period1}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.attendsMeetings.period2 || '')}`}>
                        {data.parentEvaluation.attendsMeetings.period2}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.attendsMeetings.period3 || '')}`}>
                        {data.parentEvaluation.attendsMeetings.period3}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(data.parentEvaluation.attendsMeetings.period4 || '')}`}>
                        {data.parentEvaluation.attendsMeetings.period4}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {data.parentEvaluation.observations && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Observaciones:</strong> {data.parentEvaluation.observations}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Final Situation */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-purple-100">
          <h2 className="text-[1.2rem] font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Situación Final del Estudiante
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-xl p-6 shadow-lg border-2 ${data.finalSituation.promoted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className={`w-9 ${data.finalSituation.promoted ? 'text-green-600' : 'text-gray-400'}`} />
                <h3 className="text-[1rem] font-semibold text-gray-800">Se Promueve de Grado</h3>
              </div>
              <div className="text-center">
                <span className={`text-[1.5rem] font-bold ${data.finalSituation.promoted ? 'text-green-600' : 'text-gray-400'}`}>
                  {data.finalSituation.promoted ? 'SÍ' : 'NO'}
                </span>
              </div>
            </div>
            
            <div className={`rounded-xl p-6 shadow-lg border-2 ${data.finalSituation.repeatsGrade ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-3">
                <XCircle className={`w-9 ${data.finalSituation.repeatsGrade ? 'text-red-600' : 'text-gray-400'}`} />
                <h3 className="text-[1rem] font-semibold text-gray-800">Repite de Grado</h3>
              </div>
              <div className="text-center">
                <span className={`text-[1.5rem] font-bold ${data.finalSituation.repeatsGrade ? 'text-red-600' : 'text-gray-400'}`}>
                  {data.finalSituation.repeatsGrade ? 'SÍ' : 'NO'}
                </span>
              </div>
            </div>
            
            <div className={`rounded-xl p-6 shadow-lg border-2 ${data.finalSituation.requiresRecovery ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-3">
                <Clock className={`w-10 ${data.finalSituation.requiresRecovery ? 'text-yellow-600' : 'text-gray-400'}`}/>
                <h3 className="text-[1rem] font-semibold text-gray-800">Requiere Recuperación</h3>
              </div>
              <div className="text-center">
                <span className={`text-[1.5rem] font-bold ${data.finalSituation.requiresRecovery ? 'text-yellow-600' : 'text-gray-400'}`}>
                  {data.finalSituation.requiresRecovery ? 'SÍ' : 'NO'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-6 pt-10">
          <p className="text-gray-600 text-sm">
            Libreta de Notas - Sistema de Evaluación Educativa
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Desarrollado por GRODEVAI TECHNOLOGY - {data.studentInfo.schoolYear}
          </p>
        </div>
      </div>
  );
};

export default GradeBook;
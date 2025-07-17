export interface ISubject {
    id: string;
    name: string;
    category: 'classic' | 'innovative';
    description: string;
    progress: number;
    content: {
      title: string;
      items: string[];
    }[];
  }
  
export interface ISyllabusProps {
    data: {
      syllabusProgress: number;
    };
  }

  export interface ISyllabusProps {
    data: {
      syllabusProgress: number;
    };
  }
  
// interface/types.ts
export interface ISubSubject {
  id: string;
  name: string;
  description: string;
  content: {
    title: string;
    items: string[];
  }[];
  classes: ISubjectClass[];
  progress: number;
}

export interface ISubjectClass {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number; // en minutos
  activity?: string; // actividad práctica
}


//Payments from profile
export interface IPayment {
  id: string;
  description: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  paymentType: 'matricula' | 'mensualidad' | 'materiales' | 'actividad';
}

export interface IPaymentsProps {
  data: {
    pendingPayments: IPayment[];
  };
}

//Student Array Extend
export interface IPaymentHistory {
  id: string;
  date: string;
  amount: number;
  method: string;
  description: string;
  receiptImage?: string;
}

export interface IReceipt {
  id: string;
  date: string;
  amount: number;
  imageUrl: string;
  description: string;
}

export interface BalanceProps {
  balance: number;
}

//Students Array 
export interface IStudent {
  id: string;
  name: string;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  level?: string;
  section?: string;
  status?: 'active' | 'inactive' | 'pending';
  birthdate?: string;
  studentCode?: string;
  picture?: string;
  balance?: string;
  pendingPayments?: {
    data: IPayment[]
  }
  // controlStudent?: {

  // }
  countableBook?: {
    payments: {
      data: IPaymentHistory[],
    } 
    receipt: {
      data: IReceipt[]; 
    }
  }
  gradeBook?: IGradeBookStudent;
}

// interfaces/IGradeBookStudent.ts

export interface IGradeBookStudent {
  studentInfo: {
    ie: string;
    studentName: string;
    teacher: string;
    level: string;
    gradeSection: string;
    ugelNumber: string;
    schoolYear: string;
  };
  subjects: IGradeBookSubject[];
  attendance: IAttendance;
  parentEvaluation: IParentEvaluation;
  finalSituation: IFinalSituation;
}

export interface IGradeBookSubject {
  name: string;
  competences: ICompetence[];
  areaGrade?: string;
}

export interface ICompetence {
  description: string;
  period1?: string;
  period2?: string;
  period3?: string;
  period4?: string;
  finalGrade?: string;
  descriptiveConclusions?: string;
}

export interface IAttendance {
  attended: {
    period1?: number;
    period2?: number;
    period3?: number;
    period4?: number;
  };
  notAttended: {
    period1?: number;
    period2?: number;
    period3?: number;
    period4?: number;
  };
  observations?: string;
}

export interface IParentEvaluation {
  helpsWithHomework: {
    period1?: string;
    period2?: string;
    period3?: string;
    period4?: string;
  };
  attentiveToNeeds: {
    period1?: string;
    period2?: string;
    period3?: string;
    period4?: string;
  };
  attendsMeetings: {
    period1?: string;
    period2?: string;
    period3?: string;
    period4?: string;
  };
  observations?: string;
}

export interface IFinalSituation {
  promoted: boolean;
  repeatsGrade: boolean;
  requiresRecovery: boolean;
}
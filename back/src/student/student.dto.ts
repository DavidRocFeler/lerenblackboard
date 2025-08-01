export interface ICreateStudentDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    governmentId: string;
    fatherName: string;
    motherName: string;
    parentPhone: string;
    parentEmail: string;
    level: string;
    section: string;
    isActive: boolean;
    birthdate: string;
    studentCode: string;
    picture: string;
    balance: number;
    school: {
      id: number;
    };
  }

  export interface IUpdateStudentDto extends Partial<ICreateStudentDto> {}
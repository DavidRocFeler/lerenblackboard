export interface ICreateSuperAdminDto {
    firstName: string;
    lastName: string;
    governmentId: string;
    email: string;
    phone: string;
    hireDate: Date;
    contractType: string;
    emergencyContact: string;
    password: string;
  }

  export interface IUpdateSuperAdmin extends Partial<ICreateSuperAdminDto> {}
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SuperAdminEntity } from "../superAdmin/SuperAdmin.entity";

@Entity({ name: "credentials" })
export class CredentialEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })  // la contraseña es obligatoria
    password: string;

    // ¿Tiene esta relación inversa?
    @OneToOne(() => SuperAdminEntity, superAdmin => superAdmin.credential)
    superAdmin?: SuperAdminEntity;
}

import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";

enum Role {
    ADMIN = "admin",
    USER = "user"
}

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })  // ✅ Ahora `name` es opcional
    name?: string;

    @Column({ unique: true, nullable: false })  // ✅ `email` sigue siendo obligatorio
    email: string;

    @Column({ nullable: true })  // ✅ `address` ahora permite `NULL`
    address?: string;

    @Column({ nullable: true })  // ✅ `phone` ahora permite `NULL`
    phone?: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;
    
    @OneToOne(() => Credential, { cascade: true, eager: true })
    @JoinColumn()
    credential: Credential;
}


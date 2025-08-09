
// ClaudinaryEntity - Cambios necesarios
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { SchoolEntity } from "../school/School.entity";

@Entity({ name: "claudinary_pictures" })
export class ClaudinaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  originalName: string;

  @Column({ nullable: false })
  filename: string;

  @Column({ nullable: false })
  cloudinaryUrl: string;

  @Column({ nullable: false })
  cloudinaryPublicId: string;

  @Column({ nullable: false })
  mimeType: string;

  @Column({ nullable: false })
  size: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: ["profile", "document", "gallery", "other", "logo", "background"],
    default: "other"
  })
  category: "profile" | "document" | "gallery" | "other" | "logo" | "background";

  @Column({
    type: "enum",
    enum: ["user", "school"],
    nullable: false
  })
  entityType: "user" | "school";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relación con User (para pictures de usuario)
  @ManyToOne(() => UserEntity, (user) => user.pictures, {
    nullable: true,
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @Column({ nullable: true })
  userId?: number;

  // ELIMINA estas relaciones ManyToOne con School
  // Ya que ahora School tendrá OneToOne con ClaudinaryEntity
}
// src/claudinary/Claudinary.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
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
    enum: ["profile", "document", "gallery", "other"],
    default: "other"
  })
  category: "profile" | "document" | "gallery" | "other";

  @Column({ 
    type: "enum", 
    enum: ["user", "school"] 
  })
  entityType: "user" | "school";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones opcionales
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @Column({ nullable: true })
  userId?: number;

  @ManyToOne(() => SchoolEntity, { nullable: true })
  @JoinColumn({ name: "schoolId" })
  school?: SchoolEntity;

  @Column({ nullable: true })
  schoolId?: number;
}
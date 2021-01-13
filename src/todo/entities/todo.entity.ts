import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  shortDesc: string;

  @Column({ nullable: true })
  longDesc?: string;

  @Column({ type: 'boolean', default: false })
  isDone: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

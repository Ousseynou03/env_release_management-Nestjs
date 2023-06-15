import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Planning } from './Planning';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable : true })
  title: string;

  @Column({ nullable : true })
  description: string;

  @Column({ nullable : true })
  status: string;

  @Column({ nullable : true })
  createdAt: Date;

  @ManyToOne(() => Planning, (planning) => planning.tasks)
  planning: Planning;
}

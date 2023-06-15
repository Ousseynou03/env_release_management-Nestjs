import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task';

@Entity({ name: 'plannings' })
export class Planning {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable : true })
  planning_name: string;

  @Column({ nullable : true })
  start_date: Date;

  @Column({ nullable : true })
  end_date: Date;

  @Column({ nullable : true })
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.planning)
  tasks: Task[];
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activities' })
export class Activity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column( { nullable : true })
  description: string;

  @Column({ nullable : true })
  start_date: Date;

  @Column({ nullable : true })
  end_date: Date;

  @Column({ nullable : true })
  createdAt: Date;
}

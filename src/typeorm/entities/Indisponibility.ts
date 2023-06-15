import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'indisponibilities' })
export class Indisponibility {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ nullable : true })
    environment: string;

    @Column({ nullable : true })
    type_indisponibilte: string;

    @Column({ nullable : true })
    jira: string;

    @Column({ nullable : true })
    impact_env: string;

    @Column({ nullable : true })
    delai_correctif: string;

    @Column({ nullable : true })
    createdAt: Date;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ nullable : true })
    prenom: string

    @Column({ nullable : true })
    nom: string

    @Column({ nullable : true })
    tel: string

    @Column()
    email: string

    @Column()
    active: boolean

    @Column()
    password: string

    @Column({ nullable : true })
    createdAt: Date;
}

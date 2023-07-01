import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'indisponibilities' })
export class Indisponibility {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ nullable : true })
    environment: string;

    @Column({ nullable : true })
    liste_app: string;

    @Column({ nullable : true })
    impact_env: string;

    @Column({ nullable : true })
    niveau_test: string;

    @Column({ nullable : true })
    momment: string;

    @Column({ nullable : true })
    cause: string;

    @Column({ nullable : true })
    createdAt: Date;

    @Column({ nullable : true })
    commentaires: string;

    @Column({ nullable : true })
    dureeTotale: number;


    @Column({ nullable : true })
    dureeEffective: number;
    
    
    @Column({ nullable : true })
    nbRessources: number;
    
    
    @Column({ nullable : true })
    cumuleGH: number;


    
}

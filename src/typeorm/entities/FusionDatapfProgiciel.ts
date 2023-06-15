import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'fusiondatapfprogiciels' })
export class FusionDatapfProgiciel {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ nullable : true })
    class_id: string;

    @Column({ nullable : true })
    progiciel: string

    @Column({ nullable : true })
    environment: string

    @Column({ nullable : true })
    server_vm: string

    @Column({ nullable : true })
    informations: string

    @Column({ nullable : true })
    version_os: string

    @Column({ nullable : true })
    vcpu: string

    @Column({ nullable : true })
    ram: string

    @Column({ nullable : true })
    vdisque: string

    @Column({ nullable : true })
    capacity: string

    @Column({ nullable : true })
    socle: string

    @Column({ nullable : true })
    tag: string

    @Column({ nullable : true })
    url: string

    @Column({ nullable : true })
    server_web_lan: string

    @Column({ nullable : true })
    jenkins_folders_url: string

    @Column({ nullable : true })
    jira_url: string

    @Column({ nullable : true })
    sr_component: string

    @Column({ nullable : true })
    vip_server: string

    @Column({ nullable : true })
    vip_db: string

    @Column({ nullable : true })
    server_web_dmz: string

    @Column({ nullable : true })
    server_db: string

    @Column({ nullable : true })
    lien_applications: string

    @Column({ nullable : true })
    version_db: string

    @Column({ nullable : true })
    version_apache: string

    @Column({ nullable : true })
    language: string

    @Column({ nullable : true })
    language_framework: string

    @Column({ nullable : true })
    framework_2: string

    @Column({ nullable : true })
    createdAt: Date;
}

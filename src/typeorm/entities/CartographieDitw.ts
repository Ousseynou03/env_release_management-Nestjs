import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cartographieditws' })
export class CartographieDitw {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    class_id: string;

    @Column({ nullable : true })
    server_group: string

    @Column({ nullable : true })
    application: string

    @Column({ nullable : true })
    environment: string

    @Column({ nullable : true })
    socle: string

    @Column({ nullable : true })
    tag: string

    @Column({ nullable : true })
    internal_port: string

    @Column({ nullable : true })
    url: string

    @Column({ nullable : true })
    path_version: string

    @Column({ nullable : true })
    maven_id: string

    @Column({ nullable : true })
    jenkins_folders: string

    @Column({ nullable : true })
    jira_url: string

    @Column({ nullable : true })
    sr_component: string

    @Column({ nullable : true })
    vip_server: string

    @Column({ nullable : true })
    vip_db: string

    @Column({ nullable : true })
    server_web_lan: string

    @Column({ nullable : true })
    server_web_dmz: string

    @Column({ nullable : true })
    server_db: string

    @Column({ nullable : true })
    lien_applications: string

    @Column({ nullable : true })
    version_db: string

    @Column({ nullable : true })
    version_os: string

    @Column({ nullable : true })
    version_apache: string

    @Column({ nullable : true })
    server_applicatif: string

    @Column({ nullable : true })
    language: string

    @Column({ nullable : true })
    framework: string

    @Column({ nullable : true })
    framework_2: string

    @Column({ nullable : true })
    eol_stack: string

    @Column({ nullable : true })
    eol_db: string

    @Column({ nullable : true })
    eol_apache: string

    @Column({ nullable : true })
    eol_server_applicatif: string

    @Column({ nullable : true })
    eol_framework: string

    @Column({ nullable : true })
    eol_framework_2: string

    @Column({ nullable : true })
    cible_db: string

    @Column({ nullable : true })
    cible_os_server: string

    @Column({ nullable : true })
    cible_apache: string

    @Column({ nullable : true })
    cible_server_applicatif: string

    @Column({ nullable : true })
    cible_language: string

    @Column({ nullable : true })
    cible_framework: string

    @Column({ nullable : true })
    cible_framework_2: string

    @Column({ nullable : true })
    eol_cible_db: string

    @Column({ nullable : true })
    eol_cible_os_server: string

    @Column({ nullable : true })
    eol_cible_apache: string

    @Column({ nullable : true })
    eol_cible_server_applicatif: string

    @Column({ nullable : true })
    eol_cible_language: string

    @Column({ nullable : true })
    eol_cible_framework: string

    @Column({ nullable : true })
    eol_cible_framework_2: string

    @Column({ nullable : true })
    vcpu: string

    @Column({ nullable : true })
    ram: string

    @Column({ nullable : true })
    disque: string

    @Column({ nullable : true })
    db_vcpu: string

    @Column({ nullable : true })
    db_ram: string

    @Column({ nullable : true })
    db_disque: string

    @Column({ nullable : true })
    createdAt: Date;
}

import {EnvEnum} from './env-enum';

export type TYPES = FusionDatapfProgiciels | VersionDocument | PerimetreDescription | CartographieDitw

export class FusionDatapfProgiciels {

    id: string
    class_id: string;
    added_by: string
    date_creation: string
    progiciel: string
    environment: EnvEnum
    server_vm: string
    informations: string
    version_os: string
    vcpu: string
    ram: string
    vdisque: string
    capacity: string
    socle: string
    tag: string
    url: string
    server_web_lan: string
    jenkins_folders_url: string
    jira_url: string
    sr_component: string
    vip_server: string
    vip_db: string
    server_web_dmz: string
    server_db: string
    lien_applications: string
    version_db: string
    version_apache: string
    language: string
    language_framework: string
    framework_2: string

    constructor(class_id: string) {
        this.class_id = class_id;
        this.date_creation = new Date().toString()
        this.progiciel = '';
        this.environment = EnvEnum.dev;
        this.server_vm = '';
        this.informations = '';
        this.version_os = '';
        this.vcpu = '';
        this.ram = '';
        this.vdisque = '';
        this.capacity = '';
        this.socle = '';
        this.tag = '';
        this.url = '';
        this.server_web_lan = '';
        this.jenkins_folders_url = '';
        this.jira_url = '';
        this.sr_component = '';
        this.vip_server = '';
        this.vip_db = '';
        this.server_web_dmz = '';
        this.server_db = '';
        this.lien_applications = '';
        this.version_db = '';
        this.version_apache = '';
        this.language = '';
        this.language_framework = '';
        this.framework_2 = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return ['environment'].includes(property)
    }

    get_enum(property) {
        switch (property) {
            case 'environment':
                return EnvEnum;
        }
    }

    get_filter_property() {
        return ['environment', 'server_vm']
    }
}

export class CartographieDitw {

    id: string
    class_id: string;
    added_by: string
    date_creation: string
    server_group: string
    application: string
    environment: EnvEnum
    socle: string
    tag: string
    internal_port: string
    url: string
    path_version: string
    maven_id: string
    jenkins_folders: string
    jira_url: string
    sr_component: string
    vip_server: string
    vip_db: string
    server_web_lan: string
    server_web_dmz: string
    server_db: string
    lien_applications: string
    version_db: string
    version_os: string
    version_apache: string
    server_applicatif: string
    language: string
    framework: string
    framework_2: string
    eol_stack: string
    eol_db: string
    eol_apache: string
    eol_server_applicatif: string
    eol_framework: string
    eol_framework_2: string
    cible_db: string
    cible_os_server: string
    cible_apache: string
    cible_server_applicatif: string
    cible_language: string
    cible_framework: string
    cible_framework_2: string
    eol_cible_db: string
    eol_cible_os_server: string
    eol_cible_apache: string
    eol_cible_server_applicatif: string
    eol_cible_language: string
    eol_cible_framework: string
    eol_cible_framework_2: string
    vcpu: string
    ram: string
    disque: string
    db_vcpu: string
    db_ram: string
    db_disque: string

    constructor(class_id: string) {
        this.class_id = class_id;
        this.date_creation = new Date().toString()
        this.server_group = '';
        this.application = '';
        this.environment = EnvEnum.dev;
        this.socle = '';
        this.tag = '';
        this.internal_port = '';
        this.url = '';
        this.path_version = '';
        this.maven_id = '';
        this.jenkins_folders = '';
        this.jira_url = '';
        this.sr_component = '';
        this.vip_server = '';
        this.vip_db = '';
        this.server_web_lan = '';
        this.server_web_dmz = '';
        this.server_db = '';
        this.lien_applications = '';
        this.version_db = '';
        this.version_os = '';
        this.version_apache = '';
        this.server_applicatif = '';
        this.language = '';
        this.framework = '';
        this.framework_2 = '';
        this.eol_stack = ''
        this.eol_db = ''
        this.eol_apache = '';
        this.eol_server_applicatif = '';
        this.eol_framework = '';
        this.eol_framework_2 = '';
        this.cible_db = '';
        this.cible_os_server = '';
        this.cible_apache = '';
        this.cible_server_applicatif = '';
        this.cible_language = '';
        this.cible_framework = '';
        this.cible_framework_2 = '';
        this.eol_cible_db = '';
        this.eol_cible_os_server = '';
        this.eol_cible_apache = '';
        this.eol_cible_server_applicatif = '';
        this.eol_cible_language = '';
        this.eol_cible_framework = '';
        this.eol_cible_framework_2 = '';
        this.vcpu = '';
        this.ram = '';
        this.disque = '';
        this.db_vcpu = '';
        this.db_ram = '';
        this.db_disque = '';


    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return ['environment'].includes(property)
    }

    get_enum(property) {
        switch (property) {
            case 'environment':
                return EnvEnum;
        }
    }

    get_filter_property() {
        return ['environment', 'server_group']
    }
}


export class InformationServers {

    id: string
    class_id: string;
    added_by: string
    date_creation: string
    progiciel: string
    environment: EnvEnum
    server_vm: string
    informations: string
    version_os: string
    vcpu: string
    ram: string
    vdisque: string
    capacity: string
    tag: string
    url: string
    server_web_lan: string
    jenkins_folders_url: string
    jira_url: string
    sr_component: string
    vip_server: string
    vip_db: string
    server_web_dmz: string
    server_db: string
    lien_applications: string
    version_db: string
    version_apache: string
    language: string
    language_framework: string
    framework_2: string

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
        this.progiciel = '';
        this.environment = EnvEnum.dev;
        this.server_vm = '';
        this.informations = '';
        this.version_os = '';
        this.vcpu = '';
        this.ram = '';
        this.vdisque = '';
        this.capacity = '';
        this.tag = '';
        this.url = '';
        this.server_web_lan = '';
        this.jenkins_folders_url = '';
        this.jira_url = '';
        this.sr_component = '';
        this.vip_server = '';
        this.vip_db = '';
        this.server_web_dmz = '';
        this.server_db = '';
        this.lien_applications = '';
        this.version_db = '';
        this.version_apache = '';
        this.language = '';
        this.language_framework = '';
        this.framework_2 = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return ['environment'].includes(property)
    }

    get_enum(property) {
        switch (property) {
            case 'environment':
                return EnvEnum;
        }
    }

    get_filter_property() {
        return ['environment', 'server_vm']
    }
}

export class DataPfConfiguration {

    id: string
    class_id: string;
    added_by: string
    date_creation: string
    progiciel: string
    environment: EnvEnum
    server_vm: string
    informations: string
    version_os: string
    vcpu: string
    ram: string
    vdisque: string
    capacity: string
    tag: string
    url: string
    server_web_lan: string
    jenkins_folders_url: string
    jira_url: string
    sr_component: string
    vip_server: string
    vip_db: string
    server_web_dmz: string
    server_db: string
    lien_applications: string
    version_db: string
    version_apache: string
    language: string
    language_framework: string
    framework_2: string

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
        this.progiciel = '';
        this.environment = EnvEnum.dev;
        this.server_vm = '';
        this.informations = '';
        this.version_os = '';
        this.vcpu = '';
        this.ram = '';
        this.vdisque = '';
        this.capacity = '';
        this.tag = '';
        this.url = '';
        this.server_web_lan = '';
        this.jenkins_folders_url = '';
        this.jira_url = '';
        this.sr_component = '';
        this.vip_server = '';
        this.vip_db = '';
        this.server_web_dmz = '';
        this.server_db = '';
        this.lien_applications = '';
        this.version_db = '';
        this.version_apache = '';
        this.language = '';
        this.language_framework = '';
        this.framework_2 = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return ['environment'].includes(property)
    }

    get_enum(property) {
        switch (property) {
            case 'environment':
                return EnvEnum;
        }
    }

    get_filter_property() {
        return ['environment', 'server_vm']
    }
}

export class ProgicielConfiguration {

    id: string
    class_id: string;
    added_by: string
    date_creation: string
    progiciel: string
    environment: EnvEnum
    server_vm: string
    informations: string
    version_os: string
    vcpu: string
    ram: string
    vdisque: string
    capacity: string
    tag: string
    url: string
    server_web_lan: string
    jenkins_folders_url: string
    jira_url: string
    sr_component: string
    vip_server: string
    vip_db: string
    server_web_dmz: string
    server_db: string
    lien_applications: string
    version_db: string
    version_apache: string
    language: string
    language_framework: string
    framework_2: string

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
        this.progiciel = '';
        this.environment = EnvEnum.dev;
        this.server_vm = '';
        this.informations = '';
        this.version_os = '';
        this.vcpu = '';
        this.ram = '';
        this.vdisque = '';
        this.capacity = '';
        this.tag = '';
        this.url = '';
        this.server_web_lan = '';
        this.jenkins_folders_url = '';
        this.jira_url = '';
        this.sr_component = '';
        this.vip_server = '';
        this.vip_db = '';
        this.server_web_dmz = '';
        this.server_db = '';
        this.lien_applications = '';
        this.version_db = '';
        this.version_apache = '';
        this.language = '';
        this.language_framework = '';
        this.framework_2 = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return ['environment'].includes(property)
    }

    get_enum(property) {
        switch (property) {
            case 'environment':
                return EnvEnum;
        }
    }

    get_filter_property() {
        return ['environment', 'server_vm']
    }
}

export class AppsDITW {

    id: string
    class_id: string;
    added_by: string
    date_creation: string
    progiciel: string
    environment: EnvEnum
    server_vm: string
    informations: string
    version_os: string
    vcpu: string
    ram: string
    vdisque: string
    capacity: string
    tag: string
    url: string
    server_web_lan: string
    jenkins_folders_url: string
    jira_url: string
    sr_component: string
    vip_server: string
    vip_db: string
    server_web_dmz: string
    server_db: string
    lien_applications: string
    version_db: string
    version_apache: string
    language: string
    language_framework: string
    framework_2: string

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
        this.progiciel = '';
        this.environment = EnvEnum.dev;
        this.server_vm = '';
        this.informations = '';
        this.version_os = '';
        this.vcpu = '';
        this.ram = '';
        this.vdisque = '';
        this.capacity = '';
        this.tag = '';
        this.url = '';
        this.server_web_lan = '';
        this.jenkins_folders_url = '';
        this.jira_url = '';
        this.sr_component = '';
        this.vip_server = '';
        this.vip_db = '';
        this.server_web_dmz = '';
        this.server_db = '';
        this.lien_applications = '';
        this.version_db = '';
        this.version_apache = '';
        this.language = '';
        this.language_framework = '';
        this.framework_2 = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return ['environment'].includes(property)
    }

    get_enum(property) {
        switch (property) {
            case 'environment':
                return EnvEnum;
        }
    }

    get_filter_property() {
        return ['environment', 'server_vm']
    }
}

export class AppsAFU {

    id: string
    class_id: string;
    added_by: string
    date_creation: string
    progiciel: string
    environment: EnvEnum
    server_vm: string
    informations: string
    version_os: string
    vcpu: string
    ram: string
    vdisque: string
    capacity: string
    tag: string
    url: string
    server_web_lan: string
    jenkins_folders_url: string
    jira_url: string
    sr_component: string
    vip_server: string
    vip_db: string
    server_web_dmz: string
    server_db: string
    lien_applications: string
    version_db: string
    version_apache: string
    language: string
    language_framework: string
    framework_2: string

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
        this.progiciel = '';
        this.environment = EnvEnum.dev;
        this.server_vm = '';
        this.informations = '';
        this.version_os = '';
        this.vcpu = '';
        this.ram = '';
        this.vdisque = '';
        this.capacity = '';
        this.tag = '';
        this.url = '';
        this.server_web_lan = '';
        this.jenkins_folders_url = '';
        this.jira_url = '';
        this.sr_component = '';
        this.vip_server = '';
        this.vip_db = '';
        this.server_web_dmz = '';
        this.server_db = '';
        this.lien_applications = '';
        this.version_db = '';
        this.version_apache = '';
        this.language = '';
        this.language_framework = '';
        this.framework_2 = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return ['environment'].includes(property)
    }

    get_enum(property) {
        switch (property) {
            case 'environment':
                return EnvEnum;
        }
    }

    get_filter_property() {
        return ['environment', 'server_vm']
    }
}

export class VersionDocument {

    id: string
    class_id: string;
    version: string
    objet: string
    date: Date = new Date();
    document_reference: string

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
        this.version = '';
        this.objet = '';
        this.document_reference = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return [].includes(property)
    }

    get_filter_property() {
        return ['version']
    }
}

export class PerimetreDescription {

    id: string
    class_id: string;
    environment: string
    application: string
    progiciel: string
    description_synthetique: string
    couverture_fonctionnelle: string
    exploitant: string
    hebergement: string

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
        this.environment = '';
        this.application = '';
        this.progiciel = '';
        this.description_synthetique = '';
        this.couverture_fonctionnelle = '';
        this.exploitant = '';
        this.hebergement = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return [].includes(property)
    }

    get_filter_property() {
        return ['environment']
    }
}

export class Tcd {
    id: string
    class_id: string;
    environment: string
    progiciel: string
    nombre_info_serveur: string

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
        this.environment = '';
        this.progiciel = '';
        this.nombre_info_serveur = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return [].includes(property)
    }

    get_filter_property() {
        return ['environment']
    }

}

export class TcdDataPf {
    id: string
    class_id: string;
    environment: string
    progiciel: string
    nombre_info_serveur: string

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
        this.environment = '';
        this.progiciel = '';
        this.nombre_info_serveur = '';
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return [].includes(property)
    }

    get_filter_property() {
        return ['environment']
    }

}

export class Definition {
    id: string
    class_id: string;

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return [].includes(property)
    }

    get_filter_property() {
        return ['environment']
    }

}

export class VersionApplicatif {

    id: string
    class_id: string;

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return [].includes(property)
    }

    get_filter_property() {
        return ['version']
    }
}

export class Indisponibilite {

    id: string
    class_id: string;

    constructor(class_id: string) {
        this.id = Math.random().toString(36).substring(2);
        this.class_id = class_id;
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return [].includes(property)
    }

    get_filter_property() {
        return ['version']
    }
}

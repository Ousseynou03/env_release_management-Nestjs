import {EnvEnum} from './env-enum';

export class Indisponibilite {

    id: string
    environment: EnvEnum
    type_indisponibilte: string
    jira: string
    impact_env: string
    delai_correctif: string

    constructor() {
        this.environment = EnvEnum.dev;
        this.type_indisponibilte = '';
        this.jira = '';
        this.impact_env = '';
        this.delai_correctif = '';
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
        return ['environment']
    }
}

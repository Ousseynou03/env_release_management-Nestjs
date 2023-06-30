import {Cause, EnvEnum, Impact, ListApp, Momment, NivTest, } from './env-enum';

export class Indisponibilite {

    id: string
    environment: EnvEnum
    liste_app: ListApp
    niveau_test: NivTest
    impact_env: Impact
    momment : Momment
    commentaires : string
    cause : Cause

    constructor() {
        this.environment = EnvEnum.prod;
        this.liste_app = ListApp.one_customer;
        this.niveau_test = NivTest.integration;
        this.impact_env = Impact.charge;
        this.momment = Momment.installation_init;
        this.cause = Cause.attente_liv_correctiuon;
        this.commentaires = '';
      
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
        return ['environment'];

    }
}

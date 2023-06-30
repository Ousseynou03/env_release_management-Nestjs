import {Cause, EnvEnum, Impact, ListApp, Momment, NivTest, } from './env-enum';

export class Indisponibilite {

    id: string
    environment: EnvEnum
    liste_app: ListApp
    niveau_test: NivTest
    impact_env: Impact
    momment : Momment
    createdAt : Date
    commentaires : string
    cause : Cause

    constructor() {
        this.environment = EnvEnum.prod;
        this.liste_app = ListApp.one_customer;
        this.niveau_test = NivTest.integration;
        this.impact_env = Impact.charge_embauche;
        this.momment = Momment.installation_init;
        this.cause = Cause.attente_liv_correctiuon;
        this.commentaires = '';
        this.createdAt = new Date();
      
    }

    is_date(property) {
        return property instanceof Object
    }

    is_enum(property) {
        return ['environment', 'liste_app', 'niveau_test','impact_env','momment','cause'].includes(property)
    }

    get_enum(property) {
        switch (property) {
            case 'environment':
                return EnvEnum;
            
            case 'liste_app':
                return ListApp;
            case 'niveau_test':
                return NivTest;

            case 'impact_env':
                return Impact;
            case 'momment':
                return Momment;
            case 'cause':
                return Cause;
        }
    }

    get_filter_property() {
        return ['environment','liste_app', 'niveau_test','impact_env','momment','cause'];

    }
}

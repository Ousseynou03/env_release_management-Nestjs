export enum EnvEnum {
    prod = 'PROD',
    recette = 'RECETTE',
    qualif = 'QUALIF',
    dev = 'DEV'
}

export enum ListApp {
    site_public = 'SITE PUBLIC',
    one_customer = 'ONECUSTUMER',
    salesforce = 'SALESFORCE',
    picris = 'PICRIS'
}


export enum NivTest {
    integration = 'INTEGRATION',
    qualification = 'QUALIFICATION',
    recette = 'RECETTE',
}

export enum Momment {
    installation_init = 'Installation initiale',
    vie_courante = 'Vie courante'
}

export enum Cause {
    manq_habilit = 'Manque d\'habilitation',
    mauvaise_version = 'Mauvaise version applicative chargée',
    manque_jdd_charge = 'Manque de jeu de données chargé',
    mauvais_parametrage = 'Mauvais paramétrage effectué',
    mauvaise_installation = 'Mauvaise Installation des composants',				
	capacite_disque = 'Capacité disque insuffisante',				
	serveur_indispo = 'Serveur indisponible',				
	mauvaise_performance_serveur = 'Mauvaise performance du serveur',				
	mauvaise_performance_appli = 'Mauvaise performance de l\'application',				
	incident_technique = 'Incident technique',				
	attente_liv_correctiuon = 'Attente d\'une livraison corrective',				
	conflit_projet = 'Conflit avec un autre projet sur le même environnement'				
}

export enum Impact {
    qualite = 'Qualité: réduction du périmètre de tests',
    delai = 'Délai: décalage de la fin de la recette',
    charge_embauche = 'Charge: embauche de nouvelles ressources',	
    charge_weekEnd = 'Charge: travail le week-end',	
    charge_etude = 'Charge: étude d\'une nouvelle organisation des tests',	
    pas_impact = 'Pas d\'impact', 

}

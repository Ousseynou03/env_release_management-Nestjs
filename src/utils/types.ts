export type CreatePlanningParams = {
  planning_name: string;
  start_date: Date;
  end_date: Date;
};

export type UpdatePlanningParams = {
  planning_name: string;
  start_date: Date;
  end_date: Date;
};

export type CreateTaskParams = {
  title: string;
  description: string;
  planning_id: string;
  status: string;
};

export type UpdateTaskParams = {
  title: string;
  description: string;
  planning_id: string;
  status: string;
};

export type CreateActivityParams = {
  description: string;
  start_date: Date;
  end_date: Date;
};

export type UpdateActivityParams = {
  description: string;
  start_date: Date;
  end_date: Date;
};

export type CreateIndisponibilityParams = {
  environment: string
  type_indisponibilte: string
  jira: string
  impact_env: string
  delai_correctif: string
};

export type UpdateIndisponibilityParams = {
  environment: string
  type_indisponibilte: string
  jira: string
  impact_env: string
  delai_correctif: string
};

export type CreateCartographieDitwParams = {
  class_id: string;
  server_group: string
  application: string
  environment: string
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
}

export type UpdateCartographieDitwParams = {
  class_id: string;
  server_group: string
  application: string
  environment: string
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
}

export type CreateFusionDatapfProgicielParams = {

  class_id: string;
  progiciel: string
  environment: string
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
}

export type UpdateFusionDatapfProgicielParams = {

  class_id: string;
  progiciel: string
  environment: string
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
}

export type CreateUserParams = {
  nom: string
  prenom: string
  tel: string
  email: string
  active: boolean
  password: string
}


import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../models/user';
import firebase from 'firebase';
import {Router} from '@angular/router';
import Datasnapshot = firebase.database.DataSnapshot;
import {TYPES} from '../models/environment-classes';
import {Planning} from '../models/planning-model';
import { Task } from 'app/models/task';
import {Indisponibilite} from '../models/indisponibilite-model';
import {Activity} from '../models/activity-model';

@Injectable()
export class SessionService {
    user: User;
    users: User[] = [];
    usersSubject = new Subject<User[]>();
    itemsLengthSubject = new Subject<number>();
    environments: TYPES[] = [];
    environmentSubject = new Subject<TYPES[]>();
    plannings: Planning[] = [];
    planningSubject = new Subject<Planning[]>();
    activities: Activity[] = [];
    activitySubject = new Subject<Activity[]>();
    tasks: Task[] = [];
    taskSubject = new Subject<Task[]>();
    indisponibilites: Indisponibilite[] = [];
    indisponibiliteSubject = new Subject<Indisponibilite[]>();
    current_user

    constructor(private router: Router) {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.current_user = user;
                }
            }
        );
        this.getAllUsers();
        this.getEnvironments();
        this.getPlannings();
        this.getTasks();
        this.getInds();
        this.getActivities();
    }

    setCurrentLength(length: number) {
        this.itemsLengthSubject.next(length);
    }


    emitUsers() {
        this.usersSubject.next(this.users);
    }

    emitEnvironments() {
        this.environmentSubject.next(this.environments);
    }

    emitPlannings() {
        this.planningSubject.next(this.plannings);
    }

    emitTasks() {
        this.taskSubject.next(this.tasks);
    }

    emitIndisponibilites() {
        this.indisponibiliteSubject.next(this.indisponibilites);
    }

    emitActivities() {
        this.activitySubject.next(this.activities);
    }

    // create or update environment
    createOrUpdateEnvironment(environment: TYPES) {
        this.environments.push(environment)
        return new Promise(
            (resolve, reject) => {
                this.emitEnvironments();
                this.saveEnvironments().then(() => {
                        // Sign-out successful.
                        //resolve();
                    },
                    (error) => {
                        reject(error);
                    });
            });


    }

    // create or update planning
    createOrUpdatePlanning(planning: Planning) {
        this.plannings.push(planning)
        return new Promise(
            (resolve, reject) => {
                this.emitPlannings();
                this.savePlannings().then(() => {
                        // Sign-out successful.
                        //resolve();
                    },
                    (error) => {
                        reject(error);
                    });
            });
    }

    // create or update task
    createOrUpdateTask(task: Task) {
        const taskToUpdate = this.tasks.findIndex(
            (taskEl) => {
                if (taskEl.id === task.id) {
                    return true;
                }
            }
        );
        if (taskToUpdate >= 0) {
            this.tasks[taskToUpdate] = task;
        } else {
            this.tasks.push(task)
        }
        return new Promise(
            (resolve, reject) => {
                this.emitTasks();
                this.saveTasks().then(() => {
                        // Sign-out successful.
                        //resolve();
                    },
                    (error) => {
                        reject(error);
                    });
            });
    }

    // create or update indisponibilite
    createOrUpdateIndisponibilite(ind: Indisponibilite) {
        const indToUpdate = this.indisponibilites.findIndex(
            (indEl) => {
                if (indEl.id === ind.id) {
                    return true;
                }
            }
        );
        if (indToUpdate >= 0) {
            this.indisponibilites[indToUpdate] = ind;
        } else {
            this.indisponibilites.push(ind)
        }
        return new Promise(
            (resolve, reject) => {
                this.emitIndisponibilites();
                this.saveInds().then(() => {
                        // Sign-out successful.
                       // resolve();
                    },
                    (error) => {
                        reject(error);
                    });
            });
    }

    // create or update activity
    createOrUpdateActivity(activity: Activity) {
        const activityToUpdate = this.activities.findIndex(
            (activityEl) => {
                if (activityEl.id === activity.id) {
                    return true;
                }
            }
        );
        if (activityToUpdate >= 0) {
            this.activities[activityToUpdate] = activity;
        } else {
            this.activities.push(activity)
        }
        return new Promise(
            (resolve, reject) => {
                this.emitActivities();
                this.saveActivities().then(() => {
                        // Sign-out successful.
                       // resolve();
                    },
                    (error) => {
                        reject(error);
                    });
            });
    }

    // save user
    saveUsers() {
        firebase.database().ref('/users').set(this.users).then();
    }

    // save environment
    saveEnvironments() {
        return firebase.database().ref('/environments').set(this.environments).then();
    }

    // save planing
    savePlannings() {
        return firebase.database().ref('/plannings').set(this.plannings).then();
    }

    // save tasks
    saveTasks() {
        return firebase.database().ref('/tasks').set(this.tasks).then();
    }

    // save ind
    saveInds() {
        return firebase.database().ref('/indisponibilites').set(this.indisponibilites).then();
    }

    // save activities
    saveActivities() {
        return firebase.database().ref('/activities').set(this.activities).then();
    }

    // remove a planing
    removePLannings(id) {
        const planningIndexToRemove = this.plannings.findIndex(
            (elt) => {
                if (elt.id === id) {
                    return true;
                }
            }
        );
        this.plannings.splice(planningIndexToRemove, 1);
        this.savePlannings().then();
        this.emitPlannings();
    }

    // remove a task
    removeTask(id) {
        const taskIndexToRemove = this.tasks.findIndex(
            (elt) => {
                if (elt.id === id) {
                    return true;
                }
            }
        );
        this.tasks.splice(taskIndexToRemove, 1);
        this.saveTasks().then();
        this.emitTasks();
    }

    // remove a ind
    removeInd(id) {
        const indIndexToRemove = this.indisponibilites.findIndex(
            (elt) => {
                if (elt.id === id) {
                    return true;
                }
            }
        );
        this.indisponibilites.splice(indIndexToRemove, 1);
        this.saveInds().then();
        this.emitIndisponibilites();
    }

    // remove a activity
    removeActivity(id) {
        const activityIndexToRemove = this.activities.findIndex(
            (elt) => {
                if (elt.id === id) {
                    return true;
                }
            }
        );
        this.activities.splice(activityIndexToRemove, 1);
        this.saveActivities().then();
        this.emitActivities();
    }


    // get list of users
    getAllUsers() {
        firebase.database().ref('/users').on('value', (data: Datasnapshot) => {
            this.users = data.val() ? data.val() : [];
            this.emitUsers();
        });
    }

    // get list of environments
    getEnvironments() {
        firebase.database().ref('/environments').on('value', (data: Datasnapshot) => {
            this.environments = data.val() ? data.val() : [];
            this.emitEnvironments();
        });
    }

    // get list of plannings
    getPlannings() {
        firebase.database().ref('/plannings').on('value', (data: Datasnapshot) => {
            this.plannings = data.val() ? data.val() : [];
            this.emitPlannings();
        });
    }

    // get list of tasks
    getTasks() {
        firebase.database().ref('/tasks').on('value', (data: Datasnapshot) => {
            this.tasks = data.val() ? data.val() : [];
            this.emitTasks();
        });
    }

    // get list of ind
    getInds() {
        firebase.database().ref('/indisponibilites').on('value', (data: Datasnapshot) => {
            this.indisponibilites = data.val() ? data.val() : [];
            this.emitIndisponibilites();
        });
    }

    // get list of activities
    getActivities() {
        firebase.database().ref('/activities').on('value', (data: Datasnapshot) => {
            this.activities = data.val() ? data.val() : [];
            this.emitActivities();
        });
    }

    // update a user
    updateUser(user: User) {
        const userIndexToUpdate = this.users.findIndex(
            (userEl) => {
                if (userEl.email === user.email) {
                    return true;
                }
            }
        );
        this.users[userIndexToUpdate] = user;
        this.saveUsers();
        this.emitUsers();
    }

    // get a single user
    getSingleUser(email) {
        const userIndexToFind = this.users.findIndex(
            (userEl) => {
                if (userEl.email === email) {
                    return true;
                }
            }
        );

        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/users/' + userIndexToFind).once('value').then(
                    (data: Datasnapshot) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    // create a new user
    createNewUser(formValue) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password).then(
                    () => {
                        const credentials = formValue
                        delete formValue.password;
                        delete formValue.password_confirm;
                        formValue.active = true;
                        this.user = formValue;
                        this.users.push(this.user);
                        this.saveUsers();
                        this.signInUser(credentials).then(
                            () => {
                                this.router.navigate(['home']).then();
                            }
                        )
                       // resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signInUser(formValue) {
        return new Promise(
            (resolve, reject) => {
                console.log(formValue)
                firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password).then(
                    () => {
                        this.getAllUsers();
                        if (this.users.length !== 0) {
                            this.getSingleUser(formValue.email).then(
                                (user: User) => {
                                    if (user.active) {
                                        localStorage.setItem('profile', JSON.stringify(user.profile));
                                        localStorage.setItem('status', JSON.stringify(user.active));
                                        localStorage.setItem('first-name', JSON.stringify(user.prenom));
                                        localStorage.setItem('last-name', JSON.stringify(user.nom));
                                        localStorage.setItem('email', JSON.stringify(user.email));
                                       // resolve();
                                    } else {
                                        this.signOutUser().then();
                                        const err = {
                                            code: 'userNotActived'
                                        };
                                        reject(err);
                                    }
                                }
                            );
                        }
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signOutUser() {
        localStorage.clear();
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signOut().then(() => {
                      //  resolve();
                    },
                    (error) => {
                        reject(error);
                    });
            });
    }

    updatePassword(data) {
        const cpUser = firebase.auth().currentUser;
        const credentials = firebase.auth.EmailAuthProvider.credential(
            cpUser.email, data.old_password);

        return new Promise(
            (resolve, reject) => {
                cpUser.reauthenticateWithCredential(credentials).then(
                    () => {
                        cpUser.updatePassword(data.new_password).then(() => {
                          //  resolve();
                        }).catch((error) => {
                            reject(error);
                        });
                    }, (error) => {
                        reject(error);
                    });
            });

    }

    getRole() {
        return (JSON.parse(localStorage.getItem('profile')));
    }

    getEmail() {
        return (JSON.parse(localStorage.getItem('email')));
    }

    fullName() {
        return (JSON.parse(localStorage.getItem('first-name'))) + ' ' + (JSON.parse(localStorage.getItem('last-name')));
    }


    getUserByEmail() {

        const indexToFind = this.users.findIndex(
            (userEl) => {
                if (userEl.email === this.current_user.email) {
                    return true;
                }
            }
        );
        return this.users[indexToFind]

    }


    getUserById(id) {
        return this.users.find(item => {
           if (item.id === id) {
               return true
           }
        })
    }


}


/* ===================================
AI Director Database Layer
V10.0B-R1
IndexedDB
=================================== */

const DB_NAME = "AIDirectorDB";

const DB_VERSION = 1;

const PROJECT_STORE = "projects";

let db = null;

/* ===================================
Init DB
=================================== */

async function initDB(){

    return new Promise(
        (resolve,reject)=>{

        const request =
        indexedDB.open(
            DB_NAME,
            DB_VERSION
        );

        request.onupgradeneeded =
        (event)=>{

            db =
            event.target.result;

            if(
                !db.objectStoreNames.contains(
                    PROJECT_STORE
                )
            ){

                db.createObjectStore(
                    PROJECT_STORE,
                    {
                        keyPath:"id"
                    }
                );

            }

        };

        request.onsuccess =
        (event)=>{

            db =
            event.target.result;

            console.log(
                "DB Ready"
            );

            resolve();

        };

        request.onerror =
        (event)=>{

            console.error(
                "DB Error",
                event
            );

            reject();

        };

    });

}

/* ===================================
Create Project Schema
=================================== */

function createProjectSchema(){

    return {

        id:
        crypto.randomUUID(),

        name:"新專案",

        folder:"短片",

        tags:[],

        cover:"",

        createdAt:
        new Date()
        .toISOString(),

        updatedAt:
        new Date()
        .toISOString(),

        script:"",

        scenes:[],

        shots:[],

        storyboards:[],

        settings:{}

    };

}

/* ===================================
Get All Projects
=================================== */

async function getProjects(){

    return new Promise(
        (resolve,reject)=>{

        const tx =
        db.transaction(
            PROJECT_STORE,
            "readonly"
        );

        const request =
        tx.objectStore(
            PROJECT_STORE
        ).getAll();

        request.onsuccess =
        ()=>{

            resolve(
                request.result
            );

        };

        request.onerror =
        ()=>{

            reject();

        };

    });

}

/* ===================================
Save Project
=================================== */

async function saveProject(
    project
){

    project.updatedAt =
    new Date()
    .toISOString();

    return new Promise(
        (resolve,reject)=>{

        const tx =
        db.transaction(
            PROJECT_STORE,
            "readwrite"
        );

        const request =
        tx.objectStore(
            PROJECT_STORE
        ).put(
            project
        );

        request.onsuccess =
        ()=>{

            resolve();

        };

        request.onerror =
        ()=>{

            reject();

        };

    });

}

/* ===================================
Delete Project
=================================== */

async function deleteProject(
    projectId
){

    return new Promise(
        (resolve,reject)=>{

        const tx =
        db.transaction(
            PROJECT_STORE,
            "readwrite"
        );

        const request =
        tx.objectStore(
            PROJECT_STORE
        ).delete(
            projectId
        );

        request.onsuccess =
        ()=>{

            resolve();

        };

        request.onerror =
        ()=>{

            reject();

        };

    });

}

/* ===================================
Get Project By ID
=================================== */

async function getProjectById(
    projectId
){

    return new Promise(
        (resolve,reject)=>{

        const tx =
        db.transaction(
            PROJECT_STORE,
            "readonly"
        );

        const request =
        tx.objectStore(
            PROJECT_STORE
        ).get(
            projectId
        );

        request.onsuccess =
        ()=>{

            resolve(
                request.result
            );

        };

        request.onerror =
        ()=>{

            reject();

        };

    });

}

/* ===================================
Auto Save
=================================== */

async function autoSaveCurrentProject(){

    if(
        !AppState.currentProject
    ){
        return;
    }

    await saveProject(
        AppState.currentProject
    );

}

/* ===================================
Debug
=================================== */

async function debugProjects(){

    const projects =
    await getProjects();

    console.table(
        projects
    );

}

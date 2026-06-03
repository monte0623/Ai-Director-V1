/* ===================================
AI Director App Entry
V10.0B-R1
=================================== */

/* ===================================
Render App
=================================== */

function renderApp(){

    const app =
    document.getElementById(
        "app"
    );

    if(
        AppState.currentView ===
        "projects"
    ){

        app.innerHTML =
        renderProjectPage();

        renderProjectCards(
            AppState.projects
        );

        return;

    }

    if(
        AppState.currentView ===
        "workspace"
    ){

        app.innerHTML =
        renderWorkspacePage();

        return;

    }

}

/* ===================================
Initial Load
=================================== */

async function initializeApp(){

    try{

        console.log(
            "AI Director Starting..."
        );

        await initDB();

        await loadProjectsToState();

        renderApp();

        console.log(
            "AI Director Ready"
        );

    }
    catch(error){

        console.error(
            error
        );

        alert(
            "初始化失敗"
        );

    }

}

/* ===================================
Create Demo Project
=================================== */

async function createDemoProject(){

    const demo =
    createProjectSchema();

    demo.name =
    "Demo Project";

    demo.folder =
    "短片";

    demo.script =
    "這是一個測試劇本";

    demo.scenes = [

        {

            sceneId:"S001",

            sceneName:"客廳日景",

            location:"客廳",

            time:"早上",

            actors:"主角",

            audio:"同步收音",

            camera:"單機",

            lighting:"自然光",

            props:"沙發",

            costumes:"便服",

            notes:"",

            status:"未準備"

        }

    ];

    demo.shots = [

        {

            shotId:"S001-001",

            sceneId:"S001",

            description:"主角坐在沙發",

            shotType:"中景",

            movement:"固定",

            lens:"50mm",

            camera:"單機",

            lighting:"自然光",

            audio:"同步收音",

            actors:"主角",

            props:"沙發",

            costumes:"便服",

            duration:"5",

            notes:"",

            priority:"中",

            status:"待拍攝",

            orientation:"橫式",

            ratio:"16:9"

        }

    ];

    await saveProject(
        demo
    );

    await loadProjectsToState();

    renderApp();

}

/* ===================================
Reset Database
=================================== */

async function resetDatabase(){

    const result =
    confirm(
        "刪除所有專案？"
    );

    if(!result) return;

    indexedDB.deleteDatabase(
        DB_NAME
    );

    location.reload();

}

/* ===================================
Debug Helpers
=================================== */

window.debugProjects =
debugProjects;

window.createDemoProject =
createDemoProject;

window.resetDatabase =
resetDatabase;

/* ===================================
Start
=================================== */

window.addEventListener(

    "load",

    async ()=>{

        await initializeApp();

    }

);

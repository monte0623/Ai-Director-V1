/* ===================================
AI Director Workspace
V9.5-Recovered-R1
Recovered from:
V9.1 + V10B Structure
=================================== */

/* ===================================
Workspace Page
=================================== */

function renderWorkspacePage(){

    const project =
    AppState.currentProject;

    if(!project){

        return `
        <div class="workspace">

            <div class="workspace-top">

                <div class="workspace-title">

                    無專案

                </div>

            </div>

        </div>
        `;

    }

    return `

    <div class="workspace">

        <div class="workspace-top">

            <div class="workspace-title">

                🎬 ${project.name}

            </div>

            <div id="saveIndicator">

                🟢 已儲存

            </div>

            <button
            class="btn-secondary"
            onclick="backToProjects()">

                返回專案

            </button>

        </div>

        <div class="desktop-layout">

            <div class="panel script-panel">

                <div class="panel-header">

                    📝 Script

                </div>

                <div class="panel-body">

                    ${renderScriptPanel()}

                </div>

            </div>

            <div class="panel scene-panel">

                <div class="panel-header">

                    🎬 Scene

                </div>

                <div class="panel-body">

                    ${renderScenePanel()}

                </div>

            </div>

            <div class="panel shot-panel">

                <div class="panel-header">

                    🎞 Shot

                </div>

                <div class="panel-body">

                    ${renderShotPanel()}

                </div>

            </div>

            <div class="panel detail-panel">

                <div class="panel-header">

                    📋 Detail

                </div>

                <div class="panel-body">

                    ${renderDetailPanel()}

                </div>

            </div>

        </div>

    </div>

    `;

}

/* ===================================
Script Panel
=================================== */

function renderScriptPanel(){

    const project =
    AppState.currentProject;

    return `

    <textarea
    onchange="
    updateScript(
    this.value
    )
    "

    placeholder="輸入劇本內容">

${project.script || ''}

</textarea>

    `;

}

/* ===================================
Scene Panel
=================================== */

function renderScenePanel(){

    const project =
    AppState.currentProject;

    let html = `

    <button
    class="btn"
    onclick="addScene()">

        ＋新增 Scene

    </button>

    <br><br>

    `;

    project.scenes.forEach(

        scene=>{

        const active =

        AppState.currentScene &&
        AppState.currentScene.sceneId ===
        scene.sceneId

        ? "active"
        : "";

        html += `

        <div
        class="scene-item ${active}"

        onclick="
        selectScene(
        '${scene.sceneId}'
        )
        ">

            <strong>

            ${scene.sceneId}

            </strong>

            <br>

            ${scene.sceneName || ''}

        </div>

        `;

    });

    return html;

}

/* ===================================
Shot Panel
=================================== */

function renderShotPanel(){

    const project =
    AppState.currentProject;

    let shots = [];

    if(
        AppState.currentScene
    ){

        shots =
        project.shots.filter(

            shot=>

            shot.sceneId ===

            AppState.currentScene.sceneId

        );

    }

    let html = `

    <button
    class="btn"
    onclick="addShot()">

        ＋新增 Shot

    </button>

    <br><br>

    `;

    shots.forEach(

        shot=>{

        const active =

        AppState.currentShot &&
        AppState.currentShot.shotId ===
        shot.shotId

        ? "active"
        : "";

        html += `

        <div
        class="shot-item ${active}"

        onclick="
        selectShot(
        '${shot.shotId}'
        )
        ">

            <strong>

            ${shot.shotId}

            </strong>

            <br>

            ${shot.description || ''}

        </div>

        `;

    });

    return html;

}

/* ===================================
Detail Panel
=================================== */

function renderDetailPanel(){

    if(
        AppState.currentShot
    ){

        return renderShotDetail(
            AppState.currentShot
        );

    }

    if(
        AppState.currentScene
    ){

        return renderSceneDetail(
            AppState.currentScene
        );

    }

    return `

    <div>

        請選擇 Scene 或 Shot

    </div>

    `;

}

/* ===================================
Scene Actions
=================================== */

function selectScene(

    sceneId

){

    const scene =

    AppState.currentProject.scenes.find(

        s=>

        s.sceneId === sceneId

    );

    setCurrentScene(
        scene
    );

    renderApp();

}

function addScene(){

    const count =

    AppState.currentProject
    .scenes
    .length + 1;

    const scene = {

        sceneId:
        `S${String(count)
        .padStart(3,'0')}`,

        sceneName:"",

        location:"",

        time:"早上",

        actors:"",

        audio:"同步收音",

        camera:"",

        lighting:"",

        props:"",

        costumes:"",

        notes:"",

        status:"未準備"

    };

    AppState.currentProject
    .scenes
    .push(
        scene
    );

    autoSaveCurrentProject();

    renderApp();

}

/* ===================================
Shot Actions
=================================== */

function selectShot(

    shotId

){

    const shot =

    AppState.currentProject.shots.find(

        s=>

        s.shotId === shotId

    );

    setCurrentShot(
        shot
    );

    renderApp();

}

function addShot(){

    if(
        !AppState.currentScene
    ){

        alert(
            "請先選擇Scene"
        );

        return;

    }

    const count =

    AppState.currentProject
    .shots
    .length + 1;

    const shot = {

        shotId:
        `${AppState.currentScene.sceneId}-${String(count).padStart(3,'0')}`,

        sceneId:
        AppState.currentScene.sceneId,

        description:"",

        shotType:"中景",

        movement:"固定",

        lens:"50mm",

        camera:"",

        lighting:"",

        audio:"",

        actors:"",

        props:"",

        costumes:"",

        duration:"5",

        notes:"",

        priority:"中",

        status:"待拍攝",

        orientation:"橫式",

        ratio:"16:9"

    };

    AppState.currentProject
    .shots
    .push(
        shot
    );

    autoSaveCurrentProject();

    renderApp();

}

/* ===================================
Project Actions
=================================== */

function backToProjects(){

    AppState.currentProject =
    null;

    AppState.currentScene =
    null;

    AppState.currentShot =
    null;

    AppState.currentView =
    "projects";

    renderApp();

}

/* ===================================
Script Update
=================================== */

function updateScript(
    value
){

    AppState.currentProject
    .script = value;

    autoSaveCurrentProject();

}

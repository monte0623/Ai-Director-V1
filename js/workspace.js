/* ===================================
AI Director Workspace
V9.5-Recovered-R2A
Layout Recovery
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

    const stats =
    getProjectStats();

    return `

    <div class="workspace">

        <div class="workspace-top">

            <div class="workspace-title">

                🎬 ${project.name}

            </div>

            <div style="font-size:14px;">

                Scene: ${stats.scenes}
                |
                Shot: ${stats.shots}
                |
                完成: ${stats.completed}

            </div>

            <div style="margin-left:auto;">

                <span id="saveIndicator">

                    🟢 已儲存

                </span>

                <button
                class="btn"
                onclick="backToProjects()"
                style="margin-left:10px;">

                    返回專案

                </button>

            </div>

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
Script
=================================== */

function renderScriptPanel(){

    return `

    <textarea

        onchange="
        updateScript(
        this.value
        )
        "

        placeholder="輸入劇本內容"

    >${AppState.currentProject.script || ''}</textarea>

    `;
}

/* ===================================
Scene
=================================== */

function renderScenePanel(){

    const project =
    AppState.currentProject;

    let html = `

    <button
    class="btn"
    onclick="addScene()">

        新增 Scene

    </button>

    <br><br>

    `;

    project.scenes.forEach(scene=>{

        const active =

        AppState.currentScene &&
        AppState.currentScene.sceneId===scene.sceneId

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
Shot
=================================== */

function renderShotPanel(){

    if(
        !AppState.currentScene
    ){

        return `
        請先選擇 Scene
        `;
    }

    const shots =

    AppState.currentProject.shots.filter(

        shot=>

        shot.sceneId===

        AppState.currentScene.sceneId

    );

    let html = `

    <button
    class="btn"
    onclick="addShot()">

        新增 Shot

    </button>

    <br><br>

    `;

    shots.forEach(shot=>{

        const active =

        AppState.currentShot &&
        AppState.currentShot.shotId===shot.shotId

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
Detail
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
    請選擇 Scene 或 Shot
    `;
}

/* ===================================
Scene
=================================== */

function selectScene(sceneId){

    const scene =

    AppState.currentProject.scenes.find(

        s=>s.sceneId===sceneId

    );

    setCurrentScene(scene);

    renderApp();

}

function addScene(){

    const count =

    AppState.currentProject.scenes.length+1;

    AppState.currentProject.scenes.push({

        sceneId:
        `S${String(count).padStart(3,'0')}`,

        sceneName:"",

        location:"",

        time:"清晨",

        actors:"",

        audio:"同步收音",

        camera:"單機",

        lighting:"",

        props:"",

        costumes:"",

        notes:"",

        status:"未準備"

    });

    autoSaveCurrentProject();

    renderApp();

}

/* ===================================
Shot
=================================== */

function selectShot(shotId){

    const shot =

    AppState.currentProject.shots.find(

        s=>s.shotId===shotId

    );

    setCurrentShot(shot);

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

    AppState.currentProject.shots.length+1;

    AppState.currentProject.shots.push({

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

    });

    autoSaveCurrentProject();

    renderApp();

}

/* ===================================
Back
=================================== */

function backToProjects(){

    AppState.currentView =
    "projects";

    AppState.currentProject =
    null;

    AppState.currentScene =
    null;

    AppState.currentShot =
    null;

    renderApp();

}

/* ===================================
Script
=================================== */

function updateScript(value){

    AppState.currentProject.script =
    value;

    autoSaveCurrentProject();

}

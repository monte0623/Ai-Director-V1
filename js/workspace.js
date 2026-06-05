/* ===================================
AI Director Workspace
V10.0B-R1
=================================== */

/* ===================================
Workspace Layout
=================================== */

function renderWorkspacePage(){

const project =
AppState.currentProject;

return `

<div class="workspace">

   <div class="workspace-top">

    <div class="workspace-title">

        🎬 ${project.name}

    </div>

    <div
    style="
    margin-left:20px;
    font-size:14px;
    color:#ccc;
    ">

        Scene:
        ${project.scenes.length}

        |

        Shot:
        ${project.shots.length}

        |

        完成:
        ${
        project.shots.filter(
        s=>s.status==="完成"
        ).length
        }

    </div>

    <div
    id="saveIndicator"
    style="
    margin-left:auto;
    margin-right:12px;
    font-size:14px;
    ">

        🟢 已儲存

    </div>

    <button
    class="btn"
    onclick="backToProjects()">

        返回專案

    </button>

</div>

    </div>

    <!-- Desktop -->

    <div class="desktop-layout">

        ${renderScriptPanel()}

        ${renderScenePanel()}

        ${renderShotPanel()}

        ${renderDetailPanel()}

    </div>

    <!-- Mobile -->

    <div class="mobile-layout">

        <div
        id="mobileScript"
        class="mobile-page active">

            ${renderScriptContent()}

        </div>

        <div
        id="mobileScene"
        class="mobile-page">

            ${renderSceneContent()}

        </div>

        <div
        id="mobileShot"
        class="mobile-page">

            ${renderShotContent()}

        </div>

        <div
        id="mobileStoryboard"
        class="mobile-page">

            Storyboard
            （V10.5）

        </div>

        <div
        id="mobileShooting"
        class="mobile-page">

            Shooting Mode
            （V10.5）

        </div>

    </div>

</div>

<div class="bottom-nav">

    <button onclick="showMobilePage('mobileScript')">

        Script

    </button>

    <button onclick="showMobilePage('mobileScene')">

        Scene

    </button>

    <button onclick="showMobilePage('mobileShot')">

        Shot

    </button>

    <button onclick="showMobilePage('mobileStoryboard')">

        Board

    </button>

    <button onclick="showMobilePage('mobileShooting')">

        Shoot

    </button>

</div>

`;

}

/* ===================================
Script
=================================== */

function renderScriptPanel(){

return `

<div class="panel script-panel">

    <div class="panel-header">

        📝 Script

    </div>

    <div class="panel-body">

        ${renderScriptContent()}

    </div>

</div>

`;

}

function renderScriptContent(){

return `

<textarea
id="scriptEditor"
onkeyup="saveScript()"
placeholder="輸入劇本...">

${AppState.currentProject.script || ""}

</textarea>

`;

}

function saveScript(){

AppState.currentProject.script =

document.getElementById(
"scriptEditor"
).value;

autoSaveCurrentProject();

}

/* ===================================
Scene
=================================== */

function renderScenePanel(){

return `

<div class="panel scene-panel">

    <div class="panel-header">

        🎬 Scene

    </div>

    <div class="panel-body">

        ${renderSceneContent()}

    </div>

</div>

`;

}

function renderSceneContent(){

let html = `

<button
class="btn"
onclick="addScene()">

新增 Scene

</button>

<br><br>

`;

AppState.currentProject.scenes
.forEach(scene=>{

html += `

<div
class="scene-item
${AppState.currentScene?.sceneId===scene.sceneId ? 'active':''}"

onclick="selectScene('${scene.sceneId}')">

${scene.sceneId}

<br>

${scene.sceneName}

</div>

`;

});

return html;

}

function addScene(){

const name =
prompt("Scene名稱");

if(!name) return;

const index =
AppState.currentProject.scenes.length+1;

const scene = {

sceneId:
`S${String(index).padStart(3,'0')}`,

sceneName:name,

location:"",
time:"",
actors:"",
audio:"",
camera:"",
lighting:"",
props:"",
costumes:"",
notes:"",
status:"未準備"

};

AppState.currentProject.scenes.push(
scene
);

autoSaveCurrentProject();

renderApp();

}

function selectScene(sceneId){

const scene =

AppState.currentProject.scenes.find(
s=>s.sceneId===sceneId
);

setCurrentScene(scene);

renderApp();

}

/* ===================================
Shot
=================================== */

function renderShotPanel(){

return `

<div class="panel shot-panel">

    <div class="panel-header">

        🎞 Shot

    </div>

    <div class="panel-body">

        ${renderShotContent()}

    </div>

</div>

`;

}

function renderShotContent(){

if(!AppState.currentScene){

return "請先選擇 Scene";

}

let html = `

<button
class="btn"
onclick="addShot()">

新增 Shot

</button>

<br><br>

`;

const shots =

AppState.currentProject.shots.filter(
shot=>
shot.sceneId===
AppState.currentScene.sceneId
);

shots.forEach(shot=>{

html += `

<div
class="shot-item
${AppState.currentShot?.shotId===shot.shotId ? 'active':''}"

onclick="selectShot('${shot.shotId}')">

${shot.shotId}

</div>

`;

});

return html;

}

function addShot(){

const sceneId =
AppState.currentScene.sceneId;

const count =

AppState.currentProject.shots.filter(
s=>s.sceneId===sceneId
).length + 1;

const shot = {

shotId:
`${sceneId}-${String(count).padStart(3,'0')}`,

sceneId,

description:"",

shotType:"",

movement:"",

lens:"",

camera:"",

lighting:"",

audio:"",

actors:"",

props:"",

costumes:"",

duration:"",

notes:"",

priority:"中",

status:"待拍攝",

orientation:"橫式",

ratio:"16:9"

};

AppState.currentProject.shots.push(
shot
);

autoSaveCurrentProject();

renderApp();

}

function selectShot(shotId){

const shot =

AppState.currentProject.shots.find(
s=>s.shotId===shotId
);

setCurrentShot(shot);

renderApp();

}

/* ===================================
Detail
=================================== */

function renderDetailPanel(){

return `

<div class="panel detail-panel">

    <div class="panel-header">

        📋 Detail

    </div>

    <div class="panel-body">

        ${renderDetailContent()}

    </div>

</div>

`;

}

function renderDetailContent(){

if(AppState.currentShot){

return `

<h3>

${AppState.currentShot.shotId}

</h3>

<br>

<textarea
placeholder="鏡頭說明"
onkeyup="saveShotDescription(this.value)">

${AppState.currentShot.description}

</textarea>

`;

}

if(AppState.currentScene){

return `

<h3>

${AppState.currentScene.sceneId}

</h3>

<br>

<input
value="${AppState.currentScene.sceneName}"
onchange="saveSceneName(this.value)">

`;

}

return `

請選擇 Scene 或 Shot

`;

}

/* ===================================
Save Scene
=================================== */

function saveSceneName(value){

AppState.currentScene.sceneName =
value;

autoSaveCurrentProject();

}

/* ===================================
Save Shot
=================================== */

function saveShotDescription(value){

AppState.currentShot.description =
value;

autoSaveCurrentProject();

}

/* ===================================
Navigation
=================================== */

function backToProjects(){

AppState.currentView =
"projects";

renderApp();

}

function showMobilePage(id){

document
.querySelectorAll(
".mobile-page"
)
.forEach(page=>{

page.classList.remove(
"active"
);

});

document
.getElementById(id)
.classList.add(
"active"
);

}

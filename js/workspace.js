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
id="mobileDetail"
class="mobile-page">

${renderDetailContent()}

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

    <button onclick="showMobilePage('mobileDetail')">

Detail

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

setCurrentScene(scene);

if(AppState.isMobile){

setTimeout(()=>{

showMobilePage(
"mobileDetail"
);

},100);

}

renderApp();

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

/* ==========================
SHOT DETAIL
========================== */

if(AppState.currentShot){

const shot =
AppState.currentShot;

return `

<h3>${shot.shotId}</h3>

<div class="form-group">
<label>鏡頭說明</label>
<textarea
onkeyup="updateShotField(
'description',
this.value
)">
${shot.description||''}
</textarea>
</div>

<div class="form-group">
<label>景別</label>
<input
value="${shot.shotType||''}"
onchange="updateShotField(
'shotType',
this.value
)">
</div>

<div class="form-group">
<label>運鏡</label>
<input
value="${shot.movement||''}"
onchange="updateShotField(
'movement',
this.value
)">
</div>

<div class="form-group">
<label>焦段</label>
<input
value="${shot.lens||''}"
onchange="updateShotField(
'lens',
this.value
)">
</div>

<div class="form-group">
<label>秒數</label>
<input
value="${shot.duration||''}"
onchange="updateShotField(
'duration',
this.value
)">
</div>

<div class="form-group">
<label>優先級</label>

<select
onchange="updateShotField(
'priority',
this.value
)">

<option
${shot.priority==='高'?'selected':''}>
高
</option>

<option
${shot.priority==='中'?'selected':''}>
中
</option>

<option
${shot.priority==='低'?'selected':''}>
低
</option>

</select>

</div>

`;

}

/* ==========================
SCENE DETAIL
========================== */

if(AppState.currentScene){

const scene =
AppState.currentScene;

return `

<h3>

${scene.sceneId}

</h3>

<div class="form-group">

<label>

Scene名稱

</label>

<input
value="${scene.sceneName||''}"

onchange="
updateSceneField(
'sceneName',
this.value
)
">

</div>

<div class="form-group">

<label>

地點

</label>

<input
value="${scene.location||''}"

onchange="
updateSceneField(
'location',
this.value
)
">

</div>

<div class="form-group">

<label>

時間

</label>

<select

onchange="
updateSceneField(
'time',
this.value
)
">

<option
${scene.time==='清晨'?'selected':''}>
清晨
</option>

<option
${scene.time==='早上'?'selected':''}>
早上
</option>

<option
${scene.time==='下午'?'selected':''}>
下午
</option>

<option
${scene.time==='黃昏'?'selected':''}>
黃昏
</option>

</select>

</div>

<div class="form-group">

<label>

演員

</label>

<input
value="${scene.actors||''}"

onchange="
updateSceneField(
'actors',
this.value
)
">

</div>

<div class="form-group">

<label>

收音

</label>

<select

onchange="
updateSceneField(
'audio',
this.value
)
">

<option
${scene.audio==='同步收音'?'selected':''}>
同步收音
</option>

<option
${scene.audio==='環境音'?'selected':''}>
環境音
</option>

<option
${scene.audio==='不收音'?'selected':''}>
不收音
</option>

</select>

</div>

<div class="form-group">

<label>

攝影機

</label>

<select

onchange="
updateSceneField(
'camera',
this.value
)
">

<option
${scene.camera==='單機'?'selected':''}>
單機
</option>

<option
${scene.camera==='雙機'?'selected':''}>
雙機
</option>

<option
${scene.camera==='手機'?'selected':''}>
手機
</option>

</select>

</div>

<div class="form-group">

<label>

燈光

</label>

<input
value="${scene.lighting||''}"

onchange="
updateSceneField(
'lighting',
this.value
)
">

</div>

<div class="form-group">

<label>

道具

</label>

<input
value="${scene.props||''}"

onchange="
updateSceneField(
'props',
this.value
)
">

</div>

<div class="form-group">

<label>

服裝

</label>

<input
value="${scene.costumes||''}"

onchange="
updateSceneField(
'costumes',
this.value
)
">

</div>

<div class="form-group">

<label>

備註

</label>

<textarea

onkeyup="
updateSceneField(
'notes',
this.value
)
">

${scene.notes||''}

</textarea>

</div>

<div class="form-group">

<label>

Scene狀態

</label>

<select

onchange="
updateSceneField(
'status',
this.value
)
">

<option
${scene.status==='未準備'?'selected':''}>
未準備
</option>

<option
${scene.status==='準備中'?'selected':''}>
準備中
</option>

<option
${scene.status==='拍攝中'?'selected':''}>
拍攝中
</option>

<option
${scene.status==='完成'?'selected':''}>
完成
</option>

</select>

</div>

`;

}

return "請選擇 Scene 或 Shot";

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

function updateSceneField(
field,
value
){

AppState.currentScene[
field
] = value;

autoSaveCurrentProject();

}

function updateShotField(
field,
value
){

AppState.currentShot[
field
] = value;

autoSaveCurrentProject();

}

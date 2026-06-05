/* ===================================
AI Director Workspace
V10.0B-R2 Final
=================================== */

/* ===================================
Workspace Layout
=================================== */

function renderWorkspacePage(){

const project =
AppState.currentProject;

const completedShots =
project.shots.filter(
shot=>shot.status===“完成”
).length;

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
${completedShots}

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
<div
style="
padding:20px;
">
<h3>

🎬 Shooting Mode

</h3>
<p>

V10.5 開放

</p>
</div>
</div>
</div>
</div>
<div class="bottom-nav">

Script

</button>

Scene

</button>

Shot

</button>

Detail

</button>

Shoot

</button>
</div>

`;

}

/* ===================================
Detail Router
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

<div class="empty-detail">

請選擇 Scene 或 Shot

</div>

`;

}

/* ===================================
Script Panel
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

const editor =

document.getElementById(
“scriptEditor”
);

if(!editor) return;

AppState.currentProject.script =
editor.value;

autoSaveCurrentProject();

}

/* ===================================
Scene Panel
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

新增 Scene

</button>

`;

AppState.currentProject.scenes
.forEach(scene=>{

html += `

<div
class="scene-item
${AppState.currentScene?.sceneId===scene.sceneId
? 'active'
: ''}"

onclick=”
selectScene(
‘${scene.sceneId}’
)
“>

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
prompt(
“Scene名稱”
);

if(!name)
return;

const index =

AppState.currentProject.scenes.length + 1;

const scene = {

sceneId:
S${String(index).padStart(3,'0')},

sceneName:name,

location:””,

time:””,

actors:””,

audio:””,

camera:””,

lighting:””,

props:””,

costumes:””,

notes:””,

status:“未準備”

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

if(!scene)
return;

setCurrentScene(
scene
);

renderApp();

if(
AppState.isMobile
){

setTimeout(()=>{

showMobilePage(
“mobileDetail”
);

},100);

}

}

/* ===================================
Shot Panel
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

if(
!AppState.currentScene
){

return `

<div class="empty-detail">

請先選擇 Scene

</div>

`;

}

let html = `

新增 Shot

</button>

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
${AppState.currentShot?.shotId===shot.shotId
? 'active'
: ''}"

onclick=”
selectShot(
‘${shot.shotId}’
)
“>

${shot.shotId}

</div>

`;

});

return html;

}

function addShot(){

if(
!AppState.currentScene
){

alert(
“請先建立或選擇 Scene”
);

return;

}

const sceneId =
AppState.currentScene.sceneId;

const count =

AppState.currentProject.shots.filter(
s=>s.sceneId===sceneId
).length + 1;

const shot = {

shotId:
${sceneId}-${String(count).padStart(3,'0')},

sceneId,

description:””,

shotType:””,

movement:””,

lens:””,

camera:””,

lighting:””,

audio:””,

actors:””,

props:””,

costumes:””,

duration:””,

notes:””,

priority:“中”,

status:“待拍攝”,

orientation:“橫式”,

ratio:“16:9”

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

if(!shot)
return;

setCurrentShot(
shot
);

renderApp();

if(
AppState.isMobile
){

setTimeout(()=>{

showMobilePage(
“mobileDetail”
);

},100);

}

}

/* ===================================
Navigation
=================================== */

function backToProjects(){

AppState.currentView =
“projects”;

renderApp();

}

function showMobilePage(id){

document
.querySelectorAll(
“.mobile-page”
)
.forEach(page=>{

page.classList.remove(
“active”
);

});

const target =

document.getElementById(
id
);

if(
target
){

target.classList.add(
“active”
);

}

}

/* ===================================
Update Scene
=================================== */

function updateSceneField(
field,
value
){

if(
!AppState.currentScene
)
return;

AppState.currentScene[
field
] = value;

autoSaveCurrentProject();

}

/* ===================================
Update Shot
=================================== */

function updateShotField(
field,
value
){

if(
!AppState.currentShot
)
return;

AppState.currentShot[
field
] = value;

autoSaveCurrentProject();

}

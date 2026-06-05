/* ===================================
AI Director
Scene Detail Module
V10.0B-R2
=================================== */

function renderSceneDetail(scene){

if(!scene){

return `
<div class="empty-detail">

請選擇 Scene

</div>
`;

}

return `

<h3>

🎬 ${scene.sceneId}

</h3>

<div class="detail-actions">

<button
class="btn"
onclick="copyCurrentScene()">

複製 Scene

</button>

<button
class="btn-danger"
onclick="deleteCurrentScene()">

刪除 Scene

</button>

</div>

<div class="form-group">

<label>Scene名稱</label>

<input
value="${scene.sceneName || ''}"
onchange="
updateSceneField(
'sceneName',
this.value
)
">

</div>

<div class="form-group">

<label>地點</label>

<input
value="${scene.location || ''}"
onchange="
updateSceneField(
'location',
this.value
)
">

</div>

<div class="form-group">

<label>時間</label>

<select
onchange="
updateSceneField(
'time',
this.value
)
">

<option ${scene.time==='清晨'?'selected':''}>清晨</option>
<option ${scene.time==='早上'?'selected':''}>早上</option>
<option ${scene.time==='下午'?'selected':''}>下午</option>
<option ${scene.time==='黃昏'?'selected':''}>黃昏</option>
<option ${scene.time==='晚上'?'selected':''}>晚上</option>

</select>

</div>

<div class="form-group">

<label>演員</label>

<input
value="${scene.actors || ''}"
onchange="
updateSceneField(
'actors',
this.value
)
">

</div>

<div class="form-group">

<label>收音</label>

<select
onchange="
updateSceneField(
'audio',
this.value
)
">

<option ${scene.audio==='同步收音'?'selected':''}>同步收音</option>
<option ${scene.audio==='環境音'?'selected':''}>環境音</option>
<option ${scene.audio==='不收音'?'selected':''}>不收音</option>

</select>

</div>

<div class="form-group">

<label>攝影機</label>

<input
value="${scene.camera || ''}"
onchange="
updateSceneField(
'camera',
this.value
)
">

</div>

<div class="form-group">

<label>燈光</label>

<input
value="${scene.lighting || ''}"
onchange="
updateSceneField(
'lighting',
this.value
)
">

</div>

<div class="form-group">

<label>道具</label>

<input
value="${scene.props || ''}"
onchange="
updateSceneField(
'props',
this.value
)
">

</div>

<div class="form-group">

<label>服裝</label>

<input
value="${scene.costumes || ''}"
onchange="
updateSceneField(
'costumes',
this.value
)
">

</div>

<div class="form-group">

<label>備註</label>

<textarea
onkeyup="
updateSceneField(
'notes',
this.value
)
">

${scene.notes || ''}

</textarea>

</div>

<div class="form-group">

<label>Scene狀態</label>

<select
onchange="
updateSceneField(
'status',
this.value
)
">

<option ${scene.status==='未準備'?'selected':''}>未準備</option>
<option ${scene.status==='準備中'?'selected':''}>準備中</option>
<option ${scene.status==='拍攝中'?'selected':''}>拍攝中</option>
<option ${scene.status==='完成'?'selected':''}>完成</option>

</select>

</div>

`;

}

/* ===================================
Scene Copy
=================================== */

function copyCurrentScene(){

if(!AppState.currentScene)
return;

const source =
AppState.currentScene;

const clone =
structuredClone(
source
);

const count =
AppState.currentProject.scenes.length+1;

clone.sceneId =
`S${String(count).padStart(3,'0')}`;

clone.sceneName =
source.sceneName +
" Copy";

AppState.currentProject.scenes.push(
clone
);

autoSaveCurrentProject();

renderApp();

}

/* ===================================
Scene Delete
=================================== */

function deleteCurrentScene(){

if(!AppState.currentScene)
return;

const ok =
confirm(
"刪除目前Scene？"
);

if(!ok) return;

AppState.currentProject.scenes =

AppState.currentProject.scenes.filter(
scene=>
scene.sceneId !==
AppState.currentScene.sceneId
);

AppState.currentScene =
null;

autoSaveCurrentProject();

renderApp();

}

/* ===================================
AI Director
Shot Detail Module
V10.0B-R2
=================================== */

function renderShotDetail(shot){

if(!shot){

return `
<div class="empty-detail">

請選擇 Shot

</div>
`;

}

return `

<h3>

🎞 ${shot.shotId}

</h3>

<div class="detail-actions">

<button
class="btn"
onclick="copyCurrentShot()">

複製 Shot

</button>

<button
class="btn-danger"
onclick="deleteCurrentShot()">

刪除 Shot

</button>

</div>

<div class="form-group">
<label>鏡頭說明</label>
<textarea
onkeyup="
updateShotField(
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
onchange="
updateShotField(
'shotType',
this.value
)">
</div>

<div class="form-group">
<label>運鏡</label>
<input
value="${shot.movement||''}"
onchange="
updateShotField(
'movement',
this.value
)">
</div>

<div class="form-group">
<label>焦段</label>
<input
value="${shot.lens||''}"
onchange="
updateShotField(
'lens',
this.value
)">
</div>

<div class="form-group">
<label>攝影機</label>
<input
value="${shot.camera||''}"
onchange="
updateShotField(
'camera',
this.value
)">
</div>

<div class="form-group">
<label>燈光</label>
<input
value="${shot.lighting||''}"
onchange="
updateShotField(
'lighting',
this.value
)">
</div>

<div class="form-group">
<label>收音</label>
<input
value="${shot.audio||''}"
onchange="
updateShotField(
'audio',
this.value
)">
</div>

<div class="form-group">
<label>演員</label>
<input
value="${shot.actors||''}"
onchange="
updateShotField(
'actors',
this.value
)">
</div>

<div class="form-group">
<label>道具</label>
<input
value="${shot.props||''}"
onchange="
updateShotField(
'props',
this.value
)">
</div>

<div class="form-group">
<label>服裝</label>
<input
value="${shot.costumes||''}"
onchange="
updateShotField(
'costumes',
this.value
)">
</div>

<div class="form-group">
<label>鏡頭秒數</label>
<input
type="number"
value="${shot.duration||''}"
onchange="
updateShotField(
'duration',
this.value
)">
</div>

<div class="form-group">
<label>拍攝方向</label>
<select
onchange="
updateShotField(
'orientation',
this.value
)">
<option ${shot.orientation==='橫式'?'selected':''}>橫式</option>
<option ${shot.orientation==='直式'?'selected':''}>直式</option>
</select>
</div>

<div class="form-group">
<label>畫面比例</label>
<select
onchange="
updateShotField(
'ratio',
this.value
)">
<option ${shot.ratio==='16:9'?'selected':''}>16:9</option>
<option ${shot.ratio==='9:16'?'selected':''}>9:16</option>
<option ${shot.ratio==='1:1'?'selected':''}>1:1</option>
<option ${shot.ratio==='4:5'?'selected':''}>4:5</option>
<option ${shot.ratio==='21:9'?'selected':''}>21:9</option>
</select>
</div>

<div class="form-group">
<label>拍攝備註</label>
<textarea
onkeyup="
updateShotField(
'notes',
this.value
)">
${shot.notes||''}
</textarea>
</div>

`;

}

/* ===================================
Shot Copy
=================================== */

function copyCurrentShot(){

if(!AppState.currentShot)
return;

const source =
AppState.currentShot;

const clone =
structuredClone(
source
);

clone.shotId =
source.shotId +
"-COPY";

AppState.currentProject.shots.push(
clone
);

autoSaveCurrentProject();

renderApp();

}

/* ===================================
Shot Delete
=================================== */

function deleteCurrentShot(){

if(!AppState.currentShot)
return;

const ok =
confirm(
"刪除目前Shot？"
);

if(!ok) return;

AppState.currentProject.shots =

AppState.currentProject.shots.filter(
shot=>
shot.shotId !==
AppState.currentShot.shotId
);

AppState.currentShot =
null;

autoSaveCurrentProject();

renderApp();

}

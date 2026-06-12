<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>AI Director Assistant V10.0B-R1</title>
    <style>
        :root {
            --primary: #FF6A00;
            --bg: #0B0B0B;
            --panel: #151515;
            --border: #2A2A2A;
            --text: #E0E0E0;
            --safe-top: env(safe-area-inset-top);
        }

        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

        body {
            margin: 0; background: var(--bg); color: var(--text);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            height: 100vh; display: flex; flex-direction: column; overflow: hidden;
        }

        /* Header */
        .app-header {
            height: 50px; background: #000; display: flex; align-items: center; 
            justify-content: space-between; padding: 0 16px; border-bottom: 1px solid var(--border);
            padding-top: var(--safe-top);
        }
        .logo { color: var(--primary); font-weight: bold; font-size: 18px; }
        .version { font-size: 10px; color: #555; }

        /* Workspace Layout */
        .script-section { padding: 12px; background: var(--panel); border-bottom: 1px solid var(--border); }
        #scriptInput { 
            width: 100%; height: 100px; background: #222; color: #fff; border: 1px solid #333;
            border-radius: 8px; padding: 10px; font-size: 14px; resize: none;
        }

        .main-container { display: flex; flex: 1; overflow: hidden; }
        .panel { 
            display: flex; flex-direction: column; border-right: 1px solid var(--border); 
            padding: 10px; overflow-y: auto; -webkit-overflow-scrolling: touch; 
        }

        /* 寬度分配 - 針對 iPad 最佳化 */
        #scenePanel { width: 22%; background: #111; }
        #shotPanel { width: 25%; background: #151515; }
        #detailPanel { width: 25%; background: #1A1A1A; }
        #storyPanel { flex: 1; background: #0D0D0D; border-right: none; }

        /* UI Cards */
        .section-label { font-size: 11px; color: var(--primary); font-weight: 800; margin-bottom: 10px; text-transform: uppercase; }
        .card { 
            background: #222; padding: 12px; border-radius: 8px; margin-bottom: 8px; 
            cursor: pointer; border: 1px solid transparent; transition: 0.15s;
        }
        .card:hover { background: #282828; }
        .card.active { border-color: var(--primary); background: #2D1A0D; }

        /* Inputs & Buttons */
        input, select, textarea { 
            background: #2A2A2A; color: white; border: 1px solid #333; 
            padding: 10px; border-radius: 6px; width: 100%; margin-bottom: 10px;
        }
        .btn { 
            border: none; border-radius: 6px; padding: 10px 15px; font-weight: bold;
            cursor: pointer; transition: 0.2s; font-size: 13px;
        }
        .btn-primary { background: var(--primary); color: white; }
        .btn-ghost { background: #333; color: #ccc; }

        /* Storyboard & AI Advice */
        .story-view { 
            aspect-ratio: 16/9; background: #000; border-radius: 8px; border: 1px dashed #444;
            display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
        }
        .ai-box { margin-top: 15px; padding: 12px; background: #111; border-radius: 8px; border-left: 3px solid var(--primary); font-size: 13px; color: #aaa; }

        /* 拍攝模式 Overlay */
        #shootingOverlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 999;
            display: none; padding: 40px; justify-content: center; align-items: center;
        }
        .overlay-content { background: #181818; width: 100%; max-width: 400px; border-radius: 15px; padding: 25px; border: 1px solid var(--primary); }

        /* 響應式：手機端自動調整 */
        @media (max-width: 768px) {
            .main-container { flex-direction: column; overflow-y: auto; }
            .panel { width: 100% !important; border-right: none; border-bottom: 1px solid var(--border); height: auto; }
            body { overflow: auto; }
        }
    </style>
</head>
<body>

<header class="app-header">
    <div class="logo">🎬 AI Director Assistant</div>
    <div class="version">V10.0B-R1</div>
</header>

<div class="script-section">
    <textarea id="scriptInput" placeholder="請輸入或貼上劇本片段..."></textarea>
    <div style="margin-top:10px; display:flex; gap:8px;">
        <button class="btn btn-primary" onclick="aiBreakdown()">🤖 AI 拆解場景</button>
        <button class="btn btn-ghost" onclick="saveProject()">💾 儲存</button>
        <button class="btn btn-ghost" onclick="loadProject()">📂 載入</button>
    </div>
</div>

<div class="main-container">
    <div class="panel" id="scenePanel">
        <div class="section-label">Scenes</div>
        <div id="sceneList"></div>
    </div>
    
    <div class="panel" id="shotPanel">
        <div class="section-label">Shot List</div>
        <div id="shotList"></div>
        <button class="btn btn-primary" onclick="addShot()">+ 新增鏡頭</button>
    </div>

    <div class="panel" id="detailPanel">
        <div class="section-label">Shot Detail</div>
        <div id="detailArea"></div>
    </div>

    <div class="panel" id="storyPanel">
        <div class="section-label">Director's Monitor</div>
        <div class="story-view" id="sbPreview">選擇鏡頭預覽</div>
        <div class="ai-box" id="aiAdvice">AI 導演：等待鏡頭資料輸入中...</div>
    </div>
</div>

<div id="shootingOverlay">
    <div class="overlay-content">
        <h2 style="color:var(--primary); margin-top:0;">🎥 拍攝控制</h2>
        <div id="shootingInfo" style="margin-bottom:20px; line-height:1.6;"></div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <button class="btn" style="background:#28a745; color:white" onclick="setStatus('OK')">OK</button>
            <button class="btn" style="background:#dc3545; color:white" onclick="setStatus('NG')">NG</button>
            <button class="btn btn-ghost" style="grid-column: span 2" onclick="toggleShooting()">返回工作區</button>
        </div>
    </div>
</div>

<button class="btn btn-primary" style="position:fixed; bottom:20px; right:20px; border-radius:50px; padding:15px 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);" onclick="toggleShooting()">🎥 現場拍攝模式</button>

<script>
    let project = { scenes: [] };
    let curS = null;
    let curT = null;

    // --- 初始化與儲存 ---
    function saveProject() {
        project.script = document.getElementById('scriptInput').value;
        localStorage.setItem('aiDirectorV10', JSON.stringify(project));
        alert('專案儲存成功 (V10)');
    }

    function loadProject() {
        const saved = localStorage.getItem('aiDirectorV10') || localStorage.getItem('aiDirectorV90');
        if(saved) {
            project = JSON.parse(saved);
            document.getElementById('scriptInput').value = project.script || "";
            renderScenes();
        }
    }

    // --- 場景邏輯 ---
    function aiBreakdown() {
        const text = document.getElementById('scriptInput').value;
        if(!text) return;
        const lines = text.split('\n').filter(l => l.trim().length > 3);
        lines.forEach(line => {
            project.scenes.push({ scene: line.substring(0,30), location: "未定", shots: [] });
        });
        renderScenes();
        saveProject();
    }

    function renderScenes() {
        const list = document.getElementById('sceneList');
        list.innerHTML = project.scenes.map((s, i) => `
            <div class="card ${curS===i?'active':''}" onclick="selectScene(${i})">
                <strong>S#${i+1} ${s.scene}</strong>
                <div style="font-size:10px; color:#666; margin-top:5px;">${s.shots.length} SHOTS</div>
            </div>
        `).join('');
    }

    function selectScene(i) {
        curS = i; curT = null;
        renderScenes();
        renderShots();
        document.getElementById('detailArea').innerHTML = '';
    }

    // --- 鏡頭邏輯 ---
    function addShot() {
        if(curS === null) return alert("請先選擇一個場景");
        project.scenes[curS].shots.push({
            shotNo: project.scenes[curS].shots.length + 1,
            description: "鏡頭描述內容",
            lens: "35mm",
            size: "MS",
            status: "待辦"
        });
        renderShots();
        saveProject();
    }

    function renderShots() {
        const list = document.getElementById('shotList');
        if(curS === null) return list.innerHTML = '';
        list.innerHTML = project.scenes[curS].shots.map((t, i) => `
            <div class="card ${curT===i?'active':''}" onclick="selectShot(${i})">
                <strong>Shot ${t.shotNo} [${t.size}]</strong>
                <div style="font-size:11px; color:#aaa;">${t.description}</div>
                <div style="font-size:10px; color:${t.status==='OK'?'#28a745':'#666'}">● ${t.status}</div>
            </div>
        `).join('');
    }

    function selectShot(i) {
        curT = i;
        renderShots();
        const t = project.scenes[curS].shots[i];
        
        document.getElementById('detailArea').innerHTML = `
            <label class="section-label">描述</label>
            <textarea onchange="updateShot('description', this.value)">${t.description}</textarea>
            <label class="section-label">焦段 (LENS)</label>
            <input value="${t.lens}" onchange="updateShot('lens', this.value)">
            <label class="section-label">景別 (SIZE)</label>
            <select onchange="updateShot('size', this.value)">
                <option value="CU" ${t.size==='CU'?'selected':''}>Close Up (特寫)</option>
                <option value="MS" ${t.size==='MS'?'selected':''}>Medium Shot (中景)</option>
                <option value="WS" ${t.size==='WS'?'selected':''}>Wide Shot (全景)</option>
            </select>
        `;

        document.getElementById('sbPreview').innerHTML = `<h1 style="color:var(--primary)">${t.size}</h1><p>${t.description}</p>`;
        document.getElementById('aiAdvice').innerHTML = `🤖 <strong>AI 導演建議：</strong><br>考量到 ${t.lens} 的特性，建議在光線上增加側向的主燈（Key Light），以符合您喜愛的日式質感。`;
    }

    function updateShot(field, val) {
        project.scenes[curS].shots[curT][field] = val;
        renderShots();
        saveProject();
    }

    // --- 拍攝模式 ---
    function toggleShooting() {
        const overlay = document.getElementById('shootingOverlay');
        const isVisible = overlay.style.display === 'flex';
        overlay.style.display = isVisible ? 'none' : 'flex';
        if(!isVisible && curS !== null && curT !== null) {
            const t = project.scenes[curS].shots[curT];
            document.getElementById('shootingInfo').innerHTML = `
                <strong>SCENE S#${curS+1}</strong><br>
                <strong>SHOT ${t.shotNo}</strong> [${t.size}]<br>
                <strong>LENS:</strong> ${t.lens}<br><br>
                <em>${t.description}</em>
            `;
        }
    }

    function setStatus(status) {
        if(curS !== null && curT !== null) {
            project.scenes[curS].shots[curT].status = status;
            renderShots();
            toggleShooting();
            saveProject();
        }
    }

    // 自動載入
    loadProject();
</script>

</body>
</html>

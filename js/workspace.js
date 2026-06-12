/* ===================================
AI Director Workspace
V10.0B-R3
=================================== */

function renderWorkspacePage(){

const project = AppState.currentProject;

return `

<div class="workspace">

    <div class="workspace-top">

        <div class="workspace-title">

            🎬 ${project.name}

        </div>

        <button
        class="btn"
        onclick="backToProjects()">

            返回專案

        </button>

    </div>

    <div class="workspace-body">

        <div class="workspace-left">

            <div class="workspace-section">

                <h3>📝 Script</h3>

                <textarea
                id="scriptEditor">

${project.script || ""}

</textarea>

            </div>

            <div class="workspace-section">

                <h3>🎬 Scene</h3>

                Scene List

            </div>

            <div class="workspace-section">

                <h3>🎞 Shot</h3>

                Shot List

            </div>

        </div>

        <div class="workspace-right">

            <h3>📋 Detail</h3>

            請選擇 Scene 或 Shot

        </div>

    </div>

</div>

`;

}

function backToProjects(){

AppState.currentView = "projects";

renderApp();

}

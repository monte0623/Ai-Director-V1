/* ===================================
AI Director Project Manager
V10.0B-R1
=================================== */

/* ===================================
Load Projects
=================================== */

async function loadProjectsToState(){

    AppState.projects =
    await getProjects();

}

/* ===================================
Render Project Page
=================================== */

function renderProjectPage(){

return `

<div class="project-page">

    <div class="project-toolbar">

        <input
            id="projectSearch"
            placeholder="搜尋專案..."
            onkeyup="searchProjects()">

        <button
            class="btn"
            onclick="addProjectPrompt()">

            ＋新增專案

        </button>

    </div>

    <div
        class="project-grid"
        id="projectGrid">

    </div>

</div>

`;

}

/* ===================================
Render Cards
=================================== */

function renderProjectCards(
    projects
){

    const grid =
    document.getElementById(
        "projectGrid"
    );

    if(!grid) return;

    grid.innerHTML = "";

    if(
        projects.length === 0
    ){

        grid.innerHTML = `

        <div
        class="project-card">

            <div
            class="project-info">

                <h3>

                尚無專案

                </h3>

                <p>

                點擊新增專案

                </p>

            </div>

        </div>

        `;

        return;

    }

    projects.forEach(
        project=>{

        const card =
        document.createElement(
            "div"
        );

        card.className =
        "project-card";

        card.innerHTML = `

        <div
        class="project-cover">

        </div>

        <div
        class="project-info">

            <div
            class="project-title">

                ${project.name}

            </div>

            <div
            class="project-meta">

                ${project.folder}

            </div>

            <div
            class="project-meta">

                Scene:
                ${project.scenes.length}

            </div>

            <div
            class="project-meta">

                Shot:
                ${project.shots.length}

            </div>

            <br>

            <button
            class="btn"

            onclick="
            event.stopPropagation();
            openProject(
            '${project.id}'
            );
            ">

            開啟

            </button>

            <button
            class="btn-danger"

            onclick="
            event.stopPropagation();
            removeProject(
            '${project.id}'
            );
            ">

            刪除

            </button>

        </div>

        `;

        card.onclick =
        ()=>{

            openProject(
                project.id
            );

        };

        grid.appendChild(
            card
        );

    });

}

/* ===================================
Add Project
=================================== */

async function addProjectPrompt(){

    const name =
    prompt(
        "請輸入專案名稱"
    );

    if(!name) return;

    const project =
    createProjectSchema();

    project.name = name;

    await saveProject(
        project
    );

    await refreshProjects();

}

/* ===================================
Refresh Projects
=================================== */

async function refreshProjects(){

    await loadProjectsToState();

    renderProjectCards(
        AppState.projects
    );

}

/* ===================================
Open Project
=================================== */

async function openProject(
    projectId
){

    const project =
    await getProjectById(
        projectId
    );

    setCurrentProject(
        project
    );

    AppState.currentView =
    "workspace";

    renderApp();

}

/* ===================================
Delete Project
=================================== */

async function removeProject(
    projectId
){

    const result =
    confirm(
        "確定刪除專案？"
    );

    if(!result) return;

    await deleteProject(
        projectId
    );

    await refreshProjects();

}

/* ===================================
Search
=================================== */

function searchProjects(){

    const keyword =

    document
    .getElementById(
        "projectSearch"
    )
    .value
    .toLowerCase();

    const filtered =

    AppState.projects.filter(
        project=>{

        return project.name
        .toLowerCase()
        .includes(
            keyword
        );

    });

    renderProjectCards(
        filtered
    );

}

function getProjectStats(){

    const project =
    AppState.currentProject;

    if(!project){

        return {

            scenes:0,

            shots:0,

            completed:0

        };

    }

    const scenes =
    project.scenes.length;

    const shots =
    project.shots.length;

    const completed =
    project.shots.filter(
        shot=>
        shot.status==="完成"
    ).length;

    return {

        scenes,
        shots,
        completed

    };

}

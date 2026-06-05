let saveState = "saved";

function setSaving(){

    saveState = "saving";

    updateSaveIndicator();

}

function setSaved(){

    saveState = "saved";

    updateSaveIndicator();

}

function updateSaveIndicator(){

    const el =
    document.getElementById(
        "saveIndicator"
    );

    if(!el) return;

    if(saveState==="saving"){

        el.innerHTML =
        "🟡 儲存中...";

    }
    else{

        el.innerHTML =
        "🟢 已儲存";

    }

}

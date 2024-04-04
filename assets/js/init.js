const firstTab = document.querySelector("#chat"),
appServcesWreapper = document.querySelector("#app-services"),
serviceIconMap= new Map([
    ['chat', document.querySelector("#chat-tab-icon svg")],
    ['task', document.querySelector("#todo-tab-icon svg")],
    ['stats', document.querySelector("#stats-tab-icon svg")]
]);


export default function(){
    appServcesWreapper.addEventListener('click', e =>{
        e.stopPropagation()
        e.preventDefault()
        const target= getTarget(e);
        updateTab(target);
        upadateActiveIcon(target);
    })
}

function updateTab(targetDiv){
    firstTab.style.marginLeft= "-" + (targetDiv.dataset.stepmargin * 100) + "vw"
}

function upadateActiveIcon(targetDiv){
    const svgTarget= targetDiv.querySelector("svg")
    serviceIconMap.forEach(serviceIconSvg =>{
        const pathSvg = serviceIconSvg.querySelector("path");
        if(svgTarget ===serviceIconSvg){
            pathSvg.setAttribute("fill","#0f0");
        }else{
            pathSvg.setAttribute("fill","#fff");
        }
             
    });
}

function getTarget(e){
    return e.target.closest(`[id$="tab-icon"]`)
}
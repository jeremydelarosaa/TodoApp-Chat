function crea(typeElem, attributes= [], text = null){
    const newElem= document.createElement(typeElem);

    for(let [nomeAttr , valloreAttr] of attributes){
        newElem.setAttribute(nomeAttr, valloreAttr)
    }
    if(text){
        newElem.append(document.createTextNode(text))
    }
    return newElem
}


export{crea};
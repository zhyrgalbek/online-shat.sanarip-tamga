export function createElement({htmlElement, elemenClass, icon, address}){
    let element = document.createElement(htmlElement);
    if(htmlElement == "button"){
        for(let i=0;i<elemenClass.length;i++){
            element.classList.add(elemenClass[i]);
        }
        element.innerHTML = icon;
    }
    if(htmlElement == "a"){
        for(let i=0;i<elemenClass.length;i++){
            element.classList.add(elemenClass[i]);
        }
        element.target = "_blank";
        element.href= address;
        element.innerHTML = icon;
    }
    return element;
}

export function isGetElement(form, element) {

    let elemClass = element.classList;
    let formChildren = form.children;
    let r = false;

    for (let i = 0; i < formChildren.length; i++) {
        r = formChildren[i].classList.contains(elemClass[0]);
        if (r) {
            break;
        }
    }
    return r;
}

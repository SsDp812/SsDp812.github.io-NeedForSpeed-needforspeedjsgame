


const body = document.querySelector(body);
const head = document.querySelector(head);
const parser = (element) =>{


body.childNodes.forEach(node =>{
    console.log(node);
    if (Element.childNodes.length>1){
        parser(node);
    }
})

}

parser(body);

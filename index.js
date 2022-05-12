/* YOUR CODE HERE! */

let shapeNum = 1;
const parentElement = document.getElementsByClassName('box-container')[0];
const element = document.getElementsByClassName('box')[0];
addListeners(element);


function addListeners(element) {
    element.addEventListener('contextmenu', rightClickHandler);
    element.addEventListener('click', shiftLeftClickHandler);
    element.addEventListener('dblclick', doubleClickHandler);
    element.addEventListener('mousedown', mouseDownHandler);
    element.addEventListener('mouseup', mouseUpHandler);
}

function mouseDownHandler(ev) {
    // if (parentElement.children.length > 1) {
    //     parentElement.appendChild(ev.currentTarget);
    // }
    ev.currentTarget.addEventListener('mousemove', mouseMoveHandler);
}

function mouseMoveHandler(ev) {
    ev.currentTarget.style.top = `${ev.clientY - ev.currentTarget.offsetHeight / 2}px`;
    ev.currentTarget.style.left = `${ev.clientX - ev.currentTarget.offsetWidth / 2}px`;
}

function mouseUpHandler(ev) {
    ev.currentTarget.removeEventListener('mousemove', mouseMoveHandler);
}

function rightClickHandler(ev) {
    ev.preventDefault();
    const colorNum = 16777215;
    ev.currentTarget.style.background = '#' + 
        Math.floor(Math.random() * colorNum).toString(16);
}

function shiftLeftClickHandler(ev) {
    if (ev.shiftKey) {
        ev.currentTarget.classList.toggle('box-large');
    }
}

function doubleClickHandler(ev) {
    if (ev.altKey) {
        // delete shape
        if (shapeNum > 1) {
            parentElement.removeChild(ev.currentTarget);
            shapeNum--;
        }
    } else {
        // create shape
        shapeNum++;
        const shape = document.createElement('div');
        const text = document.createTextNode(shapeNum);
        shape.appendChild(text);
        shape.classList.add('box');
        parentElement.appendChild(shape);
        
        shape.style.top = `${ev.currentTarget.offsetTop + ev.currentTarget.offsetWidth}px`;
        shape.style.left = `${ev.currentTarget.offsetLeft + ev.currentTarget.offsetWidth}px`;
        addListeners(shape);
    }
}

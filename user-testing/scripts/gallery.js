const lightbox = GLightbox({ });

// function attachDraggable(){
//     let nodes = document.querySelectorAll('.draggable');

//     let pos = { top: 0, left: 0, x: 0, y: 0 };

//     const mouseDownHandler = function (e) {
//         const ele = e.target;

//         pos = {
//             // The current scroll
//             left: ele.scrollLeft,
//             top: ele.scrollTop,
//             // Get the current mouse position
//             x: e.clientX,
//             y: e.clientY,
//         };

//         ele.style.cursor = 'grabbing';
    
//         document.addEventListener('mousemove', mouseMoveHandler);
//         document.addEventListener('mouseup', mouseUpHandler);
//     };

//     const mouseMoveHandler = function (e) {
//         const ele = e.target;

//         // How far the mouse has been moved
//         const dx = e.clientX - pos.x;
//         const dy = e.clientY - pos.y;
    
//         // Scroll the element
//         ele.scrollTop = pos.top - dy;
//         ele.scrollLeft = pos.left - dx;
//     };

//     const mouseUpHandler = function (e) {
//         const ele = e.target;

//         document.removeEventListener('mousemove', mouseMoveHandler);
//         document.removeEventListener('mouseup', mouseUpHandler);
    
//         ele.style.cursor = 'grab';
//         ele.style.removeProperty('user-select');
//     };

//     nodes.forEach(node => node.addEventListener('mousedown', mouseDownHandler));
// }

// function boot(){
//     attachDraggable();
// }

// document.addEventListener('readystatechange', () => {
//     if (document.readyState == 'interactive'){
//         boot();
//     }
// })
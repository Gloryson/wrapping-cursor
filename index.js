let cursor = document.querySelector('.circle-cursor');
let wrappedElements = document.querySelectorAll('.wrapped-element');
let isInElement = false;

document.onmousemove = handleMouseMove;

wrappedElements.forEach(elem => {
  elem.addEventListener('mouseenter', enterCursor);
  elem.addEventListener('mouseleave', () => {
    isInElement = false;
  });
})

function handleMouseMove (event) {
  let eventDoc, doc, body;
  event = event || window.event;
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX = event.clientX +
      (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
      (doc && doc.clientLeft || body && body.clientLeft || 0);
    event.pageY = event.clientY +
      (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
      (doc && doc.clientTop  || body && body.clientTop  || 0 );
  }

  moveCursor(event.pageX, event.pageY);
}

function moveCursor (pX, pY) {
  if (!isInElement) {
    cursor.style.left = `${pX - 10}px`;
    cursor.style.top = `${pY - 10}px`;
    cursor.style.width = '2.5vmax';
    cursor.style.height = '2.5vmax';
    cursor.style.borderRadius = '50%';
  }
}

function enterCursor (event) {
  isInElement = true;
  let elem = event.srcElement;
  let diff = 12;
  cursor.style.left = `${elem.offsetLeft - diff}px`;
  cursor.style.top = `${elem.offsetTop - diff}px`;
  cursor.style.width = `${elem.offsetWidth + diff * 2}px`
  cursor.style.height = `${elem.offsetHeight + diff * 2}px`
  cursor.style.borderRadius = '20px';
}
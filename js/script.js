window.addEventListener('DOMContentLoaded', (event) => {
    let item;
    let x;
    let y;

    document.addEventListener('mousedown', (event) => {
      item = event.target.closest('.item');
      x = event.clientX;
      y = event.clientY;
    });

    document.addEventListener('mousemove', (event) => {
      if (!item) return;
      item.style.transform = `translate(${event.clientX - x}px, ${event.clientY - y}px)`;
    });

    document.addEventListener('mouseup', (event) => {
      item = null;
    });
})
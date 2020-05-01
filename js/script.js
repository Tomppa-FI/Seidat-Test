//Ensure DOM is fully loaded.

window.addEventListener('DOMContentLoaded', (event) => {

    const handleDragEnd = (event) => {
        const clientY = event.clientY;
        const clientX = event.clientX;
        let lowestFlexOrder;

        bookmarks.forEach(bookmark => {
            if (bookmark === event.target) return;
            
            //Determine which coordinate to check against depending on flex-direction.
            //Additionally, slightly increase X/Y of bookmark, so can be repositioned easier.
            const {x, y, width, height} = bookmark.getBoundingClientRect();
            const [clientCoordinate, bookmarkCoordinate] = window.matchMedia("(min-width: 768px)").matches ? [clientX, (x + (width/3))] : [clientY, (y + (height / 3))];

            //Set new flex-order if client coordinate is before the current bookmark.
            if (clientCoordinate < bookmarkCoordinate) {
                if (typeof lowestFlexOrder === "undefined" || lowestFlexOrder > parseInt(bookmark.style.order)) {
                    lowestFlexOrder = parseInt(bookmark.style.order);
                    console.log(lowestFlexOrder);
                }
                bookmark.style.order = parseInt(bookmark.style.order) + 1;
                //Allow for forward movement.
            } else if (clientCoordinate > bookmarkCoordinate) {
                if (typeof lowestFlexOrder === "undefined" || lowestFlexOrder < parseInt(bookmark.style.order)) {
                    lowestFlexOrder = parseInt(bookmark.style.order) + 1;
                }
            }
        })
        event.target.style.order = lowestFlexOrder;
    }

    //Select all bookmarks, deconstruct and iterate with map to apply flex-order.
    
    const bookmarkNodes = document.querySelectorAll(".item"); 
    const bookmarks = [...bookmarkNodes].map((elem, i) => {
        elem.addEventListener("dragend", handleDragEnd);
        elem.style.order = i;
        return elem;
    });

})    

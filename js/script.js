//Ensure DOM is fully loaded.

window.addEventListener('DOMContentLoaded', (event) => {

    const handleDragEnd = (event) => {
        const clientY = event.clientY;
        const clientX = event.clientX;
        let lowestFlexOrder;

        bookmarks.forEach(bookmark => {
            if (bookmark === event.target) return;
            
            //Determine which coordinate to check against depending on flex-direction.

            const {x, y} = bookmark.getBoundingClientRect();
            const [clientCoordinate, bookmarkCoordinate] = window.matchMedia("(min-width: 768px)").matches ? [clientX, x] : [clientY, y];

            //Set new flex-order if client coordinate is before the current bookmark.
            if (clientCoordinate < bookmarkCoordinate) {
                if (typeof lowestFlexOrder === "undefined" || lowestFlexOrder > parseInt(bookmark.style.order)) {
                    lowestFlexOrder = parseInt(bookmark.style.order);
                    console.log(lowestFlexOrder);
                }
                bookmark.style.order = parseInt(bookmark.style.order) + 1;
            }
        })
        event.target.style.order = lowestFlexOrder;
    }
    
    const bookmarkNodes = document.querySelectorAll(".item"); 
    const bookmarks = [...bookmarkNodes].map((elem, i) => {
        elem.addEventListener("dragend", handleDragEnd);
        elem.style.order = i;
        return elem;
    });



    //Select all bookmarks, deconstruct and iterate with map to apply flex-order.

})    

const viewport = document.getElementById("scroll-viewport");
const spacer = document.getElementById("total-height-spacer");
const items = document.getElementById("visible-items-container");
let totalViewportHeight = viewport.clientHeight;

let totalItems = 1000000;
let itemHeight = 60;
let visibleItems = (totalViewportHeight / itemHeight) + 5;

spacer.style.height = `${totalItems * itemHeight}px`;

viewport.addEventListener('scroll', function () {
    const scrollTop = viewport.scrollTop;

    const startIndex =  scrollTop / itemHeight;
    const endIndex = startIndex + visibleItems;

    const offsetY = startIndex * itemHeight;

    items.style.transform = `translateY(${offsetY}px)`;
    renderItems(startIndex, endIndex)
});

function renderItems(startIndex, endIndex) {
    let html = '';
    for (let i = startIndex; i < endIndex; i++) {
        html += `<div class="list-item">
                <div class="item-avatar">JS</div>
                <div class="item-content">
                    <div class="item-header">
                        <span class="item-title">Item #1234</span>
                        <span class="item-time">12:45 PM</span>
                    </div>
                    <p class="item-description">Database record processed successfully...</p>
                </div>
            </div>`;
    }   
    items.innerHTML = html;
}

renderItems(0, visibleItems);
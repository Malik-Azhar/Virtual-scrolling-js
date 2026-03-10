# Understanding Virtual Scrolling in JavaScript
When working with large datasets (thousands of rows), rendering everything in the DOM can make your application slow and heavy.
That’s where Virtual Scrolling comes in.
Instead of rendering the entire list, Virtual Scrolling only renders the items that are visible in the viewport. As the user scrolls, the visible items are updated dynamically.

## Problem without Virtual Scrolling
Imagine a list of 10,000 rows. If you render them normally: 

```html
    <div>
        <p>item 1</p>
        <p>item 2</p>
        <p>item 3</p>
        ....
        10000 DOM elements
    </div>
```
*Problems:*
    - Slow rendering
    - Heavy memory usage
    - Laggy scrolling
    - Poor browser performance

## Idea Behind Virtual Scrolling
Instead of rendering 10,000 items, we render only the items visible in the viewport.
| Total Items | Visible Items |
| ----------- | ------------- |
| 10,000      | 20            |

So the DOM contains 20 elements instead of 10,000.
When the user scrolls:
    - We replace the items with new ones.

## Vitual Scrolling Flow
Let's Assume
    Item height = 50px
    Total items = 10,000
    Container height = 500px

### Step 1 — Calculate Visible Items
    visibleItems = containerHeight / itemHeight
    visibleItems = 500 / 50
    visibleItems = 10
Add buffer items (for smooth scrolling)
    renderItems = 10 + 5 buffer
    renderItems = 15

### Step 2 — Create Scroll Container
```html
    <div class="container">
        <div class="spacer"></div>
        <div class="items"></div>
    </div>
```
Container is scrollable.
### Step 3 — Fake Full Height
We create fake height equal to the total list height.
    totalHeight = totalItems * itemHeight
    totalHeight = 10000 * 50
    totalHeight = 500000px
```js
    spacer.style.height = totalHeight + "px"
```
Now the browser thinks 10,000 items exist.
### Step 4 — Detect Scroll Position
```js
    container.addEventListener("scroll", () => {
        const scrollTop = container.scrollTop;
    });
```
Example: scrollTop = 1250px;

### Step 5 — Calculate Start Index
    startIndex = scrollTop / itemHeight
    startIndex = 1250 / 50
    startIndex = 25
So the first visible item is index 25.
### Step 6 — Calculate End Index
    endIndex = startIndex + visibleItems + buffer
    endIndex = 25 + 10 + 5
    endIndex = 40
Render: items 25 → 40
### Step 7 — Move Items Using Transform
Instead of placing them normally, we shift them.
    offsetY = startIndex * itemHeight
    offsetY = 25 * 50
    offsetY = 1250px
```js
    items.style.transform = `translateY(${offsetY}px)`
```
Now the items appear in the correct scroll position.
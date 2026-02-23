# FAQ - Job Application Tracker

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**getElementById:**
- Selects a single element by its `id` attribute
- Returns `null` if the element doesn't exist
- Most efficient for single element selection
- Example: `document.getElementById('myElement')`

**getElementsByClassName:**
- Returns a live HTMLCollection of all elements with the specified class name
- Returns an empty collection if no elements are found
- Collection updates automatically when DOM changes
- Must be accessed by index to work with individual elements
- Example: `document.getElementsByClassName('myClass')[0]`

**querySelector / querySelectorAll:**
- Uses CSS selectors for more flexible selection
- `querySelector()` returns the first matching element or `null`
- `querySelectorAll()` returns a static NodeList of all matching elements
- More powerful but slightly slower than getElementById
- Examples:
  - `document.querySelector('.myClass')` - first element with class
  - `document.querySelectorAll('div.container p')` - all paragraphs in divs with container class

**Key Differences:**
- `getElementById` is fastest for single ID selection
- `getElementsByClassName` returns live collections (updates automatically)
- `querySelector/querySelectorAll` are more flexible and work with complex CSS selectors
- In modern development, `querySelector/querySelectorAll` are preferred for their flexibility

---

## 2. How do you create and insert a new element into the DOM?

There are several methods to create and insert elements:

**Using createElement and appendChild:**
```javascript
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.className = 'container';
document.body.appendChild(newDiv);
```

**Using innerHTML (simpler but less flexible):**
```javascript
const container = document.getElementById('myContainer');
container.innerHTML += '<div class="item">New Item</div>';
```

**Using insertAdjacentHTML (efficient for inserting):**
```javascript
const element = document.getElementById('target');
element.insertAdjacentHTML('beforeend', '<p>New paragraph</p>');
// Positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
```

**Using insertBefore (for specific positioning):**
```javascript
const parent = document.getElementById('parent');
const newElement = document.createElement('li');
const referenceElement = parent.firstChild;
parent.insertBefore(newElement, referenceElement);
```

**Best Practices:**
- Use `createElement()` and `appendChild()` for building complex elements
- Use `insertAdjacentHTML()` for inserting HTML strings
- Avoid repeatedly modifying `innerHTML` as it can be inefficient
- Use `DocumentFragment` for adding multiple elements to improve performance

---

## 3. What is Event Bubbling? And how does it work?

**Event Bubbling** is a mechanism where an event triggered on a DOM element propagates (bubbles) up through its parent elements in the DOM tree.

**How it Works:**
1. An event is triggered on an element (e.g., a click on a button)
2. The event handler on that element executes first
3. Then the event "bubbles up" to the parent element
4. The parent's event handler executes
5. This continues up the DOM tree until it reaches the document root

**Example:**
```html
<div id="parent">
    <button id="child">Click me</button>
</div>

<script>
    document.getElementById('child').addEventListener('click', () => {
        console.log('Button clicked');
    });

    document.getElementById('parent').addEventListener('click', () => {
        console.log('Parent clicked - triggered by bubbling');
    });
</script>
```
When the button is clicked, both "Button clicked" and "Parent clicked" are logged.

**Stopping Bubbling:**
- Use `event.stopPropagation()` to prevent the event from bubbling up to parent elements
- This is useful when you only want specific elements to handle an event

**Events that Bubble:**
- Click events
- Keyboard events (keydown, keyup)
- Mouse events (mouseover, mouseout)
- Focus events don't bubble

---

## 4. What is Event Delegation in JavaScript? Why is it useful?

**Event Delegation** is a technique where instead of adding event listeners to individual elements, you add a single listener to a parent element and handle events from child elements using event bubbling.

**How it Works:**
```javascript
// Instead of this:
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteItem);
});

// Use this:
document.getElementById('parent').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        deleteItem(event.target);
    }
});
```

**Why is Event Delegation Useful?**

1. **Performance:** Single listener instead of multiple listeners saves memory and improves performance
2. **Dynamic Elements:** Works with elements added to the DOM after the page loads
3. **Simplified Code:** Cleaner, more maintainable code with centralized event handling
4. **Easier Updates:** No need to re-attach listeners when elements are added/removed

**Example:**
In our Job Application Tracker, when we add new job cards dynamically, event delegation ensures all buttons work without manually attaching listeners to each new card.

**Limitations:**
- Events that don't bubble (focus, load, scroll) cannot use event delegation
- Need to check the event target to know which element triggered the event

---

## 5. What is the difference between preventDefault() and stopPropagation() methods?

Both methods control event behavior, but they work differently:

**preventDefault():**
- Prevents the default action associated with an event
- The event still bubbles up to parent elements
- Does not stop other event listeners from executing
- Example: Prevents form submission, link navigation, etc.

```javascript
document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents form submission
    // Your custom logic here
});
```

**stopPropagation():**
- Prevents the event from bubbling up to parent elements
- Does not prevent the default action
- Other listeners on the same element still execute
- Example: Prevents event from reaching parent event listeners

```javascript
document.getElementById('child').addEventListener('click', (event) => {
    event.stopPropagation(); // Prevents bubbling to parent
    console.log('Child clicked, parent listener won\'t run');
});
```

**Comparison Table:**
| Method | Stops Bubbling | Prevents Default | Stops Other Listeners |
|--------|---|---|---|
| preventDefault() | No | Yes | No |
| stopPropagation() | Yes | No | No |
| stopImmediatePropagation() | Yes | No | Yes |

**Practical Example:**
```javascript
// In Job Tracker - Interview button
button.addEventListener('click', (event) => {
    event.preventDefault(); // If button was in a form
    event.stopPropagation(); // Prevent event from triggering parent listeners
    handleInterviewClick(jobId);
});
```

**When to Use:**
- Use `preventDefault()` when you want to override browser default behavior
- Use `stopPropagation()` when you want to prevent event bubbling to parents
- Use `stopImmediatePropagation()` to also prevent other listeners on the same element

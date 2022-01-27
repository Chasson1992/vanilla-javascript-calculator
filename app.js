

function setupHandlers () {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);
}

// Handler for keyboard event
function handleKeyPress(event) {
    event.preventDefault();

    if (event.key === 'Enter' || event.key === 'NumpadEnter' || event.key === '=') {
        compute();
        return;
    }

    if (event.key === 'Backspace') {
        // Remove last character
        computedValue = computedValue.slice(0, -1);
        render();
        return;
    }

    update(event.key);
}

// Handler for mouse event
function handleClick(event) {
    event.preventDefault();
    if (event.target.value === undefined) {
        return;
    }

    if (event.target.innerHTML === "Clear") {
        reset();
        return;
    }

    if (event.target.innerHTML === "=") {
        compute();
        return;
    }

    update(event.target.innerHTML);
}

// Now that we have handled each event, update the values
function update(inputValue) {

    if (!isNaN(Number.parseInt(inputValue))) {
        // If null, initialize or append to the end
        computedValue ? 
            computedValue += inputValue :
            computedValue = inputValue;
    } else {
        if (inputValue === '.') {
            computedValue ? 
                computedValue += inputValue :
                computedValue = inputValue;
        }
        // Make sure we have a current value 
        // before insert an operator
        if (computedValue !== null) {
            if (inputValue === '/') {
                currentOperator = '/';
                lastValue = computedValue;
                computedValue = null;
            }
            if (inputValue === '*') {
                currentOperator = '*';
                lastValue = computedValue;
                computedValue = null;
            }
            if (inputValue === '+') {
                currentOperator = '+';
                lastValue = computedValue;
                computedValue = null;
            }
            if (inputValue === '-') {
                currentOperator = '-';
                lastValue = computedValue;
                computedValue = null;
            }
            if (inputValue === '+/-') {
                if (computedValue.charAt(0) === '-') {
                    // Remove the negative sign
                    computedValue = computedValue.slice(1);
                } else {
                    computedValue = '-' + computedValue;
                }
            }
        }
    }

    render();
}

// Compute calculation
function compute() {

    let x;
    let y;

    x = Number.parseInt(computedValue);
    y = Number.parseInt(lastValue);

    // Sanity check
    if (!isNaN(x) && !isNaN(y)) {
        if (currentOperator === '/') {
            computedValue = y/x;
        } else if (currentOperator === '*') {
            computedValue = y*x;
        } else if (currentOperator === '-') {
            computedValue = y-x;
        } else if (currentOperator === '+') {
            computedValue = y+x;
        } 
    }

    currentOperator = null;

    render();
}

// Clear values
function reset() {

    computedValue = null;
    lastValue = null;
    currentOperator = null;

    render();
}

// Update DOM
function render() {
    document.getElementById('operator').innerHTML = currentOperator;
    document.getElementById('lastvalue').innerHTML = lastValue;
    document.getElementById('output').innerHTML = computedValue;
}

setupHandlers();

let computedValue = null;
let lastValue = null;
let currentOperator = null;



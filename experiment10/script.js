// Calculator State
let display = '0';
let memory = 0;
let isRadians = false;
let history = [];

// DOM Elements
const displayEl = document.getElementById('display');
const historyDisplayEl = document.getElementById('historyDisplay');
const memoryStatusEl = document.getElementById('memoryStatus');
const historyListEl = document.getElementById('historyList');

// Load history from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
    updateDisplay();
    updateMemoryStatus();
});

// Update display
function updateDisplay() {
    displayEl.value = display || '0';
}

// Update memory status
function updateMemoryStatus() {
    memoryStatusEl.textContent = `M: ${memory}`;
}

// Append number to display
function appendNumber(num) {
    if (display === '0' && num !== '.') {
        display = num;
    } else if (num === '.' && display.includes('.')) {
        return;
    } else {
        display += num;
    }
    updateDisplay();
    updateHistoryDisplay();
}

// Append operator
function appendOperator(op) {
    if (display === '' || display === '+' || display === '-' || display === '*' || display === '/') {
        return;
    }
    display += op;
    updateDisplay();
}

// Clear display
function clearDisplay() {
    display = '0';
    updateDisplay();
    historyDisplayEl.textContent = '';
}

// Delete last character
function deleteLastChar() {
    if (display.length > 1) {
        display = display.slice(0, -1);
    } else {
        display = '0';
    }
    updateDisplay();
}

// Toggle sign
function toggleSign() {
    if (display !== '0' && display !== '') {
        if (display.charAt(0) === '-') {
            display = display.slice(1);
        } else {
            display = '-' + display;
        }
        updateDisplay();
    }
}

// Calculate result
function calculate() {
    try {
        const result = Function('"use strict"; return (' + display + ')')();
        const expression = display + ' = ' + result;
        historyDisplayEl.textContent = expression;
        addToHistory(expression);
        display = String(result);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
        setTimeout(() => {
            display = '0';
            updateDisplay();
        }, 1500);
    }
}

// Trigonometric Functions
function calculateSin() {
    try {
        const value = parseFloat(display);
        const angle = isRadians ? value : (value * Math.PI / 180);
        const result = Math.sin(angle);
        const expression = `sin(${display}) = ${result}`;
        addToHistory(expression);
        display = String(Math.round(result * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateCos() {
    try {
        const value = parseFloat(display);
        const angle = isRadians ? value : (value * Math.PI / 180);
        const result = Math.cos(angle);
        const expression = `cos(${display}) = ${result}`;
        addToHistory(expression);
        display = String(Math.round(result * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateTan() {
    try {
        const value = parseFloat(display);
        const angle = isRadians ? value : (value * Math.PI / 180);
        const result = Math.tan(angle);
        const expression = `tan(${display}) = ${result}`;
        addToHistory(expression);
        display = String(Math.round(result * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateASin() {
    try {
        const value = parseFloat(display);
        if (value < -1 || value > 1) {
            displayEl.value = 'Error: Domain';
            setTimeout(() => {
                display = '0';
                updateDisplay();
            }, 1500);
            return;
        }
        const result = Math.asin(value);
        const finalResult = isRadians ? result : (result * 180 / Math.PI);
        const expression = `asin(${display}) = ${finalResult}`;
        addToHistory(expression);
        display = String(Math.round(finalResult * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateACos() {
    try {
        const value = parseFloat(display);
        if (value < -1 || value > 1) {
            displayEl.value = 'Error: Domain';
            setTimeout(() => {
                display = '0';
                updateDisplay();
            }, 1500);
            return;
        }
        const result = Math.acos(value);
        const finalResult = isRadians ? result : (result * 180 / Math.PI);
        const expression = `acos(${display}) = ${finalResult}`;
        addToHistory(expression);
        display = String(Math.round(finalResult * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateATan() {
    try {
        const value = parseFloat(display);
        const result = Math.atan(value);
        const finalResult = isRadians ? result : (result * 180 / Math.PI);
        const expression = `atan(${display}) = ${finalResult}`;
        addToHistory(expression);
        display = String(Math.round(finalResult * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

// Logarithmic Functions
function calculateLog() {
    try {
        const value = parseFloat(display);
        if (value <= 0) {
            displayEl.value = 'Error: Domain';
            setTimeout(() => {
                display = '0';
                updateDisplay();
            }, 1500);
            return;
        }
        const result = Math.log10(value);
        const expression = `log(${display}) = ${result}`;
        addToHistory(expression);
        display = String(Math.round(result * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateLn() {
    try {
        const value = parseFloat(display);
        if (value <= 0) {
            displayEl.value = 'Error: Domain';
            setTimeout(() => {
                display = '0';
                updateDisplay();
            }, 1500);
            return;
        }
        const result = Math.log(value);
        const expression = `ln(${display}) = ${result}`;
        addToHistory(expression);
        display = String(Math.round(result * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

// Power and Root Functions
function calculateSqrt() {
    try {
        const value = parseFloat(display);
        if (value < 0) {
            displayEl.value = 'Error: Domain';
            setTimeout(() => {
                display = '0';
                updateDisplay();
            }, 1500);
            return;
        }
        const result = Math.sqrt(value);
        const expression = `√(${display}) = ${result}`;
        addToHistory(expression);
        display = String(result);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateSquare() {
    try {
        const value = parseFloat(display);
        const result = value * value;
        const expression = `${display}² = ${result}`;
        addToHistory(expression);
        display = String(result);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateCube() {
    try {
        const value = parseFloat(display);
        const result = value * value * value;
        const expression = `${display}³ = ${result}`;
        addToHistory(expression);
        display = String(result);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculatePower() {
    appendNumber('^');
}

function calculateFactorial() {
    try {
        const value = parseInt(display);
        if (value < 0) {
            displayEl.value = 'Error: Domain';
            setTimeout(() => {
                display = '0';
                updateDisplay();
            }, 1500);
            return;
        }
        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }
        const expression = `${display}! = ${result}`;
        addToHistory(expression);
        display = String(result);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateReciprocal() {
    try {
        const value = parseFloat(display);
        if (value === 0) {
            displayEl.value = 'Error: Div by 0';
            setTimeout(() => {
                display = '0';
                updateDisplay();
            }, 1500);
            return;
        }
        const result = 1 / value;
        const expression = `1/${display} = ${result}`;
        addToHistory(expression);
        display = String(Math.round(result * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

// Constants
function appendPi() {
    display = String(Math.PI);
    updateDisplay();
}

function appendE() {
    display = String(Math.E);
    updateDisplay();
}

function calculateExp() {
    try {
        const value = parseFloat(display);
        const result = Math.exp(value);
        const expression = `e^${display} = ${result}`;
        addToHistory(expression);
        display = String(Math.round(result * 10000000) / 10000000);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

// Other Functions
function calculatePercent() {
    try {
        const value = parseFloat(display);
        const result = value / 100;
        const expression = `${display}% = ${result}`;
        addToHistory(expression);
        display = String(result);
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function calculateMod() {
    appendNumber('%');
}

// Memory Functions
function memoryAdd() {
    try {
        const value = parseFloat(display) || 0;
        memory += value;
        updateMemoryStatus();
        display = '0';
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function memorySubtract() {
    try {
        const value = parseFloat(display) || 0;
        memory -= value;
        updateMemoryStatus();
        display = '0';
        updateDisplay();
    } catch (error) {
        displayEl.value = 'Error';
    }
}

function memoryRecall() {
    display = String(memory);
    updateDisplay();
}

function memoryClear() {
    memory = 0;
    updateMemoryStatus();
}

// Toggle Degree/Radian
function toggleDegRad() {
    isRadians = !isRadians;
    document.getElementById('degRadBtn').textContent = isRadians ? 'RAD' : 'DEG';
}

// Toggle Calculator Mode
function toggleMode(mode) {
    const basicButtons = document.getElementById('basicButtons');
    const scientificButtons = document.getElementById('scientificButtons');
    const basicBtn = document.getElementById('basicBtn');
    const scientificBtn = document.getElementById('scientificBtn');

    if (mode === 'basic') {
        basicButtons.style.display = 'grid';
        scientificButtons.style.display = 'none';
        basicBtn.classList.add('active');
        scientificBtn.classList.remove('active');
    } else {
        basicButtons.style.display = 'none';
        scientificButtons.style.display = 'grid';
        basicBtn.classList.remove('active');
        scientificBtn.classList.add('active');
    }
}

// History Management
function addToHistory(expression) {
    history.unshift(expression);
    if (history.length > 10) {
        history.pop();
    }
    localStorage.setItem('calcHistory', JSON.stringify(history));
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyListEl.innerHTML = '';
    history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = item;
        historyItem.onclick = () => {
            const result = item.split(' = ')[1];
            if (result) {
                display = result;
                updateDisplay();
            }
        };
        historyListEl.appendChild(historyItem);
    });
}

function clearHistory() {
    if (confirm('Clear all history?')) {
        history = [];
        localStorage.removeItem('calcHistory');
        updateHistoryDisplay();
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key.match(/[0-9]/)) appendNumber(event.key);
    if (event.key === '.') appendNumber('.');
    if (event.key === '+') appendOperator('+');
    if (event.key === '-') appendOperator('-');
    if (event.key === '*') appendOperator('*');
    if (event.key === '/') {
        event.preventDefault();
        appendOperator('/');
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    if (event.key === 'Backspace') {
        event.preventDefault();
        deleteLastChar();
    }
    if (event.key === 'Escape') {
        clearDisplay();
    }
});

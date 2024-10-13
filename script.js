const display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = '';
let isEqualPressed = false;

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.id === 'clear') {
            currentInput = '0';
            operator = null;
            previousInput = '';
            isEqualPressed = false;
        } else if (button.id === 'backspace') {
            currentInput = currentInput.slice(0, -1) || '0';
        } else if (['+', '-', '*', '/'].includes(button.id)) {
            if (previousInput !== '' && !isEqualPressed) {
                currentInput = calculate(previousInput, currentInput, operator);
                display.textContent = currentInput;
            }
            operator = button.id;
            previousInput = currentInput;
            currentInput = '';
            isEqualPressed = false;
        } else if (button.id === 'equal') {
            if (operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                operator = null;
                previousInput = '';
                isEqualPressed = true;
            }
        } else if (button.id === '(' || button.id === ')') {
            currentInput += value;
        } else if (value === '.' && !currentInput.includes('.')) {
            currentInput += '.';
        } else {
            currentInput = currentInput === '0' ? value : currentInput + value;
        }

        display.textContent = currentInput;
    });
});

// دالة لحساب العمليات بشكل آمن
function calculate(first, second, operator) {
    const firstNum = parseFloat(first);
    const secondNum = parseFloat(second);
    switch (operator) {
        case '+':
            return (firstNum + secondNum).toString();
        case '-':
            return (firstNum - secondNum).toString();
        case '*':
            return (firstNum * secondNum).toString();
        case '/':
            return secondNum !== 0 ? (firstNum / secondNum).toString() : 'Error';
        default:
            return second;
    }
}

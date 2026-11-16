
const splashScreen = document.getElementById('splashScreen');

if (splashScreen) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const splashDuration = reducedMotion ? 100 : 1000;

    window.setTimeout(() => {
        splashScreen.classList.add('is-hidden');
        window.setTimeout(() => splashScreen.remove(), 400);
    }, splashDuration);
}

function calculate(operator) {
    const firstNumberInput = document.getElementById('firstNumber');
    const secondNumberInput = document.getElementById('secondNumber');
    const resultValue = document.getElementById('resultValue');
    const resultExpression = document.getElementById('resultExpression');
    const resultPanel = document.getElementById('resultPanel');

    const showError = (message) => {
        resultExpression.textContent = message;
        resultExpression.setAttribute('role', 'alert');
        resultValue.textContent = '—';
        resultPanel.classList.add('is-error');
    };

    if (firstNumberInput.value === '' || secondNumberInput.value === '') {
        showError('Enter both numbers first.');
        return;
    }

    const firstNumber = parseFloat(firstNumberInput.value);
    const secondNumber = parseFloat(secondNumberInput.value);
    let result;

    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            if (secondNumber === 0) {
                showError('Cannot divide by zero.');
                return;
            }
            result = firstNumber / secondNumber;
            break;
        default:
            return;
    }

    if (!Number.isFinite(result)) {
        showError('The result is too large to calculate.');
        return;
    }

    const symbol = { '+': '+', '-': '−', '*': '×', '/': '÷' }[operator];
    resultExpression.textContent = `${firstNumberInput.value} ${symbol} ${secondNumberInput.value}`;
    resultExpression.removeAttribute('role');
    resultValue.textContent = String(result);
    resultPanel.classList.remove('is-error');

   
    firstNumberInput.value = result;
    secondNumberInput.value = '';
    secondNumberInput.focus();
}

function resetCalculator() {
    document.getElementById('firstNumber').value = '';
    document.getElementById('secondNumber').value = '';
    document.getElementById('resultExpression').textContent = '';
    document.getElementById('resultExpression').removeAttribute('role');
    document.getElementById('resultValue').textContent = '—';
    document.getElementById('resultPanel').classList.remove('is-error');
    document.getElementById('firstNumber').focus();
}

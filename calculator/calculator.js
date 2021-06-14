let operator;
let operatorState;
let num1;
let num2;

// CSS Event Functions
function themeSelection(){
    let selection;
    const options = document.getElementsByName('themes');
    for (let option of options){
        if (option.checked){
            selection = option.value;
            break;
        }
    }
    moveToggle(selection);
    chooseTheme(selection);
}

function moveToggle(selection){
    const divThemes = document.querySelector('#theme-selection');    

    switch(selection){
        case 'classic':
            divThemes.className = 'theme-switch-toggle selected-option1';
            break;
        case 'light':
            divThemes.className = 'theme-switch-toggle selected-option2';
            break;
        case 'dark':
            divThemes.className = 'theme-switch-toggle selected-option3';
            break;
    }
}

function chooseTheme(selection){
    switch(selection){
        case 'classic':
            classicTheme();
            break;
        case 'light':
            lightTheme();
            break;
        case 'dark':
            darkTheme();
            break;
    }
}

function lightTheme(){
    document.querySelector('body').className = 'theme-light';
}

function darkTheme(){
    document.querySelector('body').className = 'theme-dark';
}

function classicTheme(){
    document.querySelector('body').className = 'theme-classic';
}

/// Calculator functions ///

function handleButtonClick(value){
    console.log(value);

    const operators = ['x', '/', '+', '-'];
    let digitsOnScreen = document.getElementById('screen').innerHTML;
    
    if (Number.isInteger(parseInt(value)) === true){
        if (operatorState){
            operatorState = false;
            document.getElementById("decimalSeparator").classList.remove('dot-disabled');
            clearScreen();
        }
        
        showOnScreen(value);
    }

    if (operators.includes(value)){
        if (!operator){
            num1 = digitsOnScreen;
        } else if(num1) {
            num2 = digitsOnScreen
        } else {
            const result = calculateResult(operator, num1, num2);          
            num1 = String(result);
            num2 = undefined;  
        }

        operator = value;
        operatorState = true; 
    }    
  
    switch(value){ 
        case 'NUMBER':
            return;
        case 'OPERATOR':
            return;
        case 'RESET':
            clearScreen();
            operator = num1 = num2 = undefined;
            return;
        case 'DEL':
            deletevalue();
            return;
        case '=':
            num2 = document.getElementById('screen').innerHTML;
            result = calculateResult(operator, num1, num2);
            num1 = num2 = operator = undefined;
            operatorState = false; 
            document.getElementById("decimalSeparator").classList.remove('dot-disabled');  
            return;
        case '.':
            showOnScreen(value);
            document.getElementById("decimalSeparator").className += ' dot-disabled';
            return;
    }     

    return console.log(value);
}

function showOnScreen(value){
    document.getElementById('screen').innerHTML += value;
}

function calculateResult(operator, savedNum, screenNum){
    if(operator === '/' && parseInt(screenNum) === 0){
        clearScreen();
        let text = 'Infinity!';
        showOnScreen(text);
        setTimeout( () => { clearScreen();}, 1000);
        return;
    }

    let num1 = parseToNum(savedNum);
    let num2 = parseToNum(screenNum);
    let result = 0;

    switch(operator){
        case '/':
            result = divide(num1,num2);
            break;
        case 'x':
            result = multiply(num1,num2);
            break;
        case '+':
            result = sum(num1,num2);
            break;
        case '-':
            result = subtract(num1,num2);
            break;
    }
    if (result.toString().length > 10){
        console.log('long number');
        result = result.toFixed(9);
    }
    document.getElementById('screen').innerHTML = result;
    return result;
}

function parseToNum(str){
    if(!str) {
        return 0;
    } 

    if (str.includes('.')){ 
        return parseFloat(str);
    } 

    return parseInt(str);
}

function sum(num1,num2){
    return num1+num2;
}

function subtract(num1,num2){
    return num1-num2;
}

function multiply(num1,num2){
    return num1*num2;
}

function divide(num1,num2){
    return num1/num2;
}

function clearScreen(){
    if (operatorState){
        document.getElementById("decimalSeparator").classList.remove('dot-disabled');    
    }
    document.getElementById('screen').innerHTML = '';
}

function deletevalue(){
    let digits = document.getElementById('screen').innerHTML;
    if (digits[digits.length-1] === '.'){
        document.getElementById("decimalSeparator").classList.remove('dot-disabled');    
    }
    digits = digits.slice(0,-1);
    clearScreen();
    showOnScreen(digits);
}



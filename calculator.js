let operator;
let operatorState;
let num1;
let num2;
let digitsOnScreen = document.getElementById("screen");
let btnDecSeparator = document.getElementById("decimalSeparator");


// CSS Event Functions for Theme Selection
function themeSelection(){

    const selection = document.querySelector("input[name='themes']:checked");
    moveToggle(selection.value);
    chooseTheme(selection.value);
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
    let valueType = getTypeOfValue(value);  

    try{
        switch(valueType){ 
            case 'NUMBER':
                handlesNumber(value);
                return;
            case 'OPERATOR':
                handlesOperator(value);
                return;
            case 'RESET':
                handlesReset();
                return;
            case 'DEL':
                handlesDelete();
                return;
            case '=':
                handlesEquals();
                return;
            case '.':
                handlesDecSeparator(value);
                return;
        } 
    }catch(err){
        console.log(err);
        if (err === 403){
            clearScreen();
            handlesReset();
            let text = 'Infinity!';
            replaceOnScreen(text);
            setTimeout( () => { clearScreen();}, 1000);
            return;
        } 
    }     
}

function getTypeOfValue(value){
    const operators = ['x', '/', '+', '-'];        

    if (Number.isInteger(parseInt(value)) === true){
        if (digitsOnScreen.innerHTML.length > 12 && !operator){
            console.log("Max digits reached")
            return;
        } else {
        return 'NUMBER';
        }
    } else if (operators.includes(value)){
        return 'OPERATOR'
    } else {
        return value;
    }
}

function handlesNumber(value){
    if (operatorState){
        operatorState = false;
        btnDecSeparator.classList.remove('dot-disabled');
        clearScreen();
    }        
    addToScreen(value);
}

function handlesOperator(value){

    if (!operator){
        num1 = digitsOnScreen.innerHTML;
    }else if(num1 && !operatorState) {
        num2 = digitsOnScreen.innerHTML;
    }
    if (operator && num1 && num2){
        num1 = parseToNum(num1);
        num2 = parseToNum(num2);
        const result = calculateResult(operator, num1, num2);
        handlesReset();
        replaceOnScreen(result);
        console.log(result);          
        num1 = String(result);
    }
    operator = value;
    operatorState = true; 
}

function handlesReset(){
    clearScreen();
    num1 = num2 = operator = undefined;
    operatorState = false; 
    btnDecSeparator.classList.remove('dot-disabled');
}

function handlesDelete(){
    let digits = digitsOnScreen.innerHTML;

    if (digits[digits.length-1] === '.'){
        document.getElementById("decimalSeparator").classList.remove('dot-disabled');    
    } else if (digits[digits.length-2] === '-'){
        digits = digits.slice(0,-2);
    } else {
        digits = digits.slice(0,-1);
    }
    
    clearScreen();
    replaceOnScreen(digits);
}

function handlesEquals(){
    num2 = digitsOnScreen.innerHTML;
    num1 = parseToNum(num1);
    num2 = parseToNum(num2); 
    const result = calculateResult(operator, num1, num2);
    handlesReset();
    replaceOnScreen(result);
    console.log(result);
}

function handlesDecSeparator(value){
    addToScreen(value,'add');
    btnDecSeparator.className += ' dot-disabled';
}

function addToScreen(value){
        digitsOnScreen.innerHTML += value; 
}

function replaceOnScreen(value){
    digitsOnScreen.innerHTML = value;
}

function calculateResult(operator, num1, num2){
    if(operator === '/' && num2 === 0){
        throw 403        
    }

    let result = 0;

    switch(operator){
        case '/':
            result = divide(num1, num2);
            break;
        case 'x':
            result = multiply(num1, num2);
            break;
        case '+':
            console.log(`${num1} + ${num2}`);
            result = sum(num1, num2);
            console.log(result);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
    }  
    
    if (result.toString().includes('.') && result.toString().length > 12){
        console.log(`long number ${result}`);
        result = handlesLongDecimals(result);        
    } 

    return result;
}

function handlesLongDecimals(result){
    return result.toFixed(12);
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
    digitsOnScreen.innerHTML = '';
}

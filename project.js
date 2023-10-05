//steps
//1. deposit money
//2. number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if user won
//6. give winnings
//7. play again

const promt = require("prompt-sync")(); //import statement, extra parentheses gives you access to a function

//STEP ONE
const deposit = () => {
    while (true) {
        const depositAmount = promt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        //check validity of number, the two bars stand for OR
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

//STEP TWO
const getNumberOfLines = () => {
    while (true) {
        const lines = promt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        //check validity of number, the two bars stand for OR
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};

//STEP THREE
const getBet = (balance, numberOfLines) => {
    while (true) {
        const bet = promt("Enter the bet per line: ");
        const betAmount = parseFloat(bet);

        //check validity of number, the two bars stand for OR
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / numberOfLines) {
            console.log("Invalid bet Amount, try again.");
        } else {
            return betAmount;
        }
    }
};

let balance = deposit(); //let makes it variable value //starting balance is the amount deposited
const numberOfLines = getNumberOfLines(); //const makes it a constant value
const bet = getBet(balance, numberOfLines);



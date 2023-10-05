//steps
//1. deposit money
//2. number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if user won
//6. give winnings
//7. play again

//STEP ONE
const promt = require("prompt-sync")(); //import statement, extra parentheses gives you access to a function

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

const depositAmount = deposit();
console.log(depositAmount);
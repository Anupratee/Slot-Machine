
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
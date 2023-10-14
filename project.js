//steps
//1. deposit money
//2. number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if user won
//6. give winnings
//7. play again

const promt = require("prompt-sync")(); //import statement, extra parentheses gives you access to a function

//global variables in caps
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

//STEP ONE: DEPOSIT AMOUNT
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

//STEP TWO: GET NUMBER OF LINES TO BET ON
const getNumberOfLines = () => {
    while (true) {
        const lines = promt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        //check validity of number, the two bars stand for OR
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > ROWS) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};

//STEP THREE: GET THE BET AMOUNT
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

//STEP FOUR: SPIN THE SLOT MACHINE
const spin = () => {
    const symbols = []; //an array is a reference data type
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols]; //spreading operator
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);    
        }
    }

    return reels;
};

//STEP FIVE: CHECK WINNINGS
const transpose = (reels) => {
    const rows = [];
    
    for (let i = 0; i <ROWS; i ++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != rows.lenght - 1) {
                rowString += " | ";
            }
        } 
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];

        }
    }
    return winnings;
};

//STEP SIX & SEVEN: GIVE WINNINGS AND ASK IF THEY WANT TO PLAY AGAIN
const game = () => {
    let balance = deposit(); //let makes it variable value //starting balance is the amount deposited

    while (true) {
        console.log("You have a balance of ₹" + balance);
        const numberOfLines = getNumberOfLines(); //const makes it a constant value
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, ₹" + winnings.toString());
        console.log("You have a balance of ₹" + balance);
        if (balance <= 0) {
            console.log("Insufficient balance");
            break;
        } 

        const playAgain = promt("Do you want to play again (y/n)");
        if (playAgain != "y") {
            break;
        }
    };
};

game();

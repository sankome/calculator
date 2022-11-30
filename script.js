const screen = document.querySelector(".screen");
const buttons = document.querySelector(".buttons");
const operators = document.querySelectorAll(".buttons__operators button");

let current = "";
let previous = "";
let operation = null;
let clearOnNextNumber = false;

const EQU = "=";
const ADD = "+";
const SUB = "-";
const MUL = "*";
const DIV = "/";
const DOT = ".";

buttons.addEventListener("click", event => {
	
	// check value of clicked thing
	let value = event.target.dataset.value;
	
	// return if value doesn't exists (ie not a button)
	if (!value) return;
	
	if (Number.isNaN(+value) && value !== DOT) {
		// if button is not a number or dot
		
		// convert dot to zero since +"." is NaN
		if (current === DOT) current = "0";
		if (previous === DOT) current = "0";
		
		// perform previous operation
		switch (operation) {
			case ADD:
				current = String(+previous + +current);
				break;
			case SUB:
				current = String(+previous - +current);
				break;
			case MUL:
				current = String(+previous * +current);
				break;
			case DIV:
				current = String(+previous / +current);
				break;
		}
		
		// store current operation for later
		operation = value;
		
		// next number clears current number
		clearOnNextNumber = true;
		
		// change colour of pressed operator
		for (let i = 0; i < operators.length; i++) {
			console.log(operators[i]);
			if (operators[i].dataset.value === value) operators[i].classList.add("active");
			else operators[i].classList.remove("active");
		}
		
	} else {
		// if button is a number or a dot
		
		// if operation was pressed clear current number
		if (clearOnNextNumber) {
			clearOnNextNumber = false;
			previous = current;
			current = "";
		}
		
		// add number/dot to current
		current += value;
	}
	
	screen.textContent = current;
});
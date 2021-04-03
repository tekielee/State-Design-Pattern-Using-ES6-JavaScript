class YearSetupState {
	constructor(clockSetup) {
		this.clockSetup = clockSetup;
		this.year = new Date().getFullYear();
	}
	
	previousValue() {
		this.year = this.year - 1
		return this.year;
	}
	
	nextValue() {
		this.year = this.year + 1;
		return this.year;
	}
	
	selectValue() {
		return this.clockSetup.setState(this.clockSetup.getMonthSetupState());
	}
	
	getInstructions() {
		return 'Please set the year...';
	}
	
	getSelectedValue() {
		return this.year;
	}	
}

class MonthSetupState {
	constructor(clockSetup) {
		this.clockSetup = clockSetup;
		this.month = new Date().getMonth();
	}
	
	previousValue() {
		this.month = this.month - 1;
		return this.month;
	}
	
	nextValue() {
		this.month = this.month + 1;
		return this.month;
	}
	
	selectValue() {
		return this.clockSetup.setState(this.clockSetup.getDaySetupState());
	}
	
	getInstructions() {
		return 'Please set the month...';
	}
	
	getSelectedValue() {
		return this.month;
	}	
}

class DaySetupState {
	constructor(clockSetup) {
		this.clockSetup = clockSetup;
		this.day = new Date().getDay();
	}
	
	previousValue() {
		this.day = this.day - 1;
		return this.day;
	}
	
	nextValue() {
		this.day = this.day + 1;
		return this.day;
	}
	
	selectValue() {
		return this.clockSetup.setState(this.clockSetup.getHourSetupState());
	}
	
	getInstructions() {
		return 'Please set the day...';
	}
	
	getSelectedValue() {
		return this.day;
	}	
}

class HourSetupState {
	constructor(clockSetup) {
		this.clockSetup = clockSetup;
		this.hour = new Date().getHours();
	}
	
	previousValue() {
		this.hour = this.hour - 1;
		return this.hour;
	}
	
	nextValue() {
		this.hour = this.hour + 1;
		return this.hour;
	}
	
	selectValue() {
		return this.clockSetup.setState(this.clockSetup.getMinuteSetupState());
	}
	
	getInstructions() {
		return 'Please set the hour...';
	}
	
	getSelectedValue() {
		return this.hour;
	}	
}

class MinuteSetupState {
	constructor(clockSetup) {
		this.clockSetup = clockSetup;
		this.minute = new Date().getMinutes();
	}
	
	previousValue() {
		this.minute = this.minute - 1;
		return this.minute;
	}
	
	nextValue() {
		this.minute = this.minute + 1;
		return this.minute;
	}
	
	selectValue() {
		return this.clockSetup.setState(this.clockSetup.getFinishedSetupState());
	}
	
	getInstructions() {
		return 'Please set the minute...';
	}
	
	getSelectedValue() {
		return this.minute;
	}	
}

class FinishedSetupState {
	constructor(clockSetup) {
		this.clockSetup = clockSetup;
	}
	
	previousValue() {
		// No op
	}
	
	nextValue() {
		// No op
	}
	
	selectValue() {
		// No op
	}
	
	getInstructions() {
		return 'Please knob to view selected date...';
	}
	
	getSelectedValue() {
		// No op
	}	
}

class ClockSetup {
	constructor() {
		this.yearState = new YearSetupState(this);
		this.monthState = new MonthSetupState(this);
		this.dayState = new DaySetupState(this);
		this.hourState = new HourSetupState(this);
		this.minuteState = new MinuteSetupState(this);
		this.finishedState = new FinishedSetupState(this);
		this.currentState;
		
		this.setState(this.yearState);
	}
	
	setState(state) {
		this.currentState = state;
	}
	
	rotateKnobLeft() {
		return this.currentState.previousValue();
	}
	
	rotateKnobRight() {
		return this.currentState.nextValue();
	}
	
	pushKnob() {
		return this.currentState.selectValue();
	}
	
	getYearSetupState() {
		return this.yearState;
	}
	
	getMonthSetupState() {
		return this.monthState;
	}
	
	getDaySetupState() {
		return this.dayState;
	}
	
	getHourSetupState() {
		return this.hourState;
	}
	
	getMinuteSetupState() {
		return this.minuteState;
	}
	
	getFinishedSetupState() {
		return this.finishedState;
	}
	
	getSelectedDate() {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		return (this.yearState.getSelectedValue() + ' ' + months[this.monthState.getSelectedValue()] + ' ' + days[this.dayState.getSelectedValue()] + ' ' + this.hourState.getSelectedValue() + ':' + this.minuteState.getSelectedValue());
	}
}

const clockSetup = new ClockSetup();
// Setup starts in 'year' state
clockSetup.rotateKnobRight();
//console.log(clockSetup.rotateKnobRight());
clockSetup.pushKnob(); // 1 year on
//console.log(clockSetup.pushKnob());
clockSetup.rotateKnobRight();
clockSetup.rotateKnobRight();
clockSetup.pushKnob(); // 2 months on

clockSetup.rotateKnobRight();
clockSetup.rotateKnobRight();
clockSetup.rotateKnobRight();
clockSetup.pushKnob(); // 3 days on

clockSetup.rotateKnobLeft();
clockSetup.rotateKnobLeft();
clockSetup.pushKnob(); // 2 hours previous on

clockSetup.rotateKnobRight();
clockSetup.pushKnob(); // 1 minute on

clockSetup.pushKnob(); // finished state

console.log(clockSetup.getSelectedDate());
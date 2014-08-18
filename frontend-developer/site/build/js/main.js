// Create the dates and select ids
var startTime  = new Date(),
	daysElem   = document.getElementById('days'),
	hourElem   = document.getElementById('hours'),
	minuteElem = document.getElementById('minutes'),
	secondElem = document.getElementById('seconds');

// Set up expiry time (search for the last of month)
var expiryTime = new Date(startTime.getFullYear(), startTime.getMonth() + 1, 0);

// Define variables for calc
var _second = 1000,
	_minute = _second * 60,
	_hour   = _minute * 60,
	_day    = _hour * 24;

// Count the days
var diff            = expiryTime - startTime,
	amountOfDays    = Math.floor(diff / _day),
	amountOfHours   = Math.floor((diff % _day) / _hour),
	amountOfMinutes = Math.floor((diff % _hour) / _minute),
	amountOfSeconds = Math.floor((diff % _minute) / _second);


// Set up the countdown timer for display

// Set up the days
if( amountOfDays > 0 )
	daysElem.innerHTML = (amountOfDays < 10) ? '0' + amountOfDays : amountOfDays;
else
	daysElem.innerHTML = '00';

// Set up the hours
if( amountOfHours > 0 )
	hourElem.innerHTML = (amountOfHours < 10) ? '0' + amountOfHours : amountOfHours;
else
	hourElem.innerHTML = '00';

// Set up the minutes
if( amountOfMinutes > 0 )
	minuteElem.innerHTML = ( amountOfMinutes < 10 ) ? '0' + amountOfMinutes : amountOfMinutes;
else
	minuteElem.innerHTML = '00';

// // Set up the seconds
if( amountOfSeconds > 0 )
	secondElem.innerHTML = (amountOfSeconds < 10) ? '0' + amountOfSeconds : amountOfSeconds;
else
	secondElem.innerHTML = '00';


function countDown() {
	var dateNow = new Date();

	if( expiryTime > dateNow ) {

		// References to current countdown values
		var days    = parseInt(daysElem.innertHTML),
			hours   = parseInt(hourElem.innerHTML),
			minutes = parseInt(minuteElem.innerHTML),
			seconds = parseInt(secondElem.innerHTML);

		// Update the hour if necessary
		if( minutes == 0 && seconds == 0) {
			--hours;
			hourElem.innerHTML = ( hours < 10 ) ? '0' + (hours) : (hours);
			minuteElem.innerHTML = '59';
			secondElem.innerHTML = '59';
			return;
		}

		// Update the minute if necessary
		if( seconds == 0 ) {

			if( minutes > 0 ) {
				--minutes;
				minuteElem.innerHTML = ( minutes > 10 ) ? minutes : '0' + minutes;
			}

			else {
				minuteElem.innerHTML = '59';
			}

			return secondElem.innerHTML = '59';

		}

		else {
			--seconds;
			secondElem.innerHTML = ( seconds < 10 ) ? '0' + seconds : seconds;
		}
	}

	else {
		// Reset the seconds
		secondElem.innerHTML = '00';

		// Clear interval
		clearInterval(countDownInterval);
	}
}

window.onload = function() {
	// Begin the countdown!
	countDownInterval = setInterval( countDown, 1000 );
}

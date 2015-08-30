//script.js


var clicked = false;
$(document).ready(function() {

	$('.prompt').click(function(){
	if (!clicked) {
		$('.prompt').css({'background-color':'gray','cursor':'default','opacity':'.4'});

		$('.response').css('visibility','visible');

		$('.inputField').prop( 'disabled', true );
		$('.inputField').css( 'opacity', '.4' );

		clicked = true;

		//call function to send 
		var entry = document.getElementById('phoneInput').value;
		console.log(entry);

		getPhoneNumber(entry);

		};
	});

	$('.refresh').click(function() {
		refresh();
	});

	$('.prompt').hover(function() {
			if (!clicked) {
				$('.prompt').css('opacity','1');
			}
		},
		function() {
				$('.prompt').css('opacity','.4');

	});

	$('.refresh').hover(function(){
		$('.refresh').css('opacity','1');
		$('.refreshText').css('visibility','visible');
	},
	function(){
		$('.refresh').css('opacity','.4');
		$('.refreshText').css('visibility','hidden');
	});
});

var refresh = function() {
	$('.refresh').css('opacity','.4');
	$('.refreshText').css('visibility','hidden');
	$('.response').css('visibility','hidden');
	$('.inputField').prop( 'disabled', false );
	$('.inputField').css( 'opacity', '1' );
	$('.inputField').val("");

	$('.prompt').css({'background-color':'#F37B86','cursor':'pointer'});

	clicked = false;
}

var sendSMS = function(entry) {

	var url = 'https://attratwilioproject.herokuapp.com/sendSMS?number='+entry;
	console.log(url);
	httpGetAsync(url, null);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //
            console.log("success!");
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


var getPhoneNumber = function(entry) {
	var string = entry;

	var stringLength = string.length;
	//console.log(stringLength);

	var numberString = "";

	for (i=0;i<stringLength;i++) {
	    var x = parseInt(string[i]);
	    if (!isNaN(x)) {
	        numberString = numberString + x;
	        //console.log(numberString);
 	   }
	}

	var lengthOfNumber = numberString.length;
    if (entry.length >17 || lengthOfNumber < 7) {
    	refresh();
	    confirm("Please enter a valid phone number.");
	    return;
	};
	
	
    if (lengthOfNumber < 10) {
    	//prompt area code entry
    	refresh();
    	confirm("Please enter an area code for your number.");
    	return;
    }

	numberString = numberString.replace("+","");

	if (lengthOfNumber === 10) {
		var phoneNumber = "+1"+numberString;
		sendSMS(phoneNumber);
	}
	else if (lengthOfNumber === 11) {
		var phoneNumber = "+"+numberString;
		sendSMS(phoneNumber);
	}

	return phoneNumber;
}




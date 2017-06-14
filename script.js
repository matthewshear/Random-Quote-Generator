$(document).ready( function() {

	// *** INIT GLOBAL VARIABLES *** //

	// quote text transition speed (milliseconds)
	var text_transition_speed = 2000;

	// background transition speed (milliseconds)
	var background_transition_speed = 1500;

	var console_debug = true;

	// generate quotes already viewed array (will contain an array of quote index values that have already been displayed)
	var quotesViewed = [];

	// array of quotes to display
	var quotes = [
		{
			quote: "You cannot depend on your eyes when your imagination is out of focus.",
			source: "Mark Twain",
			citation: "A Connecticut Yankee in King Arthur's Court",
			year: "1889",
			tags: [ "fiction", "old", "politics" ]
		},
		{
			quote: "Even the fear of death is nothing compared to the fear of not having lived authentically and fully.",
			source: "Frances Moore Lappe",
			citation: "O Magazine",
			year: "2004",
			tags: [ 'non-ficiton', 'web', 'development' ]
		},
		{
			quote: "Eternity's a terrible thought. I mean, where's it all going to end?",
			source: "Tom Stoppard",
			citation: "Rosencrantz and Guildenstern are Dead",
			year: "1967",
			tags: [ 'fiction', 'sailing', 'wind' ]
		},
		{
			quote: "Most people would succeed in small things if they were not troubled with great ambitions.",
			source: "Henry Wadsworth Longfellow",
			citation: "Table Talk",
			year: "1857",
			tags: [ 'non-fiction', 'philosophy', 'goals' ]
		},
		{
			quote: "It's noble to want to confess, but if the results are just damage and pain, that's not noble. It's selfish.",
			source: "Carol Green, House M.D.",
			citation: "Adverse Events",
			year: "2008",
			tags: [ 'non-fiction', 'health', 'pain' ]
		},
		{
			quote: "Talent and intelligence never yet inoculated anyone against the caprice of the fates.",
			source: "J. K. Rowling",
			citation: "Harvard Commencement Address",
			year: "2008",
			tags: [ 'non-fiction', 'fantasy', 'college' ]
		},
		{
			quote: "When you jump for joy, beware that no one moves the ground from beneath your feet.",
			source: "Stanislaw J. Lec",
			citation: "Unkempt Thoughts",
			year: "1957",
			tags: [ 'non-fiction', 'philosohpy', 'advice' ]
		},
		{
			quote: "Don't cry because it's over, smile because it happened.",
			source: "Dr. Seuss",
			citation: "",
			year: "",
			tags: [ 'fiction', 'suess' ]
		},
		{
			quote: "Any fool can tell the truth, but it requires a man of some sense to know how to lie well.",
			source: "Samuel Butler",
			citation: "",
			year: "(1835 - 1902)",
			tags: [ 'honesty', 'lies' ]
		}

	];

	// function returns a random number
	function getRandomNumber(ceiling, zeroPossible) {

		if ( zeroPossible ) {
			return Math.floor( Math.random() * ceiling );
		} else {
			return Math.floor( Math.random() * ceiling ) + 1;
		}

	}

	// function randomly changes the body background color
	function getNewBGColor() {

		// random number CAN NOT be zero when this variable is fale
		var zeroPossible = false;

		// grab random red, green and blue color values (0 - 255)
		var r = getRandomNumber(256, zeroPossible);
		var g = getRandomNumber(256, zeroPossible);
		var b = getRandomNumber(256, zeroPossible);

		// store RGB color value in theRGB
		var theRGB = "rgb(" + r + "," + g + "," + b + ")";

		// add all three rgb values together to get a value for overall screen brightness (max is 756)
		var screen_background_brightness_level = r + g + b;

		// return array [ new background rgb color value (index = 0), screen background brightness level (index = 1)
		return [ theRGB, screen_background_brightness_level ];

	}

	// function returns random number. The first argument is the range and the second argument determines if it starts with zero or one
	function getRandomQuote() {

		// init new quote index variBLE
		var quoteIndex;

		// random number CAN be zero when this variable is fale
		var zeroPossible = true;

		// if all quotes viewed
		if ( quotesViewed.length === quotes.length ) {

			// if all quotes viewed then get a random quote index
			quoteIndex = getRandomNumber(quotes.length, zeroPossible);

		// else if all quotes not already viewed
		} else {

			// loop through quotes until an index not in the quotesViewed array is found
			do {
				
				// get a random quote index
				quoteIndex = getRandomNumber(quotes.length, zeroPossible);
				
			// if quote index is already in the viewed quotes index array then continue looping
			} while( quotesViewed.indexOf( quoteIndex ) !== -1 );
		}

		// record this quote index as viewed
		if ( quotesViewed.indexOf(quoteIndex) === -1 ) {
			quotesViewed.push(quoteIndex);
		}

		if ( console_debug ) {
			console.log('quoteIndex = ' + quoteIndex);
			console.log('quotesViewed = ' + quotesViewed);
		}

		// return the selected quote index and the selected quote array chunk as an array ( 0 = quote index, 1 = quote array section )
		return [ quoteIndex, quotes[quoteIndex] ];

	}

	// main function. gets appropriate quote and displays it on the screen
	function printQuote() {

		// assign a random quote to the 'quote' object (local)
		var quote = getRandomQuote();
	  
	  	// set quoteIndex to index in returned quote array
		var quoteIndex = quote[0];

		// put quote content into local variables from returned quote array
		var textQuote = quote[1].quote;
		var textSource = quote[1].source;
		var textCitation = quote[1].citation;
		var textYear = quote[1].year;
		var arrTags = quote[1].tags;

		// init quote content strings as blank
		var textSourceCitationYear = '';
		var textFullTags = '';

		// if source, citation or year values exist then populate elements with the appropriate text
		if ( textSource || textCitation || textYear ) {

			// if source exists add it to the string
			if ( textSource ) {
				textSourceCitationYear += textSource;
			}

			// if citation exists add it to the string
			if ( textCitation ) {
				if ( textSource.length > 0 ) {
					textSourceCitationYear += ', ';	
				}
				textSourceCitationYear += textCitation;
			}

			// if year exists add it to the string
			if ( textYear ) {
				if ( textSource.length > 0 ) {
					textSourceCitationYear += ', ';	
				}
				textSourceCitationYear += textYear;
			}

		}

		// create tags list string
		for( var x = 0; x < arrTags.length; x++ ) {
			textFullTags += arrTags[x];
			// if not the last tag then add a comma to the string
			if ( x < arrTags.length - 1 ) {
				textFullTags += ', ';					
			}
			
		}

		textFullTags = 'Tags: ' + textFullTags;

		// calls the function to get a randomly generated background color
		screen_background_array = getNewBGColor();

		// get variables from getNewBGColor function
		var background_color = screen_background_array[0];
		var screen_brightness = screen_background_array[1];

		// hide the quote box while changing the quote
		$('#quote-box').hide();
	
		$('#quote-text').html(textQuote);
		$('#quote-source').html(textSourceCitationYear);
		$('#quote-tags').html(textFullTags);

		// set text color based on the brightness of the screen background color
		if ( screen_brightness > 600 ) {
			$('#quote-box p').css('color', 'rgb(0, 0, 0 )');	
		} else {
			$('#quote-box p').css('color', 'rgb(255, 255, 255)');	
		}

		// update the background color
		$('body').css('background-color', background_color).fadeIn(background_transition_speed);

		// change the current quote text to the new quote text
		$('#quote-box').fadeIn(text_transition_speed);

	}

	// run main function to get inital quote
    printQuote();

    // if button clicked then load new quote
    $('button').click( function() { 
    	printQuote();
    });

});
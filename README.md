jTutorial v0.4
=========
Jquery plugin for tutorial on web pages.
by RED (red@dbwap.ru)
___


	* How to use *

steps = 
	[
		{ // Step 1
			items:"#ad-images-views li:first", // Elemets what's will higlight
			message: {text: "YAHOO", position: {x:33,y:90}}, // Message and position message
			events: [{item: "#ad-images-views li:first", type: "click", condition: func_step_delay_100}], // Event's for move next step or ...
			condition: function() {} // Custom trigger execute when step is launching
		},
		{},
		{},
		...
	];
$.jtutorial(steps);
$.jtutorial('start');


	* Methods *
	
// Start tutorial
$.jtutorial('start'); 	

// Stop tutorial. (Alias - #jtutorial-close)
$.jtutorial('close');

// Launch prev step. (Alias - #jtutorial-prevstep)
$.jtutorial('prevstep');

// Launch next step. (Alias - #jtutorial-nextstep)
$.jtutorial('nextstep');

// Launch last step. (Alias - #jtutorial-laststep)
$.jtutorial('laststep');
	
// Launch first step. (Alias - #jtutorial-firststep)
$.jtutorial('firststep');
	
// Execute function when step is ended.
$.jtutorial('stepend', function(){});
	
// Add step. Syntax like steps in initialize.
$.jtutorial('addstep', step);
	
// Del step.
$.jtutorial('delstep', step_number);
	
	
	* Events *

// Execute function when step is ended. Synonym method stepend.
jtutorial.stepend

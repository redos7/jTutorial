jTutorial v0.4
=========
Jquery plugin for tutorial on web pages.
by RED (red@dbwap.ru)
___


## How to use

    steps = 
    	[
    		{ // Step 1
    			items:"#ad-images-views li:first", // Elemets what's will higlight
    			message: {text: "YAHOO", position: {x:33,y:90}}, // Message and position message
    			events: [{item: "#ad-images-views li:first", type: "click", condition: func_step_delay_100}] // Event's or/and function trigger for move next step
    		},
    		{},
    		{},
    		...
    	];
    $.jtutorial(steps);
    $.jtutorial('start');


## Methods
	
  * **$.jtutorial('start')** - Start tutorial (Alias - #jtutorial-start)

  * **$.jtutorial('close');** - Stop tutorial. (Alias - #jtutorial-close)

  * **$.jtutorial('prevstep');** - Launch prev step. (Alias - #jtutorial-prevstep)

  * **$.jtutorial('nextstep');** - Launch next step. (Alias - #jtutorial-nextstep)

  * **$.jtutorial('laststep');** - Launch last step. (Alias - #jtutorial-laststep)

  * **$.jtutorial('firststep');** - Launch first step. (Alias - #jtutorial-firststep)
  
  * **$.jtutorial('stepend', function(){});** - Execute function when step is ended.
  
  * **$.jtutorial('addstep', step);** - Add step. Syntax like steps in initialize.
  
  * **$.jtutorial('delstep', step_number);** - Delete step.
	
	
## Events

  * **jtutorial.stepend** - Execute function when step is ended. Synonym method stepend.


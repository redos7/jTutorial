/* 
 * Site jTutorial 0.4
 * by RED (redwap.spb.ru@gmail.com)
 * Use $.jtutorial();
 */
(function($){
  var steps = []; // {[items:[], message:[], event:[], ...]};
  var step_events = [];
  var current_step = 1;
  
  var functions = {
    calculatestep: function(items) {
		if(typeof(items) === undefined)
			return;
		
		var objects = [];
		var cols = [];
		$(items).each(function(index){
			if ($(this).is(':visible')) {
				var posX = $(this).offset().left;
				var posY = $(this).offset().top;
				var posX2 = $(this).outerWidth()+posX;
				var posY2 = $(this).outerHeight()+posY;
				objects[index] = [posX, posY, posX2, posY2];
				cols.push(posX);
				cols.push(posX2);
			}
		});
		cols.push(0);
		cols.push($(document).width());
		cols.sort(function(a,b) { return a - b; });
		cols = cols.unique();
		
		objects.sort(function(a,b) { return a[1] - b[1]; });
		$('.jtutorial-overlay:not(.parent)').remove();
		
		for(var i = 0; i < cols.length-1; i++) {
			var left = cols[i];
			var right = cols[i+1];
			var start = 0;
			
			for(var j = 0; j < objects.length; j++) {
				var object = objects[j];
				if (object === undefined) continue;
				if (object[0] <= left && object[2] >= right) {
					//console.log('drawing column ', i+1, 'div from ', start, ' to ', object[1]);
					var end = object[1];
					$('.jtutorial-overlay-parent').append('<div class="jtutorial-overlay">');
					$('.jtutorial-overlay-parent').find('.jtutorial-overlay:last')
												  .css('top', start+'px')
												  .css('left', left+'px')
												  .css('width', (right-left)+'px')
												  .css('height', (end-start)+'px');
					start = object[3];
				}
			}
			var end = $(document).height();
			$('.jtutorial-overlay-parent').append('<div class="jtutorial-overlay">');
			$('.jtutorial-overlay-parent').find('.jtutorial-overlay:last')
										  .css('top', start+'px')
										  .css('left', left+'px')
										  .css('width', (right-left)+'px')
										  .css('height', (end-start)+'px');
		}
		$('.jtutorial-overlay').fadeIn();
	},
	
	showmessage: function(obj) {
		if(typeof(obj) === undefined)
			return;
		
		$('.jtutorial-overlay-text').remove();
		$('.jtutorial-overlay-parent').append('<div class="jtutorial-overlay-text">'+obj.text+'</div>');
		$('.jtutorial-overlay-text').css('top', obj.position.x+'px')
									.css('left', obj.position.y+'px');
	},
	
	bindevents: function(obj) {
		if(typeof(obj) === undefined)
			return;
		//console.log('Events: ', obj);
		for(var key = 0; key < obj.length; key++) {
			var event_item = obj[key];
			step_events[key] = {item:event_item.item, type:event_item.type};
			
			$(event_item.item).bind(event_item.type, {event_item: event_item}, function(evt) {
				event_item = evt.data.event_item;
				var callback = event_item.condition ? event_item.condition : function () { return true; };
				var res = callback();
				if(res) {
					$(window).trigger('jtutorial.stepend', {step: current_step});
					current_step = current_step+1;
					methods.step(current_step);
				}
			});
		}
	},
	
	unbind: function() {
		for(var key = 0; key < step_events.length; key++) {
			$(step_events[key].item).unbind(step_events[key].type);
		}
	},
		
	removeall: function() {
		functions.unbind();
		$('.jtutorial-overlay').remove();
		$('.jtutorial-overlay-text').remove();
		$('.jtutorial-overlay-help').remove();
		current_step = 1;
	},
		
	showhelptooltip: function() {
		if(!$('.jtutorial-overlay-parent').length)
			$('.jtutorial-overlay-parent').append('<div class="jtutorial-overlay-help">');
		
		$('.jtutorial-overlay-help').html('<div style="font-size:18px">Вы можете прервать обучение в любой момент нажав клавишу <div class="jtutorial-esckey" /></div>')
			.css('left', ($(document).width()/2)-($('.jtutorial-overlay-help').outerWidth()/2));
			
		setTimeout(function() {
			$('.jtutorial-overlay-help').slideDown('slow', function() {
				setTimeout(function() {
					$('.jtutorial-overlay-help').slideUp('slow', function() {
						$(this).remove();
					});
				}, 9500);
			});
		}, 2500);
		
	}
	
  };
  
  var methods = {
    init: function( options ) {
		if(steps.length) {
			console.log('second init!');
			return;
		}
		
		if (typeof(options[0]) != 'undefined') {
			steps = options;
		}else{
			$.error('Error: Missing steps!');
		}
		
		functions.removeall();
		if(!$('.jtutorial-overlay-parent').length) {
			$('body').append('<div class="jtutorial-overlay-parent">');
		} else {
			$('body').find('.jtutorial-overlay-parent').html('');
		}
		
		$(document).keyup(function(e) {
			if(e.keyCode == 27) {
				functions.removeall();
			}
		});
		
		$("body").delegate('#jtutorial-nextstep', 'click', function(e) {
			methods.nextstep();
			e.preventDefault();
		});
		
		$("body").delegate('#jtutorial-prevstep', 'click', function(e) {
			methods.prevstep();
			e.preventDefault();
		});
		
		$("body").delegate('#jtutorial-firststep', 'click', function(e) {
			methods.firststep();
			e.preventDefault();
		});
		
		$("body").delegate('#jtutorial-laststep', 'click', function(e) {
			methods.laststep();
			e.preventDefault();
		});
		
		$("body").delegate('#jtutorial-start', 'click', function(e) {
			methods.start();
			e.preventDefault();
		});
		
		$("body").delegate('#jtutorial-close', 'click', function(e) {
			methods.close();
			e.preventDefault();
		});
		
		$("#footer").click(function() {
			methods.start();
		});
		
		// $("#jtutorial-start").click(function(e) {
			// methods.start();
			// e.preventDefault();
		// });
        Array.prototype.unique =
            function() {
                var a = [];
                var l = this.length;
                for(var i=0; i<l; i++) {
                    for(var j=i+1; j<l; j++) {
                        // If this[i] is found later in the array
                        if (this[i] === this[j])
                        j = ++i;
                    }
                    a.push(this[i]);
                }
                return a;
            };
        
    },
	
	close: function() {
		functions.removeall();
	},
		
	start: function() {
		methods.step(1);
	},
		
	prevstep: function() {
		current_step = current_step-1;
		methods.step(current_step);
	},
		
	nextstep: function() {
		current_step = current_step+1;
		methods.step(current_step);
	},
		
	laststep: function() {
		current_step = steps.length;
		methods.step(current_step);
	},
		
	firststep: function() {
		current_step = 1;
		methods.step(current_step);
	},
		
	stepend: function(callback) {
		$(window).bind('jtutorial.stepend', {callback: callback}, function(evt, obj) {
			$(window).unbind(evt);
			return evt.data.callback(obj.step);
		});
	},
		
	addstep: function() {
		var template = {items:'', message: {text:'', position: {x:0,y:0}}, events: [{item: '', type: '' }]};
		var data = {items:'test', message: {text:'test', position: {x:1, y:2}}};
		var merge = $.extend(template, data);
		steps.push(merge);
	},
		
	delstep: function(step) {
		//delete steps[step-1];
		//steps.sort();
		var temp = [];
		var p = 0;
		for(var i = 0; i < steps.length; i++) {
			if(i == step-1)
				p = p-1;
			else
				temp[p] = steps[i];
			
			p = p+1;
		}
		steps = temp;
	},
	
	step: function(step) {
		// Clear prev step events and div's if exist
		functions.unbind();
		step_events = [];
		
		var obj = steps[step-1];
		if (typeof(obj) == 'undefined') {
			$.error('Error: Not found step '+step+'!');
			return;
		}
		if(step == 1) {
			functions.showhelptooltip();
		}
		
		functions.calculatestep(obj.items);
		functions.showmessage(obj.message);
		functions.bindevents(obj.events);
	}
  };

  jQuery.jtutorial = function( method ) {
	if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method '+method+' not found!');
    }
  };

})(jQuery);
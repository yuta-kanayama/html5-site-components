;(function($, window, document, undefined){

//document ready
$(function(){
	
	//var escalatorList = [];
	
	$.each( $('.escalator-list__items'), function(){
		var $me = $(this),
				escalatorList = new EscalatorList();
		
		escalatorList.init({
			target: $me
		}).start();
		
	} );
	
});//document ready



function EscalatorList() {}

EscalatorList.prototype = {
	
	init: function( opt ) {
		var self = this;
		self.prm = {
			target: $('.escalator-list__items'),
			jsonURL: 'json/sample.json'
		}
		for(var key in opt) self.prm[key] = opt[key];
		
		self.data;
		self.timer;
		self.count = 0;
		self.countMax = 0;
		self.interval = 1000;
		
		self.$target = self.prm.target;
		self.$item;
		
		return self;
	},
	
	
	start: function() {
		var self = this;
		
		self.setEvent();
		
		self.loadJSON()
			.then( function() {
				
				var dom,
						max = 5;
				self.countMax = self.data.length;
				
				if( 5 > self.countMax ) max = self.countMax;
				
				for( var i = 0; i < max; i++ ) {
					dom = self.createDOM( self.data[i] );
					self.$target.prepend( dom );
				}
				self.count = max;
				
				self.timer = setTimeout( $.proxy( self.animation, self ), self.interval );
				
			} );
		
	},
	
	
	animation: function() {
		var self = this;
		clearTimeout( self.timer );
		
		var dom = self.createDOM( self.data[ self.count ] );
		//console.log( dom );
		dom.find('.thumbnail img').load( function( event ) {
			
			self.$target.height( self.$target.height() );
			
			self.$target.prepend( dom );
			var dom_wrapper = dom.find('.l-wrapper');
			var dom_inner = dom.find('.l-inner');
			dom_wrapper.height( dom.height() );
			dom_inner.fadeOut(0);
			dom.slideUp(0)
			.slideDown(1000, function() {
				dom_inner.fadeIn(1000, function() {
					self.count++;
					if( self.count >= self.countMax ) self.count = 0;
					self.timer = setTimeout( $.proxy( self.animation, self ), self.interval );
				});
				self.$target.find('.escalator-list__item:last').remove();
			});
		} );
	},
	
	
	setEvent: function() {
		var self = this;
		
		
	},
	
	
	loadJSON: function() {
		var self = this,
				dfd = $.Deferred();
		
		$.ajax({
			type: 'GET',
			url: self.prm.jsonURL,
			dataType: 'json',
			cache: false,
			success: function( json ) {
				self.data = json;
				dfd.resolve();
			},
			error: function() {
				console.log('error');
				dfd.reject();
			}
		});
		
		return dfd.promise();
	},
	
	
	createDOM: function( data ) {
		var self = this,
				html = '';
		
		html += '<div class="l-wrapper">';
		html += 	'<a href="'+ data.permalink +'" class="l-inner">';
		html += 		'<div class="l-primary">';
		html += 			'<figure class="thumbnail">';
		html += 				'<img src="'+ data.thumbnail +'" alt="" />';
		html += 			'</figure>';
		html += 		'</div>';
		html += 		'<div class="l-secondary">';
		html += 			'<h1 class="title">'+ data.title + '</h1>';
		html += 			'<p class="text">'+ data.text +'</p>';
		html += 		'</div>';
		html += 	'</a>';
		html += '</div>';
		
		var dom = $('<section>', {
			'class': 'escalator-list__item'
		}).html( html );
		
		return dom.clone();
	}
	
}

})(jQuery, this, this.document);
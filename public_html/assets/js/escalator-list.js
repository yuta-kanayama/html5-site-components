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
		
		self.timer;
		self.$target = self.prm.target;
		self.$item;
		
		return self;
	},
	
	
	start: function() {
		var self = this;
		
		self.setEvent();
		
		self.loadJSON()
			.then( function( json ) {
				console.log( json );
				
				var html = '',
						dom,
						count = 0,
						max = json.length;
				
				if( 5 < max ) max = 5;
				
				for( var i = 0; i < max; i++ ) {
					dom = self.createDOM( json[i] );
					console.log( dom );
					self.$target.prepend( dom );
					//html += self.createHTML( json[i] );
				}
				count = max;
				//self.$target.html( html );
				
				self.timer = setInterval( function() {
					dom = self.createDOM( json[i] );
					console.log( dom );
					dom.find('.thumbnail img').load( function( event ) {
						//console.log( event );
						self.$target.prepend( dom );
						var dom_wrapper = dom.find('.l-wrapper');
						var dom_inner = dom.find('.l-inner');
						dom_wrapper.height( dom.height() );
						dom.slideUp(0);
						dom_inner.fadeOut(0);
						dom.slideDown(1000, function() {
							dom_inner.fadeIn(1000);
						});
					} );
					count++;
					if( count >= json.length ) count = 0;
				}, 3000 );
				
			} );
		
	},
	
	
	setEvent: function() {
		var self = this;
		
		self.$target.load( function() {
			console.log( 'target.load' );
		} );
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
				dfd.resolve( json );
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
		
		//html += '<li class="escalator-list__item">';
		html += 	'<section class="l-wrapper">';
		html += 		'<a href="'+ data.permalink +'" class="l-inner">';
		html += 			'<div class="l-primary">';
		html += 				'<figure class="thumbnail">';
		html += 					'<img src="'+ data.thumbnail +'" alt="" />';
		html += 				'</figure>';
		html += 			'</div>';
		html += 			'<div class="l-secondary">';
		html += 				'<h1 class="title">'+ data.title + '</h1>';
		html += 				'<p class="text">'+ data.text +'</p>';
		html += 			'</div>';
		html += 		'</a>';
		html += 	'</section>';
		//html += '</li>';
		
		var dom = $('<li>', {
			'class': 'escalator-list__item'
		}).html( html );
		
		return dom.clone();
	}
	
}

})(jQuery, this, this.document);
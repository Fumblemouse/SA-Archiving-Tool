// jQuery Max Size
// www.labs.skengdon.com/maxSize
;(function($){$.fn.maxSize=function(options){if(typeof options!=='object'){var options={width:options,height:options}};return this.each(function(){$img=$(this);var F;var FW=0;var FH=0;if(options.width){FW=$img.width()/options.width;F=1;};if(options.height){FH=$img.height()/options.height;F=0;};if(FW&&FH){F=FW/FH;};if((F>=1)&&(FW>=1)){$(this).width(options.width);};if((F<=1)&&(FH>=1)){$(this).height(options.height);};});};})(jQuery);

// fixed TIMG script for Something Awful forums
// depends on JQuery, so make sure it's loaded after jquery-min-1.4.2.js. tested against that version (which is in use on SA)

$("img.timg").one('load', function() {
	
	var img = this;
	
	//fix for WebKit cached images not having width or height
	setTimeout(function() {

		full_width = $(img).width()
		full_height = $(img).height()
	
		if (full_width > 300 || full_height > 300) {
			
			//attributes in the img element are used to keep track of width of the original and thumbnailed images, as well as if it's expanded or not
			$(img).attr("full_width", full_width);
			$(img).attr("full_height", full_height);
			$(img).attr("is_expanded", "false");
			
			$(img).addClass("complete");
		
			$(img).maxSize({width: 300, height: 300});
		
			$(img).attr("thumb_width", $(img).width());
			$(img).attr("thumb_height", $(img).height());
			
			if ($(img).parent('a').length == 0) {
				$(img).wrap("<a target='_blank' href='" + $(img).attr("src") + "' />")
			}
			
			container = $("<span class='timg_container' />")
			resizeContainer(container, $(img).height())
			$(img).wrap(container);
			
			caption = $("<div class='note'>Click here to expand (" + full_width + " x " + full_height + ")</div>");
			$(caption).hide();
			$(img).after(caption);

			$(caption).click(toggleSize);
			$(img).hover(showCaption, hideCaption);
		}
		else {
			$(img).removeClass("timg");
		}
	}, 0);
}).each(function() {
	if(this.complete) $(this).load();
});


function toggleSize(e) {
	e.stopPropagation();
	e.preventDefault();
	
	img = $(this).parent().find("img");
	container = $(this).parent();
	
	if ($(img).attr("is_expanded") == "false") {
		full_width = parseInt($(img).attr('full_width'));
		full_height = parseInt($(img).attr('full_height'));
		
		$(img).width(full_width); //keeps from overriding the width for maxSize. weird tho
		$(img).height(full_height);

		resizeContainer(container, full_height);
		$(img).attr("is_expanded", "true");
	}
	
	else {
		$(img).width(parseInt($(img).attr('thumb_width')));
		$(img).height(parseInt($(img).attr('thumb_height')));
		
		resizeContainer(container, $(img).height());

		$(img).attr("is_expanded", "false");
	}
}

function resizeContainer(container, height) {
	$(container).css("padding-top", height + "px");
}

function showCaption(e) {
	$(this).parent().find(".note").show()
}

function hideCaption(e) {
	if ($(e.relatedTarget).hasClass("note")) {
		return; //rollover doesn't disappear when going from img <-> caption
	}
	$(this).parent().find(".note").hide()
}
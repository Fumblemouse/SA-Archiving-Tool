$(function() {
	$(".original_link").attr('href', 'https://forums.somethingawful.com/showthread.php?threadid=' + threadid);

	$("#help_dialog").dialog({
		height:200,
		autoOpen: false,
		modal:true
	});
	
	$('.open_help').click(function() {
		console.log("click");
		$("#help_dialog").dialog('open');
	});
});

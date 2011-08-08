var threadid = threadid;

var archive = function() {
	
	var pages = [];
	
	function Thread(id) {
		this.id = id;
		this.length = 0;
		this.title = "";
		this.OP = "";
	}
	
	function Page(number, html) {
		this.number = number;
		this.html = html;
		
		this.posts_table = $(html).find("#thread");
	}
	
	function savePage(data) {
		page_number = $(data).find('.curpage:first').html();
		pages[page_number] = new Page(page_number, data);
	}
	
	var reqManager;

	var thread = new Thread(threadid)
	
	// First, get first page. First page is special because it sets up everything to come.
	$.get("http://forums.somethingawful.com/showthread.php?threadid=" + threadid, function(html) {	
		page_counter = $(html).find(".pages.top");
		
		if (page_counter != " ") {
			thread.length = $(page_counter).html().match(/\((\S+)\)/)[1];
		}
		else {
			thread.length = 1;
		}
		
		thread.title = $(html).find(".breadcrumbs .bclast").html();
		
		pages[1] = new Page(1, html);
		
		if (thread.length > 1) {
			reqManager = new ReqManager({
				total_requests: thread.length - 1,
				onFinished: buildPage
			});
			for (var page = 2; page <= thread.length; page++) {
				reqManager.createReq({
					url: "http://forums.somethingawful.com/showthread.php?threadid=" + threadid + "&pagenumber=" + page,
					type: "get",
					dataType: "html",
					onSuccess: savePage
				})
			}
		}
		else {
			buildPage();
		}
		
	});
	
	function buildPage() {
		$("#header").html(thread.title);
		
		for (i in pages) {
			$("#posts").append("<div class='page_head'>Page " + i + " of " + thread.length + "</div>");
			$("#posts").append(pages[i].posts_table);
			
		}
		
		$("#posts").find(".profilelinks li a").each(function () {
			$(this).attr('href', 'http://forums.somethingawful.com/' + $(this).attr('href'));
		});
		
		$("#posts").find(".postbuttons").css("visibility", "hidden");
		
		$("#loading").hide();
		$("#header, #posts, #footer, #help_dialog, #subhead").show()
		$("body").append('<script src="js/timg_fixed.js"></script>');
	}
}
archive(); //namespaces, whoo
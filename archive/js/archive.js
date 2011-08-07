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
	
	var ReqManager = function() {
		this.reqs = [];
		
		this.PageReq = function(number) {
			this.number = number;	
			this.status = "incomplete";
			var pr_self = this;
			
			$.get("http://forums.somethingawful.com/showthread.php?threadid=" + threadid + "&pagenumber=" + number, function (data) {
				pr_self.status = "returned";
				pages[pr_self.number] = new Page(pr_self.number, data);
				scrapeComplete(this.number);
			});
		}
	
		function scrapeComplete(number) {
			for (var i = 2; i <= thread.length; i++) {
				if (self.reqs[i].status == "incomplete") {
					return false;
				}
			}
			
			buildPage();
		}
		
		var self = this;
	}; 
	reqManager = new ReqManager();

	var thread = new Thread(threadid)
	
	// First, get first page. First page is special because it sets up everything to come.
	$.get("http://forums.somethingawful.com/showthread.php?threadid=" + threadid, function(html) {
		
		page_counter = $(html).find(".pages.top").html();
		console.log(page_counter);
		if (page_counter != " ") {
			thread.length = page_counter.html().match(/\((\S+)\)/)[1];
		}
		else {
			thread.length = 1;
		}
		
		thread.title = $(html).find(".breadcrumbs .bclast").html();
		
		pages[1] = new Page(1, html);
		
		if (thread.length > 1) {
			for (var page = 2; page <= thread.length; page++) {
				reqManager.reqs[page] = new reqManager.PageReq(page);
			}
		}
		else {
			buildPage();
		}
		
	});
	
	function buildPage() {
		$("#header").html(thread.title);
		
		for (i in pages) {
			$("#posts").append(pages[i].posts_table);
		}
		
		$("#loading").hide();
		$("#header, #posts, #footer, #help_dialog, #subhead").show()
	}
}
archive(); //namespaces, whoo
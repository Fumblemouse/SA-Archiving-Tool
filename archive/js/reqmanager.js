ReqManager = function(options) {
	this.requests = [];
	this.options = options;
	if (this.options.type == null) {
		this.options.type = "get";
	}

	var Req = function(options) {
		this.options = options;
		this.complete = false;
		if (options.type == undefined) {
			this.options.type = "get";
		}
		if (options.dataType == undefined) {
			this.options.dataType = "jsonp";
		}
		var req = this;
		
		$.ajax({
			url: req.options.url,
			type: req.options.type,
			dataType: req.options.dataType,
			success: function (data) {
				req.complete = true;
				req.options.onSuccess(data);
				requestComplete();
			}
		});
	}

	this.createReq = function(options) {
		this.requests.push(new Req(options));
	}

	function requestComplete() {
		for (var i = 0; i < reqMan.options.total_requests; i++) {
			if (reqMan.requests[i].complete == false) {
				return false;
			}
		}
		reqMan.options.onFinished();
	}

	var reqMan = this;
};
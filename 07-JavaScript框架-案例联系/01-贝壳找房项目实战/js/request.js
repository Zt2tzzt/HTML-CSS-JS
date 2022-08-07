;(function (g, $) {

	function request({
		url = '',
		method = 'GET',
		timeout = 5000,
		data = {},
		headers = {}
	} = {}) {
		return $.ajax({
			url,
			method,
			timeout,
			data,
			headers
		})
	}

	function get(url, data) {
		return request({
			url,
			method: 'GET',
			data
		})
	}

	function post(url, data) {
		return request({
			url,
			method: 'POST',
			data
		})
	}
	
	window.ztReq = {
		request,
		get,
		post
	}

})(window, jQuery)
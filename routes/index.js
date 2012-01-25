
/*
 * GET home page.
 */

exports.index = function(req, res){
	var ua = req.headers['user-agent'];
	if ( /mobile/i.test(ua) )
	{
		res.sendfile(res.app.settings.views + '/mobile.html');
	}
	else
	{
		res.sendfile(res.app.settings.views + '/index.html');
	}
};
exports.mobile = function(req, res){
	res.sendfile(res.app.settings.views + '/mobile.html');
};

var socket = io.connect(window.location.origin);
document.getElementById('bringChild').addEventListener('submit', function(event){
	event.preventDefault();
	var name = strip(event.currentTarget[0].value);
	socket.emit('bringChild', name);
	event.currentTarget.style.display = 'none';
	var child = document.createElement('div');
	child.focus();
	child.id = 'child';
	document.getElementById('main').appendChild(child);
	setTimeout(function(){
		child.style.left = '100px';
	}, 3500);
}, false);

var strip = function(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText;
}
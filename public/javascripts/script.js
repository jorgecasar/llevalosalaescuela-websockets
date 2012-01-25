/* Author:

*/
var Queue = function(){
	
	var children = [];
	var htmlElement = document.getElementById('queue');
	var childrenToQueue = Math.floor(htmlElement.clientWidth/Child.WIDTH);
	var enqueue = function( position, child ){
		if( !child )
		{
			child = new Child(htmlElement)
		}
		child.enqueue(htmlElement, position);
		children.push(child);
	};
	var firstToSchool = function(name) {
		var child = children.shift();
		child.showOwner(name);
		setTimeout(function(){
			child.hideOwner();
			child.goSchool();
			moveChildren();
			enqueue( queue.children.length - 1 );
		}, 3000);
	};
	var moveChildren = function(  )
	{
		for( index in children )
		{
			children[index].setPosition( index );
		}
	}
	
	var i = 0;
	for( ; i < childrenToQueue; i++ )
	{
		enqueue(i, new Child(htmlElement));
	}
	return {
		children: children,
		firstToSchool: firstToSchool,
		moveChildren: moveChildren,
		enqueue: enqueue
	};
};

var Child = function(queueElement){
	var WIDTH = Child.WIDTH;
	var htmlElement = document.createElement('li');
	var owner;
	
	var enqueue = function(queueElement, position) {
		htmlElement.style.right = queueElement.clientWidth + 'px';
		queueElement.appendChild( htmlElement );
		setTimeout(function(){
			setPosition(position);
		}, position*200);
		
	};
	
	var setPosition = function( position ){
		htmlElement.style.right = WIDTH * position + 'px';
	};
	
	var goSchool = function(){
		htmlElement.style.right = '-200px';
		setTimeout(function(){
			document.getElementById('school').appendChild(htmlElement);
		}, 2000);
	};
	var showOwner = function(name){
		owner = document.createElement('p');
		owner.innerHTML = '<strong>' + name + '</strong> Ha llevado a este niño a la escuela a aprender HTML5.';
		htmlElement.appendChild(owner);
		owner.style.opacity = 1;
	};
	var hideOwner = function(){
		owner.style.opacity = 0;
	};
	return {
		enqueue: enqueue,
		goSchool: goSchool,
		showOwner: showOwner,
		hideOwner: hideOwner,
		setPosition: setPosition,
		htmlElement: htmlElement
	};
};
Child.WIDTH = Child.prototype.WIDTH = 100;

var App = (function(){
	var queue = new Queue();
	var childToSchool = function(name){
		queue.firstToSchool(name);
	};
	var screenLink = document.getElementById('screen').getElementsByTagName('a')[0];
	screenLink.addEventListener('click', function(event){
		event.preventDefault();
		var mobile = document.getElementById('mobile');
		var options = "width=500,height=210,menubar=0,location=0,resizable=0,scrollbars=0,status=0,titlebar=0,top=" + (100 + mobile.offsetTop + mobile.offsetParent.offsetTop) + ",left=" + (mobile.offsetLeft + mobile.offsetParent.offsetLeft);
		console.log(options);
		window.open(this.href, 'Escuela móvil', options);
	}, false);
	
	var aside = document.getElementsByTagName('aside')[0];
	aside.style.height = aside.clientHeight - 50 + 'px';
	var button = document.getElementById('start');
	button.addEventListener('click', function(event){
		event.preventDefault();
		aside.style.height = 0;
		aside.style.padding = 0;
	}, false);
	
	var socket = io.connect(window.location.origin);
	socket.on('childToSchool', childToSchool);
	
	return {
		queue: queue,
		childToSchool: childToSchool,
	}
})();
'use strict';

var Base = require('./base.js');
var OOP = require('./oop.js');

function ClassA(config) {
	ClassA.superclass.constructor.call(this, config);
}

OOP.extend(ClassA, Base, {
	initializer: function() {
		console.log('ClassA initializer');
	},

	destructor: function() {
		console.log('ClassA destructor');
	}
}, {
	ATTRS: {
		classA: {
			value: 'classAA'
		}
	}
});


function ClassB(config) {
	ClassB.superclass.constructor.call(this, config);
}

OOP.extend(ClassB, ClassA, {
	initializer: function() {
		console.log('ClassB initializer');
	},

	destructor: function() {
		console.log('ClassB destructor');
	}
}, {
	ATTRS: {
		classB: {
			value: 'classBB'
		}
	}
});


var classA = new ClassA({
	classA: 'new A'
});

var classB = new ClassB({
	classB: 'new B'
});


classA.destroy();
classB.destroy();
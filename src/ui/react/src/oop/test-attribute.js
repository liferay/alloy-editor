'use strict';

var OOP = require('./oop/oop.js');
var Attribute = require('./attribute.js');

function Test(config) {
	Test.superclass.constructor.call(this, config);
}

OOP.extend(Test, Attribute, {
	_testOne: function(val) {
        return true;
    },

    _testTwo: function(val) {
        return true;
    },

    _testThree: function(val) {
        return true;
    },

    _testFour: function(val) {
        return true;
    },

    _testFive: function(val) {
        return true;
    }
}, {
	ATTRS: {
	    one: {
	        validator: '_testOne',
	        value: 'one',
	        readOnly: true
	    },

	    two: {
	        validator: function() {
	            return true;
	        },
	        value: 'two'
	    },

	    three: {
	        validator: '_testThree',
	        value: 'three'
	    },

	    four: {
	        validator: '_testFour',
	        value: 'four',
	        readOnly: true
	    },

	    five: {
	        validator: '_testFive',
	        value: 'five',
	        writeOnce: true
	    }
	}
});

var test = new Test({
	one: 'one1',
	two: 'two2',
	three: 'three3'
});

var one = test.get('one');
console.log(one);
var one = test.get('one');
console.log(one);

test.set('one', 'val1');
var one = test.get('one');
console.log(one);

var two = test.get('two');
console.log(two);

var three = test.get('three');
console.log(three);
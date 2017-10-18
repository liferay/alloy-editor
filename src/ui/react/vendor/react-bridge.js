 /**
  * React bridge between v16 and older version
  */
var PropTypes = (function() {
    return (0, eval)('this').PropTypes || React.PropTypes;
}());
(0, eval)('this').PropTypes = PropTypes;

var createReactClass = (function() {
    return (0, eval)('this').createReactClass || React.createClass;
}());    
(0, eval)('this').createReactClass = createReactClass;

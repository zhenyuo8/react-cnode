/**
 * 类继承
 * @authors Your Name (you@example.org)
 * @date    2016-03-16 13:48:01
 * @version $Id$
 */

module.exports = function (subClass, Superclass) {
	var F = function() {};
	F.prototype = Superclass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
	subClass.Superclass = Superclass.prototype;
	if(Superclass.prototype.constructor == Object.prototype.constructor) {
	Superclass.prototype.constructor = Superclass;
	}
}
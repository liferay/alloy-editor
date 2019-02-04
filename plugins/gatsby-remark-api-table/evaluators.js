const VISITOR = {
	default: defaultValue,
	NameExpression,
	NonNullableType,
	NullableType,
	type,
	UndefinedLiteral,
	UnionType,
};

function type(ast) {
	return VISITOR[ast.type.type](ast.type);
}

function defaultValue(ast) {
	return {
		[ast.title]: ast.description
	};
}

function NullableType(ast) {
	const {expression} = ast;

	return {
		required: false,
		type: VISITOR[expression.type](expression)
	};
}

function NonNullableType(ast) {
	const {expression} = ast;

	return {
		required: true,
		type: VISITOR[expression.type](expression)
	};
}

function NameExpression(type) {
	return type.name;
}

function UnionType(type) {
	return type.elements.map(element => {
		return VISITOR[element.type](element);
	}).join('/');
}

function UndefinedLiteral(type) {
	return 'undefined';
}

module.exports = VISITOR;
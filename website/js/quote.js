(function () {
	'use strict';

	var quotes = [
		{
			author: 'Chema Balsas, Frontend Developer, Liferay Inc.',
			comment: 'When I first saw AlloyEditor I couldn\'t believe it... how could that be the same Web Editor we\'d been using for years?',
			picture: '/website/img/astronauts/astrochema.png'
		},
		{
			author: 'Juan Hidalgo, UX Designer, Liferay Inc.',
			comment: 'AlloyEditor will change the way we write content for the Web. With AlloyEditor you quite never stop thinking about how your next content will look.',
			picture: '/website/img/astronauts/astrojuanhidalgo.png'
		},
		{
			author: 'Sergio Gonz&aacute;lez, Collaboration Lead, Liferay Inc.',
			comment: 'The new AlloyEditor is so intuitive, simple, and useful that you won\'t realize you are actually using an editor. Just focus on the content while AlloyEditor takes care of all the rest.',
			picture: '/website/img/astronauts/astrosergio.png'
		},
		{
			author: 'Juan Fern&aacute;ndez, Product Manager, Liferay Inc.',
			comment: 'The new Alloy Editor causes a paradigm shift in the way our users experience the content creation process: in a world full of distractions, now everything gets out of the way to let the writing experience be unique.',
			picture: '/website/img/astronauts/astrojuanfernandez.png'
		},
		{
			author: 'Marcos Castro, Theme Lead, Liferay Inc.',
			comment: 'AlloyEditor is covering editing gaps which not even myself knew I had. AlloyEditor turns what until now was a complex task into a seamless experience.',
			picture: '/website/img/astronauts/astromarcos.png'
		}
	];

	var quote = quotes[Math.floor(Math.random() * quotes.length)];

	$('#testimonials-list .testimonial-author').html('&mdash; ' + quote.author);
	$('#testimonials-list .testimonial-comment').html('"' + quote.comment + '"');
	$('#testimonials-list .testimonial-picture').attr('src', quote.picture);
}());
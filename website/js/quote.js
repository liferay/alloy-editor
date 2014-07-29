YUI().use('node', function (Y) {

  var chemasQuote = '"When I first saw AlloyEditor I couldn\'t believe it... how could that be the same Web Editor we\'d been using for years?" <br><span class="author">&mdash; Sergio Gonzalez, Collaboration Lead, Liferay Inc.</span>',
      juansQuote = '"AlloyEditor will change the way we write content for the Web. With AlloyEditor you quite never stop thinking about how your next content will look." <br><span class="author">&mdash; Juan Hidalgo, UX Lead, Liferay Inc.</span>',
      quotes = [chemasQuote, juansQuote],
      quoteContainer = Y.one('.quote p'),
      random = Math.floor(Math.random() * 2);

  quoteContainer.append(quotes[random]);

});
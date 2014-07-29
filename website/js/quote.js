YUI().use('node', function (Y) {

  var chemasQuote = '"When I first saw AlloyEditor I couldn\'t believe it... how could that be the same Web Editor we\'d been using for years?" <br><span class="author">&mdash; Chema Balsas, Frontend Developer, Liferay Inc.</span>',
      juansQuote = '"AlloyEditor will change the way we write content for the Web. With AlloyEditor you quite never stop thinking about how your next content will look." <br><span class="author">&mdash; Juan Hidalgo, UX Designer, Liferay Inc.</span>',
      sergiosQuote = '"The new AlloyEditor is so intuitive, simple, and useful that you won\'t realize you are actually using an editor. Just focus on the content while AlloyEditor takes care of all the rest." <br><span class="author">&mdash; Sergio Gonz&aacute;lez, Collaboration Lead, Liferay Inc.</span>',
      quotes = [chemasQuote, juansQuote, sergiosQuote],
      quoteContainer = Y.one('.quote p'),
      random = Math.floor(Math.random() * 3);

  quoteContainer.append(quotes[random]);

});
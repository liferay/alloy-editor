(function () {
  'use strict';

  var githubAPI = 'https://api.github.com/repos/liferay/alloy-editor/contributors?callback=?';

  $.getJSON(githubAPI).done(function(response) {
    var contributorsNode = $('#contributors'),
        contributorTemplate = contributorsNode.find('.hide');

    $.each(response.data, function(index, contributor) {
      contributorTemplate
        .clone()
        .appendTo(contributorsNode)
        .attr('data-placement', 'top')
        .attr('data-toggle', 'tooltip')
        .attr('title', '@' + contributor.login)
        .attr('href', 'https://github.com/' + contributor.login)
        .removeClass('hide')
        .find('img')
        .attr('src', contributor.avatar_url);
    });

    $('[data-toggle="tooltip"]').tooltip();
  });
}());
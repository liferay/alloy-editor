YUI().use('node', 'transition', 'aui-carousel', function (Y) {

  Y.one('.btn').on('click', function() {
    this.transition({ width: '400px' });
  });

  new Y.Carousel({
    contentBox: '#myCarousel',
    intervalTime: 2,
    width: 700,
    height: 250
  }).render();

});
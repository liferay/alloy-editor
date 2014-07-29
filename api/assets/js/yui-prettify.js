YUI().use('node', function(Y) {
    var h,
        l,
        lis,
        code = Y.all('.prettyprint.linenums');

    if (code.size()) {
        code.each(function(c) {
            lis = c.all('ol li');
            l = 1;
            lis.each(function(n) {
                n.prepend('<a name="LINENUM_' + l + '"></a>');
                l++;
            });
        });
        h = location.hash;
        location.hash = '';
        h = h.replace('LINE_', 'LINENUM_');
        location.hash = h;
    }
});

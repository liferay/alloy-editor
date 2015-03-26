(function() {
    'use strict';

    var assert = chai.assert;

    describe('SelectionRegion', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should create selection from range', function() {
            this.nativeEditor.setData('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus augue a scelerisque imperdiet. Nunc quis nunc dolor. Nunc nisl felis, lacinia eu condimentum quis, interdum in tellus. Donec eget ipsum sed felis egestas euismod ultricies at arcu. Suspendisse potenti. Curabitur sed augue in sem efficitur fermentum ac quis mi. Fusce volutpat feugiat justo, non hendrerit justo bibendum eu. Maecenas pellentesque urna vitae odio condimentum, suscipit tempus nibh interdum. Fusce lacinia magna et nisl vestibulum, nec viverra nisl tempus. Curabitur viverra, arcu a vehicula imperdiet, lectus nisi faucibus velit, eget sodales ante lacus nec ligula. Morbi in placerat ligula. Maecenas volutpat sem id augue elementum auctor.');

            var editable = this.nativeEditor.editable();

            var region = editable.getClientRect();

            // Add - 5 or + 5 to make sure the points are in the editable area
            this.nativeEditor.createSelectionFromRange(region.left + 5, region.top + 5, region.right - 5, region.bottom - 5);

            assert.isFalse(this.nativeEditor.isSelectionEmpty());
        });
    });
}());
(function() {
    'use strict';

    var assert = chai.assert;

    describe('widget interaction point', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(function (done) {
            Utils.beforeEach.call(this);
            this.objProps = {
                _getXPoint: AlloyEditor.WidgetInteractionPoint._getXPoint,
                props: {
                    editorEvent: {
                        data: {
                            nativeEvent: {
                                pageX: 300,
                                pageY: 300
                            },
                            selectionData: {
                                region: {
                                    top: 600,
                                    bottom: 5,
                                    width: 50,
                                    left: 10,
                                    right: 10,
                                    direction: 1,
                                    endRect: {
                                        left: 10,
                                        right: 20,
                                        top: 600
                                    },
                                    startRect: {
                                        left: 10,
                                        right: 60,
                                        top: 600
                                    } 
                                }
                            }
                        }
                    }
                }
            };

            done();
        });

        afterEach(Utils.afterEach);

        describe('direction 1', function () {

            it('Should toolbar appears over first character of the selection when you select right to left ', function() {

                var result = {
                    direction: 1,
                    x: 20,
                    y: 600,
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should toolbar appears over last character of the selection', function() {
                this.objProps.props.editorEvent.data.selectionData.region.startRect.left = 30;

                var result = {
                    direction: 1,
                    x: 30,
                    y: 600,
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should AlloyEditor.WidgetInteractionPoint return object with x value from nativeEvent.pageX', function() {
                this.objProps.props.editorEvent.data.selectionData.region.endRect.right = 400;

                var result = {
                    direction: 1,
                    x: 300,
                    y: 600,
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should toolbar appear under selection when you select more than one lines top to bottom', function() {
                this.objProps.props.editorEvent.data.selectionData.region.top = 500;
                this.objProps.props.editorEvent.data.selectionData.region.bottom = 10;
                this.objProps.props.editorEvent.data.selectionData.region.startRect.top = 10;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.right = 400;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.top = 500;        

                var result = {
                    direction: 1,
                    x: 300,
                    y: 500,
                };
                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });


            it('Should toolbar appear over selection when you select more than one lines bottom to top', function() {
                this.objProps.props.editorEvent.data.selectionData.region.top = 500;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.right = 500;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.top = 500;
                this.objProps.props.editorEvent.data.selectionData.region.startRect.right = 400;
                this.objProps.props.editorEvent.data.selectionData.region.startRect.top = 600;

                var result = {
                    direction: 1,
                    x: 300,
                    y: 500,
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });
        });
        
    });
}());

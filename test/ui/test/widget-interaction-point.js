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
                _getYPoint: AlloyEditor.WidgetInteractionPoint._getYPoint,
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

        describe('When selection is done by mouse', function () {
            it('Should return undefined when toolbar doesn\'t have editorEvent prop', function () {
                this.objProps.props.editorEvent = null;

                assert.isUndefined(AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should appear over selection when select only one line although you set direction as CKEDITOR.SELECTION_TOP_TO_BOTTOM', function () {
                this.objProps.props.editorEvent.data.selectionData.region.direction = 0;

                var result = {
                    direction: 1,
                    x: 20,
                    y: 600
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should appear under selection when select more than one line and direction is 0 and you select top to bottom', function () {
                this.objProps.props.editorEvent.data.selectionData.region.direction = 0;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.top = 700;
                this.objProps.props.editorEvent.data.selectionData.region.top = 700;

                var result = {
                    direction: 0,
                    x: 20,
                    y: 700
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should appear under selection when select more than one line and direction is 0 and you select bottom to top', function () {
                this.objProps.props.editorEvent.data.selectionData.region.direction = 0;
                this.objProps.props.editorEvent.data.selectionData.region.top = 400;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.top = 400;
                this.objProps.props.editorEvent.data.selectionData.region.startRect.top = 700;
                this.objProps.props.editorEvent.data.selectionData.region.bottom = 700;

                var result = {
                    direction: 0,
                    x: 20,
                    y: 700
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should appear over first character of the selection when you select right to left ', function() {

                var result = {
                    direction: 1,
                    x: 20,
                    y: 600
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should appear over last character of the selection', function() {
                this.objProps.props.editorEvent.data.selectionData.region.startRect.left = 30;

                var result = {
                    direction: 1,
                    x: 30,
                    y: 600
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should appear under selection when you select more than one lines top to bottom', function() {
                this.objProps.props.editorEvent.data.selectionData.region.top = 500;
                this.objProps.props.editorEvent.data.selectionData.region.bottom = 10;
                this.objProps.props.editorEvent.data.selectionData.region.startRect.top = 10;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.right = 400;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.top = 500;

                var result = {
                    direction: 1,
                    x: 300,
                    y: 500
                };
                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });


            it('Should appear over selection when you select more than one lines bottom to top', function() {
                this.objProps.props.editorEvent.data.selectionData.region.top = 500;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.right = 500;
                this.objProps.props.editorEvent.data.selectionData.region.endRect.top = 500;
                this.objProps.props.editorEvent.data.selectionData.region.startRect.right = 400;
                this.objProps.props.editorEvent.data.selectionData.region.startRect.top = 600;

                var result = {
                    direction: 1,
                    x: 300,
                    y: 500
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });
        });

        describe('When selection is done by keyboard', function() {
            it('Should appear over selection and it is in the middle of the selection', function() {
                this.objProps.props.editorEvent.data.nativeEvent.pageX = null;
                this.objProps.props.editorEvent.data.selectionData.region.direction = 1;

                var result = {
                    direction: 1,
                    x: 35,
                    y: 600
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });

            it('Should appear under selection (more than one line top to bottom) and it is in the middle of the selection', function() {
                this.objProps.props.editorEvent.data.nativeEvent.pageX = null;
                this.objProps.props.editorEvent.data.selectionData.region.direction = 0;
                this.objProps.props.editorEvent.data.selectionData.region.startRect.top = 500;

                var result = {
                    direction: 0,
                    x: 35,
                    y: 5
                };

                assert.deepEqual(result, AlloyEditor.WidgetInteractionPoint.getInteractionPoint.call(this.objProps));
            });
        });

    });
}());

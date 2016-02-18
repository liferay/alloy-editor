(function() {
     'use strict';

     var assert = chai.assert;
     var Simulate = React.addons.TestUtils.Simulate;
     var TestUtils = React.addons.TestUtils;

     describe('ButtonLink', function() {
         this.timeout(35000);

         before(Utils.createAlloyEditor);

         after(Utils.destroyAlloyEditor);

         beforeEach(Utils.beforeEach);

         afterEach(Utils.afterEach);

         it('should create link with default http protocol', function() {
             bender.tools.selection.setWithHtml(this.nativeEditor, '{selection}');

             var requestExclusiveListener = sinon.stub();

             var cancelExclusive = sinon.stub();

             var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} cancelExclusive={cancelExclusive} requestExclusive={requestExclusiveListener} />, this.container);

             var inputLink = TestUtils.findRenderedDOMComponentWithTag(buttonLink, 'input');

             TestUtils.Simulate.change(inputLink, {target: {value: 'link.com'}});

             var buttonOk = TestUtils.findRenderedDOMComponentWithClass(buttonLink, 'ae-icon-ok');

             Simulate.click(buttonOk.parentNode);

             var data = bender.tools.getData(this.nativeEditor, {
                 fixHtml: true,
                 compatHtml: true
             });

             assert.strictEqual('<p><a href="http://link.com" target="">selection</a></p>', data);
         });

         it('should create link without protocol', function() {
             bender.tools.selection.setWithHtml(this.nativeEditor, '{selection}');

             var requestExclusiveListener = sinon.stub();

             var cancelExclusive = sinon.stub();

             var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} appendProtocol={false} cancelExclusive={cancelExclusive} requestExclusive={requestExclusiveListener} />, this.container);

             var inputLink = TestUtils.findRenderedDOMComponentWithTag(buttonLink, 'input');

             TestUtils.Simulate.change(inputLink, {target: {value: 'link.com'}});

             var buttonOk = TestUtils.findRenderedDOMComponentWithClass(buttonLink, 'ae-icon-ok');

             Simulate.click(buttonOk.parentNode);

             var data = bender.tools.getData(this.nativeEditor, {
                 fixHtml: true,
                 compatHtml: true
             });

             assert.strictEqual('<p><a href="link.com" target="">selection</a></p>', data);
         });
     });
 }());
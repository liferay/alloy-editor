import * as AlloyEditor from '../../src/adapter/main';

import extend from '../../src/oop/oop';
import Attribute from '../../src/oop/attribute';
import Core from '../../src/adapter/core';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

(function() {
    if (!window.React) {
        window.React = React;
    }

    if (!window.ReactDOM) {
        window.ReactDOM = ReactDOM;
    }

    if (!window.ReactTestUtils) {
        window.ReactTestUtils = ReactTestUtils;
    }

    if (!window.AlloyEditor) {
        window.AlloyEditor = AlloyEditor;
        window.ALLOYEDITOR_BASEPATH = 'dist/alloy-editor';

        window.AlloyEditor.Core = Core;
        window.AlloyEditor.Attribute = Attribute;

        if (!window.AlloyEditor.OOP) {
            window.AlloyEditor.OOP = {
                extend
            };
        }
    }
}());

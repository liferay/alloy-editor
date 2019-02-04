import React, { Component } from 'react';
import {JSXComponent} from 'metal-jsx';
import newFunction from '../../utils/newFunction';
import BabelPresetMetalJsx from 'babel-preset-metal-jsx';

import ClayBadge from 'clay-badge';
import {
    ClayAlert, 
    ClayStripe, 
    ClayToast
} from 'clay-alert';
import {
    ClayDropdown,
    ClayActionsDropdown,
    ClayCreationMenuDropdown,
} from 'clay-dropdown';
import ClayButton from 'clay-button';
import * as ClayCharts from 'clay-charts';

import {LiveEditor, LiveProvider} from 'react-live';

// eslint-disable-next-line
const compileES6 = code => Babel.transform(code, {presets: [BabelPresetMetalJsx]}).code;

class CodeEditor extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = this._updateState(props.code);
    }

    componentDidMount() {
        this._render();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.compiled !== this.state.compiled) {
            this._render();
        }
    }

    render() {
        const { 
            code, 
            showBabelErrorMessage,
            error,
        } = this.state;

        let errorMessage;
        if (showBabelErrorMessage) {
            errorMessage = (
                <span>
                    Babel could not be loaded.
                    <br />
                    <br />
                    This can be caused by an ad blocker. If you are using one, consider adding <b>clayui.com</b> to the whitelisted so that try can work again.
                </span>
            );
        } else if (error != null) {
            errorMessage = error.message;
        }

        return(
            <LiveProvider code={code} mountStylesheet={false}>
                <div className="try-playground-editor">
                    <span className="try-playground-title">
                        Live Editor
                    </span>
                    <div className="gatsby-highlight">
                        <LiveEditor onChange={this._onChange.bind(this)} />
                    </div>
                </div>

                {error && (
                    <div className="try-playground-live try-live-error">
                        <span className="try-playground-title">
                            Error
                        </span>
                        <pre className="try-playground-live--preview">
                            {errorMessage}
                        </pre>
                    </div>
                )}
                {!error && (
                    <div className="try-playground-live">
                        <span className="try-playground-title">
                            Result
                        </span>
                        <div className="try-playground-live--preview" ref="mountRef"></div>
                    </div>
                )}
            </LiveProvider>
        );
    }

    _render() {
        if (!this.refs.mountRef) {
            return;
        }

        const { compiled } = this.state;

        try {
            // Metal.js makes an append when we call `Component.render` in a JSX component, 
            // that is, we delete the contents from inside before rendering again.
            this.refs.mountRef.innerHTML = '';

            newFunction(
                JSXComponent,
                this.refs.mountRef,
                compiled,
                [
                    ClayBadge,
                    ClayAlert,
                    ClayStripe,
                    ClayToast,
                    ClayDropdown,
                    ClayActionsDropdown,
                    ClayCreationMenuDropdown,
                    ClayButton,
                    ClayCharts.AreaLineChart,
                    ClayCharts.AreaSplineChart,
                    ClayCharts.AreaStepChart,
                    ClayCharts.BarChart,
                    ClayCharts.BubbleChart,
                    ClayCharts.DonutChart,
                    ClayCharts.GaugeChart,
                    ClayCharts.Geomap,
                    ClayCharts.LineChart,
                    ClayCharts.PieChart,
                    ClayCharts.PredictiveChart,
                    ClayCharts.ScatterChart,
                    ClayCharts.SplineChart,
                    ClayCharts.StepChart,
                ],
                [
                    'ClayBadge',
                    'ClayAlert',
                    'ClayStripe',
                    'ClayToast',
                    'ClayDropdown',
                    'ClayActionsDropdown',
                    'ClayCreationMenuDropdown',
                    'ClayButton',
                    'AreaLineChart',
                    'AreaSplineChart',
                    'AreaStepChart',
                    'BarChart',
                    'BubbleChart',
                    'DonutChart',
                    'GaugeChart',
                    'Geomap',
                    'LineChart',
                    'PieChart',
                    'PredictiveChart',
                    'ScatterChart',
                    'SplineChart',
                    'StepChart',
                ]
            );
        } catch (error) {
            console.error(error);

            this.setState({
                compiled: null,
                error,
            });
        }
    }

    _updateState(code) {
        try {
            const template = `const App = (props) => {return(<div>${code}</div>)};
            Component.render(App, mountNode);`;

            return {
                compiled: compileES6(template),
                error: null,
                code,
            };
        } catch (error) {
            console.error(error);

            const showBabelErrorMessage = !window.Babel;

            return {
                compiled: null,
                error,
                showBabelErrorMessage
            }
        }
    }

    _onChange(code) {
        this.setState(state => this._updateState(code));
    }
}

export default CodeEditor;
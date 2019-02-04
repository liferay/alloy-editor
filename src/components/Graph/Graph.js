import React, { Component } from 'react';
import * as ClayCharts from 'clay-charts';

class Graph extends Component {
    _consoleWarns() {
        const { component, props } = this.props;

        if (!component) {
            console.warn('You must pass the name of the component to the `component` property.');
            return true;
        }

        if (!ClayCharts[component]) {
            console.warn('There is no such component in ClayCharts!');
            return true;
        }

        if (!props) {
            console.warn('It is mandatory to pass the data to the `props` property.');
            return true;
        }

        return false;
    }

    componentDidMount() {
        const { component, props } = this.props;

        if (this._consoleWarns()) {
            return;
        }

        if (typeof window !== 'undefined') {
            const Chart = ClayCharts[component];
            this._chart = new Chart(props, this.refs[`clay-charts-${component}`]);
        }
    }

    componentWillUnmount() {
        if (this._consoleWarns()) {
            return;
        }

        if (typeof window !== 'undefined') {
            this._chart.dispose();
        }
    }

    render() {
        const { component } = this.props;
        const id = `clay-charts-${component}`;

        return(
            <span ref={id} id={id} />
        );
    }
}

export default Graph;
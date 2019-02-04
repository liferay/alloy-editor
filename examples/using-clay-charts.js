<BarChart
    data={[
        {
            id: 'data1',
            data: [100, 20, 30]
        },
        {
            id: 'data2',
            data: [20, 70, 100]
        }
    ]}
/>
<DonutChart
    data={[
        {
            id: 'data1',
            data: [30]
        },
        {
            id: 'data2',
            data: [70]
        }
    ]}
/>
<GaugeChart
    data={[
        {
            id: 'data1',
            data: [87.4]
        }
    ]}
/>
<PredictiveChart
    axisXTickFormat="%b"
    data={[
        {
            data: [
                130,
                340,
                200,
                100,
                40,
                300,
                {low: 140, mid: 180, high: 240},
                {low: 300, mid: 350, high: 380},
                {low: 320, mid: 400, high: 480},
                {low: 100, mid: 200, high: 260},
                {low: 100, mid: 120, high: 140},
                {low: 80, mid: 100, high: 180}
            ],
            id: 'Product 1'
        },
        {
            data: [
                210,
                180,
                30,
                90,
                40,
                120,
                {low: 180, mid: 240, high: 260},
                {low: 360, mid: 420, high: 460},
                {low: 80, mid: 120, high: 180},
                {low: 60, mid: 80, high: 120},
                {low: 10, mid: 20, high: 80},
                {low: 20, mid: 60, high: 100}
            ],
            id: 'Product 2'
        }
    ]}
    predictionDate="2018-06-01"
    timeseries={[
        '2018-01-01',
        '2018-02-01',
        '2018-03-01',
        '2018-04-01',
        '2018-05-01',
        '2018-06-01',
        '2018-07-01',
        '2018-08-01',
        '2018-09-01',
        '2018-10-01',
        '2018-11-01',
        '2018-12-01'
    ]}
/>
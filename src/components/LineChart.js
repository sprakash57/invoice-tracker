import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

const LineChart = ({ state }) => {
    const data = {
        labels: state.stories.hits.map(hit => hit.objectID),
        datasets: [
            {
                label: 'News vote count',
                fill: false,
                lineTension: 0.1,
                borderColor: 'tomato',
                pointBackgroundColor: 'tomato',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'tomato',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                data: state.votes
            }
        ]
    };
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0,
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Votes',
                    fontSize: 18,
                },
                ticks: {
                    stepSize: 20
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'ID',
                    fontSize: 18
                }
            }]
        }
    }

    useEffect(() => {
        const chart = document.querySelector('canvas');
        chart.parentNode.style.height = '256px';
    }, [])

    return (
        <section data-testid='chart'>
            <Line data={data} options={options} />
        </section>
    )
}

const mapState = state => ({
    state: state.storyReducer
})

export default connect(mapState)(LineChart);
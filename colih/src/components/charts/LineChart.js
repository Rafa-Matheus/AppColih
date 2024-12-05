import React from 'react'
import Chart from 'chart.js/auto'
import { Line } from "react-chartjs-2"
import root from '../StaticStyles'

export default function BarChart(props){
    const colors = []
    props.labels.forEach(_ => {
        colors.push(root.primaryColor)
    })

    Chart.defaults.font.family = "NATS Regular"
    Chart.defaults.font.size = "22pt"

    return <div style={{ height: '100%', width: '99%' }}>
        <Line
            data={{
                labels: props.labels,
                datasets: [{
                    label: props.title,
                    data: props.data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderSkipped: false
                }]
            }}
            options={{
                maintainAspectRatio: false,
                scales: {
                    x: {
                        border: {
                          display: false
                        },
                        grid: {
                          color: "rgb(0, 0, 0, 0)"
                        }
                    },
                    y: {
                        border: {
                          display: false
                        },
                        grid: {
                          color: "rgb(0, 0, 0, 0)"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
        }} />
    </div>
}
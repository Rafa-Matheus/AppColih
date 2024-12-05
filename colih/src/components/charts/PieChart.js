import React from 'react'
import Chart from 'chart.js/auto'
import { Pie } from "react-chartjs-2"

export default function BarChart(props){
    const colors = [
        'rgba(255, 99, 132)',
        'rgba(255, 159, 64)',
        'rgba(255, 205, 86)',
        'rgba(75, 192, 192)',
        'rgba(54, 162, 235)',
        'rgba(153, 102, 255)',
        'rgba(201, 203, 207)',
        'rgba(255, 99, 132)'
    ]

    return <div style={{ height: '100%', width: '99%' }}>
        <Pie
            data={{
                labels: props.labels,
                datasets: [{
                    label: props.title,
                    data: props.data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                }]
            }}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "right"
                    }
                }
        }} />
    </div>
}
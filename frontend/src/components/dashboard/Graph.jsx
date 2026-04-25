import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    plugins,
    scales,
} from "chart.js";
import { data } from "react-router-dom";

ChartJS.register(
    BarElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    Legend
);

const Graph = ({graphData = []}) => {
    const labels = graphData.map((item) => item.clickDate);
    const clicks = graphData.map((item) => item.count);

    const data = {
        labels,
        datasets: [
            {
                label: "Clicks",
                data: clicks,
                backgroundColor: "#2563EB",
                borderRadius: 6,
                barThickness: 28,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#0F172A",
                    font: {
                        size: 12,
                    },
                },
            },

            tooltip: {
                backgroundColor: "#0F172A",
                titleColor: "#fff",
                bodyColor: "#fff",
            },
        },

        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#475569",
                    font: {
                        size: 11,
                    },
                },
            },

            y: {
                beginAtZero: true,
                grid: {
                    color: "#E2E8F0",
                },
                ticks: {
                    color: "#475569",
                    callback: function (value) {
                        return Number.isInteger(value) ? value : "";
                    },
                },
            },
        },
    };

    return <Bar data={data} options={options} />
};

export default Graph;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "./Forecast.css";

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type Data = typeof baseData;

type Dataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension: number;
};

const baseData = {
  labels,
  datasets: [
    {
      label: "MRR",
      data: [0, 0, 400, 900, 1400, 2100, 3600, 5400, 8000, 9500, 11550, 13800],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.2,
    },
    {
      label: "Cash Balance ($K) ",
      data: [1453, 1406, 1347, 1275, 1211, 1143, 1057, 969, 866, 761, 648, 525],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.2,
    },
    {
      label: "CLTV",
      data: [
        0, 0, 4800, 7200, 8400, 8400, 12000, 13500, 18000, 18000, 19800, 25200,
      ],
      borderColor: "rgb(255, 191, 0)",
      backgroundColor: "rgba(255, 191, 0, 0.5)",
      tension: 0.2,
    },
    {
      label: "CAC",
      data: [0, 0, 1167, 2333, 3333, 1667, 1667, 2000, 1833, 2778, 4667, 5167],
      borderColor: "rgb(159, 226, 191)",
      backgroundColor: "rgba(159, 226, 191, 0.5)",
      tension: 0.2,
    },
  ],
};

const generateRandomNumber = () => {
  const random = Math.random();
  const randomNumber = random * 0.2 + 1.2;
  const roundedNumber = Math.round(randomNumber * 100) / 100;
  return roundedNumber;
};

const updateData = (baseData: Data) => {
  const updatedData = {
    ...baseData,
    datasets: [
      ...baseData.datasets,
      ...baseData.datasets.map((dataset: Dataset) => ({
        ...dataset,
        label: `${dataset.label} forecast`,
        borderDash: [1, 5],
        data: dataset.data.map(
          (value: number) =>
            Math.round(value * generateRandomNumber() * 100) / 100
        ),
      })),
    ],
  };
  return updatedData;
};

export const Forecast = () => {
  const [data, setData] = useState(baseData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 20,
          padding: 20,
          useBorderRadius: true,
          borderRadius: 2,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
        text: "",
      },
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <section className="section-forcast">
      <article className="canvas">
        <Line options={options} data={data} />
      </article>
      <article className="kpi-scenarios">
        <h2>KPI Scenarios</h2>
        <div className="kpi-scenario-buttons">
          <button
            className="kpi-button"
            onClick={(e) => setData(updateData(baseData))}
          >
            10% Increased Conversion Rate
          </button>
          <button
            className="kpi-button"
            onClick={(e) => setData(updateData(baseData))}
          >
            10% Increased Annual Contract Value
          </button>
          <button className="reset-button" onClick={(e) => setData(baseData)}>
            Reset
          </button>
        </div>
      </article>
      <h2>How to read</h2>
      <p>
        The SaaS Forecast show the core KPI's for your business based on the
        data you have provided. The KPI's are:
      </p>
      <ul className="how-to-list">
        <li>Monthly Recurring Revenue (MRR)</li>
        <li>Cash Balance</li>
        <li>Customer Lifetime Value (CLTV)</li>
        <li>Customer Acquisition Cost (CAC)</li>
      </ul>
      <p>
        By interactiong with the base assumptions in the KPI Scenarios sections
        you can evaluate the effect different actions have on you business.
      </p>
    </section>
  );
};

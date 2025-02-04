import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Customerform.css";
import logo from "./assets/logo1_ramayworldzone.png";
import "./Sidebar";

import "./signup.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import Sidebar from "./Sidebar";
import revenuedata from "./revenudata.json";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);
function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar></Sidebar>

        {/* Main Content Area */}
        <main className="col-12 col-md-9 mt-4 mt-md-0">
          <div className="p-4 bg-light rounded shadow">
            <h3>Welcome to the Dashboard</h3>

            {/* Line Chart */}
            <div className="mt-4">
              <h4>Revenue Overview</h4>
              <Line
                data={{
                  labels: revenuedata.labels, // x-axis labels from JSON
                  datasets: revenuedata.datasets, // datasets from JSON
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Months",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Revenue (in USD)",
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;

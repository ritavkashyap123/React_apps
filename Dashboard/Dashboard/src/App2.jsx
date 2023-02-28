import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as Chartjs } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import * as V from 'victory';
import './App.css';
import {
  AreaChart,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory';

function App() {
  const host = 'http://spritan.pythonanywhere.com/api'
  const [donationData, setDonationData] = useState();
  const [params, setParams] = useState("CO");
  const [searchInput, setSearchInput] = useState('27 Feb 2023');
  const [graphData, setGraphData] = useState(null);



  useEffect(() => {
    const getSensorData = async () => {
      const res = await axios.get(`${host}/sensorData/`)

      let filtered
      let createdAt
      res.data.students.map(student => {
        createdAt = new Date(student.createdAt).toGMTString()
        student.date_here = createdAt.slice(5, 16)
        student.time_here = createdAt.slice(17, 22)


      })
      setDonationData(res.data.students)
      const filteredData = res.data.students.filter(employee => {
        return employee.date_here === searchInput;
      });

      const data_here = filteredData.map(number => {
        return {
          id: number.id,
          x: number.time_here,
          y: parseInt(number[params], 10)
        }

      })
      // data_here.x = filteredData.time_here
      // data_here.y = filteredData[params]
      setGraphData(data_here)
      // console.log(data_here)


    }
    getSensorData()


  }, [])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    const filteredData = donationData.filter(employee => {
      return employee.date_here === searchValue;
    });

    // const data_here = filteredData.map(number => {
    //   return {
    //     id: number.id,
    //     x: number.time_here,
    //     y: parseInt(number[params], 10)
    //   }

    // })
    // data_here.x = filteredData.time_here
    // data_here.y = filteredData[params]
    setGraphData(data_here)
    // console.log(filteredData)
  }
  const searchParams = ((searchValue) => {
    setParams(searchValue)
  })
  return (
    <div className="App">
      <label>select date:
        <input
          type="text"
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
        />
      </label>
      <label>select parameter:
        <input
          type="text"
          value={params}
          onChange={(e) => searchParams(e.target.value)}
        />
      </label>

      <VictoryChart
      // theme={VictoryTheme.material}
      >

        <VictoryAxis
          label="Label"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 5, padding: 30 },
            ticks: { stroke: "grey", size: 5 },
          }}
        />

        <VictoryLine
          data={graphData}
        />
      </VictoryChart>
    </div>
  )
}

export default App

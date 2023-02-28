import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as Chartjs } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
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

function App() {
  const host = 'http://spritan.pythonanywhere.com/api'
  const [donationData, setDonationData] = useState();
  const [params, setParams] = useState("CO");
  const [searchInput, setSearchInput] = useState('27 Feb 2023');
  const [graphData, setGraphData] = useState(null);
  const [max, setMax] = useState(60);



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
      setGraphData(filteredData)
      setMax(Number(Math.max(...filteredData.map(o => o[params]))))


    }
    getSensorData()


  }, [])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    const filteredData = donationData.filter(employee => {
      return employee.date_here === searchValue;
    });
    setGraphData(filteredData)
    setMax(Number(Math.max(...filteredData.map(o => o[params]))))

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
      <div style={{ paddingTop: "3em" }}>
        {donationData !== null ? (

          <ResponsiveContainer width="100%" height={900} >

            <AreaChart
              width={700}
              height={1000}
              data={graphData}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="time_here" />
              {
                 graphData != null ?
                (<YAxis domain={[0, Number(Math.max(...graphData.map(o => o[params])))]} />)
                :
                (<YAxis domain={[0, 20]} />)
              }


              <Tooltip />
              <Area type="monotone" dataKey={params} stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
          // <LineChart width={500} height={300} data={graphData}>
          //   <XAxis dataKey="time_here" />
          //   <YAxis />
          //   <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          //   <Line type="monotone" dataKey={params} stroke="#8884d8" />
          // </LineChart>
        ) : (
          <div className="show">Donation data is null</div>
        )}
      </div>

    </div>
  )
}

export default App

import React from 'react'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2'
import { useTheame } from '../Context/TheamContext';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend 
)

export default function Graphs({graphData}) {
    const {theame} = useTheame();
  return (
    <div>
      <Line
        data={
            {
                labels: graphData.map(i=> i[0]),
                datasets: [
                    {
                        data: graphData.map((i)=>{return i[1]}),
                        label: "WPM",
                        borderColor: theame.textColor,
                        backgroundColor: theame.background
                    }                   
                ]
            }
        }
      />
    </div>
  )
}

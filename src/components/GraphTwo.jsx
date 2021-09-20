import { useEffect } from 'react';
import {Line} from 'react-chartjs-2';

const GraphTwo = ({title, label, dataSet}) => {
  const graphData = {
    labels: [],
    datasets: [
      {
        label,
        data: [],
        fill: false,
        backgroundColor: [
          'rgba(120, 0, 50, 1)',
        ],
        borderColor: [
          'rgba(120, 0, 50, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: 'x',
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  useEffect(()=>{
    dataSet.forEach( ({label, value}) => {
      graphData.labels.push(label);
      graphData.datasets[0].data.push(value);
    })
  }, [])

  return (
    <>
      <div style={{backgroundColor: 'white', padding: '10px', borderRadius: '5px'}}>
        <Line
          data={graphData}
          height={300}
          options={options}
        />
      </div>
    </>
  )
}

export default GraphTwo;
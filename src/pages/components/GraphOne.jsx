import { useEffect } from 'react';
import {Bar} from 'react-chartjs-2';

// Math.floor(Math.random()*16777215).toString(16);
const GraphOne = ({dataSet}) => {
  const graphData = {
    labels: [],
    datasets: [
      {
        label: 'Quantidade de contas abertas',
        data: [2400, 1300, 520, 1000],
        fill: false,
        backgroundColor: [
          'rgba(0, 0, 140, 1)',
          'rgba(0, 120, 0, 1)',
          'rgba(0, 100, 220, 1)',
          'rgba(120, 0, 50, 1)',
        ],
        borderColor: [
          'rgba(0, 0, 140, 1)',
          'rgba(0, 120, 0, 1)',
          'rgba(0, 100, 220, 1)',
          'rgba(120, 0, 50, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Contas abertas - BOT',
      },
    },
  };

  // useEffect(()=>{
  //   dataSet.forEach( data => {
  //     graphData.labels.push(data.label);
  //     graphData.datasets[0]
  //   })
  // }, [dataSet])

  return (
    <>
      <div style={{backgroundColor: 'white', padding: '10px', borderRadius: '5px'}}>
        <Bar
          data={graphData}
          height={300}
          options={options}
        />
      </div>
    </>
  )
}

export default GraphOne;
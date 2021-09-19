import { useEffect } from 'react';
import {Bar} from 'react-chartjs-2';

const getRandomColor = () => Math.floor(Math.random()*16777215).toString(16);

const GraphOne = ({title, label, dataSet}) => {
  const graphData = {
    labels: [],
    datasets: [
      {
        label: label,
        data: [],
        fill: false,
        backgroundColor: [],
        borderColor: [],
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
        text: title,
      },
    },
  };

  useEffect(()=>{
    dataSet.forEach( ({label, value, color}) => {
      const dataColor = color || `#${getRandomColor()}`;
      graphData.labels.push(label);
      graphData.datasets[0].data.push(value);
      graphData.datasets[0].backgroundColor.push(dataColor);
      graphData.datasets[0].borderColor.push(dataColor);
    })
  }, [dataSet])

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
import GraphOne from './components/GraphOne';
import GraphTwo from './components/GraphTwo';

const Dashboard = () => {

  const graphOneData = [
    { label:'Zapelino', value:1300},
    { label:'Oi', value:520},
    { label:'BRB', value:1000},
    { label:'BRB Nação', value:2400}
  ]
  return (
    <>
      <div style={{backgroundColor: 'white', padding: '10px', borderRadius: '5px'}}>
        <GraphOne 
          dataSet={graphOneData}
        />
        <hr />
        <GraphTwo />
      </div>
    </>
  )
}

export default Dashboard;
import { ContentWrapper } from '../components';
import GraphOne from '../components/GraphOne';
import GraphTwo from '../components/GraphTwo';
import BarChartIcon from '@material-ui/icons/BarChart';

const Dashboard = () => {

  const graphOneData = [
    { label: 'Zapelino', value: 1300 },
    { label: 'Oi', value: 520 },
    { label: 'BRB', value: 1000 },
    { label: 'BRB Nação', value: 2400 }
  ]

  const graphTwoData = [
    { label: 1, value: 2400 },
    { label: 2, value: 1300 },
    { label: 3, value: 520 },
    { label: 4, value: 1000 },
    { label: 5, value: 3400 },
    { label: 6, value: 300 },
    { label: 7, value: 3520 },
    { label: 8, value: 900 },
    { label: 9, value: 4400 },
    { label: 10, value: 2300 },
    { label: 11, value: 1520 },
    { label: 12, value: 700 },
    { label: 13, value: 5400 },
    { label: 14, value: 1300 },
    { label: 15, value: 7520 },
    { label: 16, value: 3000 }
  ]
  
  return (
    <>
      <ContentWrapper
        header={{
          bgColor:'transparent',
          title: 'Dashboard',
          leftIcon: BarChartIcon
        }}
      >
        <div style={{backgroundColor: 'white', padding: '10px', borderRadius: '5px'}}>
          <GraphOne 
            title='Contas abertas - BOT'
            label='Quantidade de contas abertas'
            dataSet={graphOneData}
          />
          <hr />
          <GraphTwo
            label='Quantidade de transações PIX'
            dataSet={graphTwoData}
          />
        </div>
      </ContentWrapper>
    </>
  )
}

export default Dashboard;
import './index.css';
import { useEffect, useState } from "react";
import ContentWrapper from '../components/ContentWrapper';
import ForumIcon from '@material-ui/icons/Forum';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles, Dialog
} from '@material-ui/core';

import { FilterForm, MessageForm } from '../../components';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

const Home = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const getMessages = async (filter='') => {
    let url = `api/messages${filter}`;
    const response = await fetch(url);
    return await response.json();
  }

  useEffect(()=>{
    ( async () => {
      const msgs = await getMessages()
      setMessages(msgs);
    })();
  }, []);

  const handleFormSubmit = async ({channel, trigger, timer}) => {
    const msgs = await getMessages(`?channel=${channel}&trigger=${trigger}&timer=${timer}`);
    setMessages(msgs);
  }

  const showMessage = (message) => { 
    setModalOpen(true)
    setSelectedMessage(message)
  }

  return (
    <>
      <ContentWrapper
        header={{
          bgColor:'transparent',
          title: 'Mensagens',
          leftIcon: ForumIcon
        }}>
        <div className='homePageContent'>
          <FilterForm onSubmit={handleFormSubmit}/>

          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Canal</TableCell>
                  <TableCell>Gatilho</TableCell>
                  <TableCell>Timer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  messages.map(
                    (message, idx) => (
                      <TableRow key={idx}
                        hover
                        onClick={()=>{ showMessage(message)}}>
                        <TableCell>{message.channel}</TableCell>
                        <TableCell>{message.trigger}</TableCell>
                        <TableCell>{message.timer}</TableCell>
                      </TableRow>
                    )
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ContentWrapper>
      <Dialog
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={modalOpen}
        onClose={()=> setModalOpen(false)}
        className={classes.modal}
      >
        <MessageForm message={selectedMessage}/> 
      </Dialog>
    </>
  )
}

export default Home;
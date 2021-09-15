import './index.css';
import { useEffect, useState } from "react";
import ContentWrapper from '../components/ContentWrapper';
import ForumIcon from '@material-ui/icons/Forum';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles, Dialog, Button
} from '@material-ui/core';

import { FilterForm, MessageDetails, MessageForm } from '../../components';

const Home = () => {
  const [messages, setMessages] = useState([]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [addMessageModalOpen, setAddMessageModalOpen] = useState(false);
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

  const NewMessageButton = () => {
    return(
      <Button
        startIcon={<AddCommentIcon />}
        variant='contained'
        color='primary'
        onClick={() => {
          setAddMessageModalOpen(true);
        }}
      >
        Adicionar
      </Button>
    )
  }

  return (
    <>
      <ContentWrapper
        header={{
          bgColor:'transparent',
          title: 'Mensagens',
          leftIcon: ForumIcon,
          rightContent: NewMessageButton
        }}
      >
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
      
      { modalOpen && <MessageDetails message={selectedMessage} onClose={()=>setModalOpen(false)}/>}
      { addMessageModalOpen && <MessageForm onClose={
        async () => {
          const msgs = await getMessages()
          setMessages(msgs);
          setAddMessageModalOpen(false)
        }
      }/>}
    </>
  )
}

export default Home;
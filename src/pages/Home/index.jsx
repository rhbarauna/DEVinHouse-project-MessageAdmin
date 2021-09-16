import { useEffect, useState } from "react";
import ContentWrapper from '../components/ContentWrapper';
import ForumIcon from '@material-ui/icons/Forum';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, LinearProgress
} from '@material-ui/core';
import { FilterForm, MessageDetails, MessageForm } from '../../components';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(
  (theme) => ({
    content: {
      padding:'0 20px'
    },
    tr:{
      cursor: 'pointer'
    }
  })
)

const Home = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addMessageModalOpen, setAddMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMessages = async (filter='') => {
    setLoading(true);
    let url = `api/messages${filter}`;
    const response = await fetch(url);
    return await response.json();
  }

  const updateMessages = (msgs) => {
    setLoading(false);
    setMessages(msgs);
  }

  useEffect(()=>{
    ( async () => {
      const msgs = await getMessages()
      updateMessages(msgs);
    })();
  }, []);

  const handleFormSubmit = async ({channel, trigger, timer}) => {
    const msgs = await getMessages(`?channel=${channel}&trigger=${trigger}&timer=${timer}`);
    updateMessages(msgs);
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
        <div className={classes.content}>
          <FilterForm onSubmit={handleFormSubmit}/>

          {loading && <LinearProgress />}
          {!loading && 
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow variant='head'>
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
                          classes={classes.tr}
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
          }
        </div>
      </ContentWrapper>
      
      { modalOpen && <MessageDetails message={selectedMessage} onClose={()=>setModalOpen(false)}/>}
      { addMessageModalOpen && <MessageForm
        onClose={()=>setAddMessageModalOpen(false)}
        onAddMessage={
          async () => {
            setAddMessageModalOpen(false)
            const msgs = await getMessages()
            updateMessages(msgs);
          }
        }
      />}
    </>
  )
}

export default Home;
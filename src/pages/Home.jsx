import { useEffect, useState } from "react";
import ContentWrapper from './components/ContentWrapper';
import ForumIcon from '@material-ui/icons/Forum';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Button, LinearProgress } from '@material-ui/core';
import { FilterForm, MessageDetails, MessageForm, MessageTable } from '../components';
import {makeStyles} from '@material-ui/core';
import {getMessages as getApiMessages} from '../services/api';

const useStyles = makeStyles(
  (theme) => {
    return {
      content: {
        paddingLeft:theme.spacing(3),
        paddingRight:theme.spacing(3)
      },
    }
  }
)

const Home = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addMessageModalOpen, setAddMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMessages = async (filter) => {
    setLoading(true);
    const messages = await getApiMessages(filter);
    return messages.data;
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

  const handleFormFilterSubmit = async ({channel, trigger, timer}) => {
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
        color='secondary'
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
          <FilterForm onSubmit={handleFormFilterSubmit}/>
          <MessageTable
            data={messages}
            onRowClick={(message)=>{showMessage(message)}} 
          />
          {loading && <LinearProgress />}
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
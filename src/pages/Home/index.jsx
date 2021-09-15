import './index.css';
import { useEffect, useState } from "react";
import ContentWrapper from '../components/ContentWrapper';
import ForumIcon from '@material-ui/icons/Forum';
import { Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, makeStyles, Dialog
} from '@material-ui/core';

import { MessageForm } from '../../components';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

const Home = () => {
  const classes = useStyles();
  const [channels, setChannels] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [formChannel, setFormChannel] = useState('');
  const [formTrigger, setFormTrigger] = useState('');
  const [formTimer, setFormTimer] = useState('');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const getMessages = async (filter='') => {
    let url = `api/messages${filter}`;
    const response = await fetch(url);
    return await response.json();
  }

  useEffect(() => {
    ( async () => {
      const response = await fetch('api/channels');
      const chs = await response.json();
      setChannels(chs);
    })();
  }, []);

  useEffect(()=>{
    ( async () => {
      const response = await fetch('api/triggers');
      const trgs = await response.json();
      setTriggers(trgs);
    })();
  }, []);

  useEffect(()=>{
    ( async () => {
      const msgs = await getMessages()
      setMessages(msgs);
    })();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const msgs = await getMessages(`?channel=${formChannel}&trigger=${formTrigger}&timer=${formTimer}`);
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
          <form className='searchForm' onSubmit={handleFormSubmit}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="channel_select">Canal</InputLabel>
              <Select
                label="Canal"
                value={formChannel}
                onChange={(e)=>setFormChannel(e.target.value)}
                inputProps={{
                  name: 'channel',
                  id: 'channel_select',
                }}
              >
                <MenuItem aria-label='None' value=" " />
                {
                  channels.map((channel, idx) => (
                    <MenuItem key={idx} value={channel.name}>
                      {channel.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="trigger_select">Gatilho</InputLabel>
              <Select
                label="Gatilho"
                value={formTrigger}
                onChange={(e)=>setFormTrigger(e.target.value)}
                inputProps={{
                  name: 'trigger',
                  id: 'trigger_select',
                }}
              >
                <MenuItem aria-label='None' value="" />
                {
                  triggers.map((trigger, idx) => (
                    <MenuItem key={idx} value={trigger.name}>
                      {trigger.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <TextField 
                variant='outlined'
                id='timer_input'
                name="timer"
                label="Timer"
                value={formTimer}
                onChange={(e)=>setFormTimer(e.target.value)}
              />
            </FormControl>
            <Button type='submit' variant="contained" color='primary'>Filtrar</Button>
          </form>

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
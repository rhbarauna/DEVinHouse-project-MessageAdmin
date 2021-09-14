import './index.css';
import { useEffect, useState } from "react";
import ContentWrapper from '../components/ContentWrapper';
import ForumIcon from '@material-ui/icons/Forum';
import { Button, FormControl, InputLabel, MenuItem, Modal, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField
} from '@material-ui/core';
import {useLocation} from 'react-router-dom';
import { MessageForm } from '../../components';

const Home = () => {
  const [channels, setChannels] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [formChannel, setFormChannel] = useState('');
  const [formTrigger, setFormTrigger] = useState('');
  const [formTimer, setFormTimer] = useState('');

  const [modalOpen, setModalOpen] = useState(true);

  const location = useLocation();
  const queryParams = location.search;

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
      let url = 'api/messages';
      if(queryParams) {
        url+=queryParams;
      }
      const response = await fetch(url);
      const msgs = await response.json();
      setMessages(msgs);
    })();
  }, [queryParams]);
  
  useEffect(()=>{
    const searchParams = new URLSearchParams(queryParams);
    const channel = searchParams.get('channel')
    if(channel) {
      setFormChannel(channel)
    }

    const trigger = searchParams.get('trigger')
    if(trigger) {
      setFormTrigger(trigger)
    }

    const timer = searchParams.get('timer')
    if(timer) {
      setFormTimer(timer)
    }

  }, [queryParams])

  const handleFormSubmit = (event) => {
    event.prevenTableCellefault(); 
  }

  const showMessage = (message) => { 
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
          <form className='searchForm'>
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
                <MenuItem aria-label='None' value="" />
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
            <InputLabel htmlFor="time_input">Timer</InputLabel>
              <TextField 
                variant='outlined'
                id='timer_input'
                name="timer"
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
      <Modal
        open={modalOpen}
        onClose={()=> setModalOpen(false)}
      >
        <MessageForm />
      </Modal>
    </>
  )
}

export default Home;
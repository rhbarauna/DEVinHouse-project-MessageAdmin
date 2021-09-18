import { useState } from 'react';
import { TextField, Button, FormControl, InputLabel,
  MenuItem, Select, DialogActions, makeStyles} from '@material-ui/core';
import { Modal } from '.';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { saveMessage } from '../services/api';

const useStyles = makeStyles({
  addForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'space-between',
    width: '500px'
  }
})

const messageSchema = yup.object().shape({
  channel: yup.string().required('Escolha o canal da mensagem'),
  trigger: yup.string().required('Escolha o gatilho da mensagem'),
  timer: yup.string()
    .required('Informe o horario da mensagem')
    .matches(/^[0-9]+:[0-5][0-9]$/, "Pecisa estar no formato H(H...):MM"),
  message: yup.string().required('Informe a mensagem'),
});


const MessageForm = ({ onAddMessage, onClose }) => {
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const {channels, triggers} = useSelector((store) => store);

  const [formChannel, setFormChannel] = useState('');
  const [formTrigger, setFormTrigger] = useState('');
  const [formTimer, setFormTimer] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const [channelError, setChannelError] = useState(false);
  const [triggerError, setTriggerError] = useState(false);
  const [timerError, setTimerError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = {
        channel: formChannel,
        trigger: formTrigger,
        timer: formTimer,
        message: formMessage
      }

      await messageSchema.validate(formData, {
        abortEarly: false
      });
    
      await saveMessage(formData);

      enqueueSnackbar('Mensagem registrada com sucesso', {variant: 'success'});
      onAddMessage();
    }catch(e){
      console.dir(e);
      if(e.name === 'ValidationError'){
        e.inner.forEach(error => {
          switch(error.path){
            case 'channel':
              return setChannelError(true);
            case 'trigger':
              return setTriggerError(true);
            case 'timer':
              return setTimerError(true);
            case 'message':
            default:
              return setMessageError(true);
          }
        });
      }
      enqueueSnackbar(e.message, {variant: 'error'});
    }
  }

  return (
    <Modal
      onClose={onClose}
      title='Nova Mensagem'
    >
        <form className={classes.addForm} onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="channel_select">Canal</InputLabel>
            <Select
              error={channelError}
              label="Canal"
              value={formChannel}
              onChange={(e)=> {
                setChannelError(false);
                setFormChannel(e.target.value)
              }}
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
              error={triggerError}
              label="Gatilho"
              value={formTrigger}
              onChange={(e)=>
                {
                  setTriggerError(false);
                  setFormTrigger(e.target.value)
                }
              }
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
              error={timerError}
              variant='outlined'
              id='timer_input'
              name="timer"
              label="Timer"
              value={formTimer}
              onChange={(e)=> {
                setFormTimer(e.target.value)
                setTimerError(false);
              }}
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <TextField 
              multiline
              error={messageError}
              variant='outlined'
              id='message_input'
              name="message"
              label="Mensagem"
              rows={5}
              value={formMessage}
              onChange={(e)=>{
                setMessageError(false);
                setFormMessage(e.target.value);
              }}
            />
          </FormControl>
          <DialogActions>
            <Button type='submit' variant="contained" color='primary'>Cadastrar</Button>
          </DialogActions>
        </form>
    </Modal>
  )
}
export default MessageForm;
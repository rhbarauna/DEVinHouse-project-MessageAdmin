import { useState } from 'react';
import { TextField, Button, FormControl, InputLabel,
  MenuItem, Select, DialogActions, makeStyles, FormHelperText} from '@material-ui/core';
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
  const [formTimer, setFormTimer]     = useState('');
  const [formMessage, setFormMessage] = useState('');

  const [channelError, setChannelError] = useState('');
  const [triggerError, setTriggerError] = useState('');
  const [timerError, setTimerError]     = useState('');
  const [messageError, setMessageError] = useState('');

  const validateForm = async (data) => {
    try{
      await messageSchema.validate(data, {
        abortEarly: false
      });
    } catch(e){
      e.inner.forEach(({message, path}) => {
        switch(path){
          case 'channel':
            setChannelError(message);
            return;
          case 'trigger':
            setTriggerError(message);
            return;
          case 'timer':
            setTimerError(message);
            return;
          case 'message':
          default:
            setMessageError(message);
            return;
        }
      });
      throw e;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = {
        channel: formChannel,
        trigger: formTrigger,
        timer: formTimer,
        message: formMessage
      }
      
      await validateForm(formData)
      await saveMessage(formData);

      enqueueSnackbar('Mensagem registrada com sucesso', {variant: 'success'});
      onAddMessage();
    }catch(e){
      if(e.name === 'ValidationError'){
        return;
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
          <FormControl fullWidth variant="outlined"
            error={channelError}
          >
            <InputLabel htmlFor="channel_select">Canal</InputLabel>
            <Select
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
            <FormHelperText>{channelError}</FormHelperText>
          </FormControl>
          <FormControl fullWidth variant="outlined"
            error={triggerError}
          >
            <InputLabel htmlFor="trigger_select">Gatilho</InputLabel>
            <Select
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
            <FormHelperText>{triggerError}</FormHelperText>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField 
              error={timerError}
              helperText={timerError}
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
              helperText={messageError}
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
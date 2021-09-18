import { useState } from 'react';
import { Button, DialogActions, makeStyles }from '@material-ui/core';
import { FormInputText, FormSelect, Modal } from '.';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { saveMessage } from '../services/api';

const useStyles = makeStyles(
  (theme) => ({
    form:{
      maxWidth: '500px'
    },
  })
)

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
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormSelect
            id='channel_select'
            name='channel'
            label='Canal'
            value={formChannel}
            errorMessage={channelError}
            onChange={(e)=> {
              setChannelError(false);
              setFormChannel(e.target.value)
            }} 
            options={channels}
          />
          <FormSelect
            id='trigger_select'
            name='trigger'
            label="Gatilho"
            value={formTrigger}
            errorMessage={triggerError}
            onChange={(e)=>{
                setTriggerError(false);
                setFormTrigger(e.target.value)
            }}
            options={triggers}
          />
          <FormInputText
            id='timer_input'
            name="timer"
            label="Timer"
            value={formTimer}
            onChange={(e)=> {
              setFormTimer(e.target.value)
              setTimerError(false);
            }}
            errorMessage={timerError}
            helperText={timerError}
          />
          <FormInputText
            id='message_input'
            name="message"
            label="Mensagem"
            value={formMessage}
            onChange={(e)=>{
              setMessageError(false);
              setFormMessage(e.target.value);
            }}
            errorMessage={messageError}
            helperText={messageError}  
            multiline
            rows={5}    
          />
          
          <DialogActions>
            <Button type='submit' variant="contained" color='primary'>Cadastrar</Button>
          </DialogActions>
        </form>
    </Modal>
  )
}
export default MessageForm;
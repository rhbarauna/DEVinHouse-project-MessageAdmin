import { Button, makeStyles} from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormInputText, FormSelect } from '.';

const useStyles = makeStyles({
  searchForm: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '20px'
  }
})
  
const FilterForm = ({onSubmit, id='', name=''}) => {
  const {channels, triggers} = useSelector((state) => state);
  
  const classes = useStyles();
  const [formChannel, setFormChannel] = useState('');
  const [formTrigger, setFormTrigger] = useState('');
  const [formTimer, setFormTimer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      channel: formChannel,
      trigger: formTrigger,
      timer: formTimer,
    })
  }

  return (
    <form id={id} name={name} className={classes.searchForm} onSubmit={handleSubmit}>
      <FormSelect
        id='channel_select'
        name='channel'
        label='Canal'
        value={formChannel}
        onChange={(e)=>setFormChannel(e.target.value)} 
        options={channels}
      />
      <FormSelect
        id='trigger_select'
        name='trigger'
        label="Gatilho"
        value={formTrigger}
        onChange={(e)=>setFormTrigger(e.target.value)}
        options={triggers}
      />
      <FormInputText
        id='timer_input'
        name="timer"
        label="Timer"
        value={formTimer}
        onChange={(e)=>setFormTimer(e.target.value)}
      />
      <Button 
        type='submit'
        variant="contained"
        color='secondary'>
        Filtrar
      </Button>
    </form>
  )
}

export default FilterForm;
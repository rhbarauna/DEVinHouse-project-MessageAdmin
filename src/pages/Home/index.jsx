import './index.css';
import { createElement, useEffect, useState } from "react";

const Home = () => {
  const [channels, setChannels] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [messages, setMessages] = useState([]);

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
      const response = await fetch('api/messages');
      const msgs = await response.json();
      setMessages(msgs);
    })();
  }, []);
  
  const handleFormSubmit = (event) => {
    event.preventDefault(); 
  }

  const showMessage = (message) => {
    
  }

  return (
    <>
      <div>
        <form className='searchForm' onSubmit={handleFormSubmit}>
          <select name="channel" id="channel_select">
            <option></option>
            {
              channels.map((channel, idx) => (
                <option key={idx} value={channel.id}>{channel.name}</option>
              ))
            }
          </select>
          <select name="trigger" id="trigger_select">
            <option></option>
            {
              triggers.map((trigger, idx) => (
                <option key={idx} value={trigger.id}>{trigger.name}</option>
              ))
            }
          </select>

          <input type="text" name="trigger" placeholder=''/>
          <button type='submit'>Filtrar</button>
        </form>

        <div className='tableContainer'>
          <table className='messagesTable'>
            <thead>
              <tr>
                <th>Canal</th>
                <th>Gatilho</th>
                <th>Tempo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                messages.map(
                  (message, idx) => (
                    <tr key={idx}>
                      <td>{message.channel}</td>
                      <td>{message.trigger}</td>
                      <td>{message.timer}</td>
                      <td>
                        <button onClick={()=>{ showMessage(message)}}>Ver Mensagem</button>
                      </td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <Modal 
        body={modalBody}
        showModal={showModal}

      />
      
    </>
  )
}

export default Home;

const Modal = ({header, body, footer}) => {
  return (
    <div className='modalWrapper'>
      <div className='modalContainer'>
        <div className='modalBody'>
        {createElement(body, {})}
        </div>
        <div className='modalFooter'>
          {createElement(footer, {})}
        </div>
      </div>
    </div>
  )
}
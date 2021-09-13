import './index.css';
import { useEffect, useState } from "react";

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
  
  return (
    <>
      <div>
        <form class='searchForm'>
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
                  ({id, channel, trigger, timer, message}, idx) => (
                    <tr>
                      <td>{channel}</td>
                      <td>{trigger}</td>
                      <td>{timer}</td>
                      <td>
                        <button>Botão</button>
                      </td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home;
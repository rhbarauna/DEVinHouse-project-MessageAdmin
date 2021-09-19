import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router";
import { useEffect } from "react";
import {useDispatch} from 'react-redux';
import { SET_CHANNELS } from "../stores/channel/actions";
import { SET_TRIGGERS } from "../stores/trigger/actions";
import {getTriggers, getChannels} from '../services/api';


const PrivateRoutes = ({redirectTo='/login', children, ...props}) => {
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch()
console.log(auth)
  useEffect(() => {
    ( async () => {
      const chs = await getChannels();
      const action = SET_CHANNELS(chs.data);
      dispatch(action);
    })();
  }, []);

  useEffect(()=>{
    ( async () => {
      const trgs = await getTriggers();
      const action = SET_TRIGGERS(trgs.data);
      dispatch(action);
    })();
  }, []);

  return (
    <>
      <Route
        render={
          () => (
            !auth.loggedIn ? <Redirect to={redirectTo}/> : children
          )
        }
      />
    </>
  )
}

export default PrivateRoutes;
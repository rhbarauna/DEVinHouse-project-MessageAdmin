import { Slide } from "@material-ui/core";
import { SnackbarProvider as NotiStackbarProvider} from 'notistack';

const snackbarProps = {
  maxSnack:5,
  anchorOrigin:{
    vertical: 'top',
    horizontal: 'right',
  },
  autoHideDuration:3500,
  TransitionComponent:Slide
}
const SnackbarProvider = ({children}) => {
  return (
    <NotiStackbarProvider {...snackbarProps}>
      {children}
    </NotiStackbarProvider>
  )
}

export default SnackbarProvider;
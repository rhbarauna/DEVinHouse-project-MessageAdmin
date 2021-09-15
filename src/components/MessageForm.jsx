import { Grid, Typography, makeStyles, DialogTitle, DialogContentText, DialogContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 600,
  },
  rowLabel: {
    minWidth: '100px'
  }
}));

const MessageForm = ({message}) => {
  const classes = useStyles()
  return (
    <div>
      <DialogTitle>Detalhes da Mensagem</DialogTitle>
      <DialogContent>
      <Grid container>
        <Grid item container>
          <Grid item className={classes.rowLabel}>
            <Typography variant='button' component='span'>Canal</Typography>
          </Grid>
          <Grid item>
            {message.channel}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item className={classes.rowLabel}>
          <Typography variant='button' component='span'>Gatilho</Typography>
          </Grid>
          <Grid item>
            {message.trigger}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item className={classes.rowLabel}>
            <Typography variant='button' component='span'>Timer</Typography>
          </Grid>
          <Grid item>
            {message.timer}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item className={classes.rowLabel}>
            <Typography variant='button' component='span'>Mensagem</Typography>
          </Grid>
          <DialogContentText>
            {message.message}
          </DialogContentText>
        </Grid>
      </Grid>
      </DialogContent>
    </div>
  )
}
export default MessageForm;
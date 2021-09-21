import { AppBar, Box, Container, Toolbar, Slide, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(
  (theme) => {
    return {
      appBar: {
        zIndex: theme.zIndex.drawer + 1
      }
    }
  }
);

const Header = () => {
  const classes = useStyles();
  return (
    <Slide direction="down" in mountOnEnter unmountOnExit className={classes.appBar}>
      <AppBar position='fixed' color='primary'>
        <Toolbar>
            <Link to='/'>
              <Typography component='h1' variant='h4'>
                NAV
              </Typography>
            </Link>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default Header;
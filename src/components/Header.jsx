import { Box, Container, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
  header:{
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderBottom: '1px solid #c1c1c1',
    boxShadow: '1px 1px 5px #c1c1c1'
  },
  h1:{
    marginRight: '60px'
  },
  li:{
    padding: '15px 10px',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 600,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f1f1f125',
      textShadow: '1px 0px 5px #51515135',
    }
  },
  flex:{
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: 0
  }
}))


const Header = ({theme}) => {
  const history = useHistory();
  const classes = useStyles(theme);
  const navigate = (route) => {
    history.push(route);
  }
  const routes = [
    { path: '/messages', label: 'Mensagens'},
    { path: '/dashboard', label: 'Dashboard'},
  ]

  return <>
    <div className={classes.header}>
      <Container className={classes.flex}>
        <Link to='/'>
          <h1 className={classes.h1}>NAV</h1>
        </Link>
        <nav>
          <ul className={classes.flex}>
            {
              routes.map(
                (route, idx) => (
                  <li className={classes.li} key={idx} onClick={()=>navigate(route.path)}>
                    {route.label}
                  </li>
                )
              )
            }
          </ul>
        </nav>
      </Container>
    </div>
  </>  
}

export default Header;
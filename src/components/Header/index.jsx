import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './index.css';

const Header = () => {
  
  const routes = [
    { path: '/messages', label: 'Mensagens'},
    { path: '/dashboard', label: 'Dashboard'},
  ]

  return <>
    <div className='header'>
      <Box className="container">
        <Link to='/'>
          <h1>NAV</h1>
        </Link>
        <nav>
          <ul>
            {
              routes.map(
                (route, idx) => (
                  <Link
                    component='li'
                    key={idx}
                    to={route.path}
                  >
                    {route.label}
                  </Link>
                )
              )
            }
          </ul>
        </nav>
      </Box>
    </div>
  </>  
}

export default Header;
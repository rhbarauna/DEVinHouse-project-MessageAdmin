import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './index.css';

const Header = () => {
  const history = useHistory();
  const navigate = (route) => {
    history.push(route);
  }
  const routes = [
    { path: '/messages', label: 'Mensagens'},
    { path: '/dashboard', label: 'Dashboard'},
  ]

  return <>
    <div className='header'>
      <div className="container">    
        <Link to='/'>
          <h1>NAV</h1>
        </Link>
        <nav>
          <ul>
            {
              routes.map(
                (route, idx) => (
                  <li key={idx} onClick={()=>navigate(route.path)}>
                    {route.label}
                  </li>
                )
              )
            }
          </ul>
        </nav>
      </div>
    </div>
  </>  
}

export default Header;
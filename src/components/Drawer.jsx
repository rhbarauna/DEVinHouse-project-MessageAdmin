import { Box, Drawer as MuiDrawer, List, ListItem, ListItemIcon,
  ListItemText, makeStyles, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

const buildStyles = makeStyles((theme) => ({
  drawer:{
    width: 240,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
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
}))

const Drawer = ({routes=[], ...props}) => {
  const styles = buildStyles();
  return (
    <>
      <MuiDrawer
        variant='permanent'
        anchor='left'
        className={styles.drawer}
      >
        <Toolbar />
        <Box component='nav' overflow='auto'>
          <List>
            {
              routes.map(
                ({path, label, icon}, idx) => (
                  <ListItem>
                    <Link key={idx} to={path}>
                      {icon && <ListItemIcon></ListItemIcon> }
                      <ListItemText>{label}</ListItemText>
                    </Link>
                  </ListItem>
                )
              )
            }
          </List>
          <Box display='flex' flexDirection='column'>
            
          </Box>
        </Box>
      </MuiDrawer>
    </>
  )
}

export default Drawer;
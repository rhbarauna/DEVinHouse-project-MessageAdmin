import { Box, Drawer as MuiDrawer, List, ListItem, ListItemIcon,
  ListItemText, makeStyles, Slide, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const drawerWidth = 200
const buildStyles = makeStyles((theme) => ({
  drawer:{
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: drawerWidth,
      boxSizing: 'border-box'
    },
  },
  li:{
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f1f1f1',
    }
  },
}))

const Drawer = ({routes=[], ...props}) => {
  const styles = buildStyles();
  const {push} = useHistory();

  const pushTo = (path) => {
    push(path);
  }

  return (
    <>
      <Slide direction="right" in mountOnEnter unmountOnExit>
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
                    <ListItem key={idx}
                      className={styles.li}
                      onClick={()=> pushTo(path)}>
                      {icon && <ListItemIcon></ListItemIcon> }
                      <ListItemText>{label}</ListItemText>
                    </ListItem>
                  )
                )
              }
            </List>
            <Box display='flex' flexDirection='column'>
              
            </Box>
          </Box>
        </MuiDrawer>
      </Slide>
    </>
  )
}

export default Drawer;
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core"
import {createElement} from 'react';

const PageContentHeader = ({leftIcon, title, headerBgColor, ...props}) => {
  return (
    <Box>
      <AppBar
        position="relative"
        color={headerBgColor || 'secondary'}
        elevation={0}
        square={false}
        style={{
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <Toolbar disableGutters> 
          <div style={{width: 60, height:'100%', textAlign: 'center', padding:'2'}}>
            {leftIcon && createElement(leftIcon, {})}
          </div>
          <Typography variant="h5"> {title} </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default PageContentHeader;
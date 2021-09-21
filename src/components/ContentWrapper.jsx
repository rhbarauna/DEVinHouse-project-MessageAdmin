import { Box, Paper } from '@material-ui/core';
import React from 'react';
import { PageContentHeader } from '.';

const ContentWrapper = ({header, children, ...props}) => {
  return (
    <>
      <Paper>
        <PageContentHeader
          headerBgColor={header && header.bgColor}
          leftIcon={header && header.leftIcon}
          title={header && header.title}
          rightContent={header && header.rightContent}
        />
        <Box mt={2} paddingBottom={5}>
          { children }
        </Box>
      </Paper>
    </>
  );
}

export default ContentWrapper;
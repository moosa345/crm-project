import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight = false,
      modal = false,
      ...others
    },
    ref
  ) => {
    return (
      <Card
        elevation={elevation || 0}
        sx={(theme) => ({
          position: 'relative',
          ...(border && { border: `1px solid ${theme.palette.divider}` }),
          borderRadius: 3,
          boxShadow: boxShadow && !border ? shadow || theme.customShadows?.z1 : 'inherit',
          ':hover': { boxShadow: boxShadow ? shadow || theme.customShadows?.z1 : 'inherit' },
          ...(codeHighlight && {
            '& pre': {
              margin: 0,
              padding: '12px !important',
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.75rem'
            }
          }),
          ...(modal && {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: `calc(100% - 40px)`, sm: 'auto' },
            maxWidth: 768
          }),
          ...(typeof sx === 'function' ? sx(theme) : sx || {})
        })}
        ref={ref}
        {...others}
      >
        {!darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}

        {title && divider && <Divider />}

        {content ? <CardContent sx={contentSX}>{children}</CardContent> : children}
      </Card>
    );
  }
);

MainCard.displayName = 'MainCard';

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.any,
  shadow: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  codeHighlight: PropTypes.bool,
  modal: PropTypes.bool
};

export default MainCard;
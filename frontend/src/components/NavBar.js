import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AdbIcon from '@material-ui/icons/Adb';

const styles = theme => ({
  primaryLight: {
    backgroundColor: theme.palette.primary.light
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main
  }
});

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.primaryLight}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <AdbIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Kaiya
          </Typography>
          <Link to="/journal" className={classes.link}>
            <Button color="inherit">Journal</Button>
          </Link>
          <Button color="inherit">Trends</Button>
          <Link to="/" className={classes.link}>
            <Button color="inherit">Talk to Kaiya</Button>
          </Link>
          <Button color="inherit">Settings</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);

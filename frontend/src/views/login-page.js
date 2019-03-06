import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../App.css';

const styles = theme => createStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: '1'
  },
  formContainer: {
    maxWidth: '400px',
    height: '400px',
    padding: '32px',
    display: 'flex',
    alignItems: 'center'
  },
  loginForm: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '85%'
  },
  formHeader: {
    textAlign: 'center',
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  formButton: {
    margin: '16px auto',
    width: '30%'
  }
});

class LoginPage extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Kaiya
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={this.props.classes.content}>
          <Paper elevation={1} className={this.props.classes.formContainer}>
            <form className={this.props.classes.loginForm} onSubmit={this.props.logMeIn}>
              <Typography variant="h4" color="inherit" className={this.props.classes.formHeader}>
                Log in
              </Typography>
              <TextField
                required
                id="outlined-email-input"
                label="Email"
                className={this.props.classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                className={this.props.classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
              <Button type="submit" variant="contained" color="secondary" className={this.props.classes.formButton}>
                Log in
              </Button>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChatPanel } from '../components'
import codee from '../codee.png';
import { withStyles, createStyles } from '@material-ui/core/styles';
import '../App.css';

const styles = theme => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%'
  },
});

class ChatPage extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <div className="App">
          <header className="App-header">
            <img src={codee} className="pet" alt="logo" />
          </header>
        </div>
        < ChatPanel />
      </div>
    );
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);

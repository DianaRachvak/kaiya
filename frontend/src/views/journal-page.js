import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/core/styles';
import logo from '../logo.svg';
import '../App.css';

const styles = theme => createStyles({
  root: {
    backgroundColor: 'white',
  },
});

class JournalPage extends Component {
  constructor() {
    super();
    this.state = {
      prevMessages: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/chat', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
    .then(data => {
      this.setState({prevMessages: data.posts});
    });
  }

  render() {
    const ChatBubble = (text) => {
      return (
        <div>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.prevMessages.map((e, index) =>
      ChatBubble(e.post)
    );

    return (
      <div className={this.props.classes.root}>

          {chat}
      </div>
    );
  }
}

JournalPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JournalPage);

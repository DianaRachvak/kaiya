import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import MicIcon from '@material-ui/icons/Mic';
import { withStyles, createStyles } from '@material-ui/core/styles';
import './ChatPanel.css';
import SpeechToText from 'speech-to-text';
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid
} from '@material-ui/core';

const styles = theme => createStyles({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});

class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      conversation: [],
      error: '',
      interimText: '',
      finalisedText: [],
      listening: false
    };
  }

  componentDidMount() {
    const pusher = new Pusher('903ccf96b48b053043df', {
      cluster: 'us2',
      encrypted: true,
    });

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      const msg = {
        text: data.message,
        user: 'ai',
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
      });
    });

    const onAnythingSaid = text => {
      this.setState({ interimText: text });
    };

    const onEndEvent = () => {
      if (this.state.listening) {
        this.startListening();
      }
    };

    const onFinalised = text => {
      this.setState({
        finalisedText: [text, ...this.state.finalisedText],
        interimText: ''
      });
    };

    try {
      this.listener = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }


  startListening = () => {
    try {
      this.listener.startListening();
      this.setState({ listening: true });
    } catch (err) {
      console.log('yoyoy');
      console.log(err);
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({ listening: false });

    const msg = {
      text: this.state.finalisedText.join('. '),
      user: 'human',
    };

    this.setState({
      conversation: [...this.state.conversation, msg],
    });

    fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.state.finalisedText.join('. '),
      }),
    });

    console.log( JSON.stringify({
      message: this.state.finalisedText,
    }));

    this.setState({ finalisedText: [] });
  };


  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };
  
  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.userMessage.trim()) return;

    const msg = {
      text: this.state.userMessage,
      user: 'human',
    };

    this.setState({
      conversation: [...this.state.conversation, msg],
    });

    fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.state.userMessage,
      }),
    });

    console.log( JSON.stringify({
      message: this.state.userMessage,
    }));

    this.setState({ userMessage: '' });
  };

  render() {
    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

   
    const { error, interimText, finalisedText, listening } = this.state;
    const { classes } = this.props;

    let content;
    let micFunc;

    let micButton = (
      <Fab> 
        <MicIcon />    
      </Fab>
    );

    if (error) {
      content = (
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>
        </Paper>
      );
    } else {
      let buttonForListening;

      if (listening) {
        buttonForListening = (
          <Button color="primary" onClick={() => this.stopListening()}>
            Stop Listening
          </Button>
        );
        micButton = (
          <Fab color="secondary" onClick={() => this.stopListening()}> 
            <MicIcon />    
          </Fab>
        );
      } else {
        buttonForListening = (
          <Button
            color="primary"
            onClick={() => this.startListening()}
            variant="contained"
          >
            Start Listening
          </Button>
        );
        micButton = (
          <Fab onClick={() => this.startListening()}> 
            <MicIcon />    
          </Fab>
        );
      }
    }
    
    return (
      <div className = {this.props.classes.root}>
        <div className="conversation-viewer">
          <div>{chat}</div>
        </div>
        <div className="conversation-input">
          <form className="conversation-textform" onSubmit={this.handleSubmit}>
            <input
              value={this.state.userMessage}
              onInput={this.handleChange}
              className="conversation-textinput"
              type="text"
              autoFocus
              placeholder="Type your message and hit Enter to send"
            />
          </form>
          <Tooltip title="Communicate by voice" aria-label="Communicate by voice">
            {micButton}
          </Tooltip>
        </div>
        <Grid container>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Finalized Text</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finalisedText.map((str, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {str}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </div>
    );    
  }
}
ChatPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ChatPanel);

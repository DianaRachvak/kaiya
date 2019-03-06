import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ChatPage, JournalPage, LoginPage } from './views';
import { NavBar } from './components';
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }

  logMeIn = () => {
    this.setState({isLoggedIn:true});
    console.log(this.state.isLoggedIn);
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#fff',
          main: '#eee',
        },
        secondary: {
          main: '#8e52c1',
        },
      },
    });

    if (this.state.isLoggedIn) {
      return (
        <Router>
          <MuiThemeProvider theme={theme}>
            <NavBar/>
            <div className="container">
              <Route exact path="/" component={ChatPage} />
              <Route path="/journal" component={JournalPage} />
            </div>
          </MuiThemeProvider>
        </Router>
      );
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <LoginPage logMeIn={this.logMeIn}/>
        </MuiThemeProvider>
      );
    }
  }
}



export default App;

import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import AppBar from './components/AppBar'

import Home from './pages/Home';
import Login from './pages/login/Login';
import Logout from './pages/login/Logout';
import Register from './pages/login/Register';
import Reset from './pages/login/Reset';
import Error from './pages/Error';
import ResetPassword from './pages/login/ResetPassword';
import Notepad from './pages/notepad/Notepad';

import withAuth from './withAuth';

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fdd835",
    },
    type: 'dark',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this)
    this.state = {
      notepad: withAuth(Notepad),
    };
  }

  handler(args) {
    this.setState({ loading: args })
  }

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar />
        {this.state.loading ? <LinearProgress /> : <div style={{ height: '4px' }} />}
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={(props) => <Home handler={this.handler} {...props} />} />
              <Route exact path="/login" render={(props) => <Login handler={this.handler} {...props} />} />
              <Route exact path="/logout" render={(props) => <Logout handler={this.handler} {...props} />} />
              <Route exact path="/register" render={(props) => <Register handler={this.handler} {...props} />} />
              <Route exact path="/reset" render={(props) => <Reset handler={this.handler} {...props} />} />
              <Route exact path="/reset/:token" render={(props) => <ResetPassword handler={this.handler} {...props} />} />
              <Route exact path="/notepad" render={(props) => <this.state.notepad handler={this.handler} {...props} />} />
              <Route path="/" render={(props) => <Error handler={this.handler} {...props} />} />
            </Switch>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    );
  }
}

export default App;

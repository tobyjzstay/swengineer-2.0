import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
    };
  }

  componentDidMount() {
    this.props.handler(false);
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
      [[name] + "Error"]: ''
    });
  }

  onSubmit = (event) => {
    if (event) event.preventDefault();
    this.props.handler(true);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 200) {
        this.props.history.push('/');
        return;
      } else if (response.status === 500) {
        this.props.enqueueSnackbar("Internal Server Error", { variant: 'error' });
        this.props.handler(false);
        return;
      }
      return response.json();
    }).then(data => {
      if (!data) return;
      this.setState({
        emailError: data.emailError,
        passwordError: data.passwordError
      });
      this.props.handler(false);
    }).catch(() => { // failed to connect
      this.props.enqueueSnackbar("Internal Server Error", { variant: 'error' });
      this.props.handler(false);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <div className={classes.form}>
            <TextField
              type="email"
              name="email"
              label="Email Address"
              value={this.state.email}
              autoComplete="email"
              error={this.state.emailError !== ''}
              helperText={this.state.emailError}
              autoFocus
              onChange={this.handleInputChange}
              onKeyPress={e => { if (e.key === 'Enter') this.onSubmit() }}
              required
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={this.state.password}
              autoComplete="current-password"
              error={this.state.passwordError !== ''}
              helperText={this.state.passwordError}
              onFocus={e => { e.currentTarget.select() }}
              onChange={this.handleInputChange}
              onKeyPress={e => { if (e.key === 'Enter') this.onSubmit() }}
              required
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              onClick={this.onSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset" variant="body2">
                  Forgot password?
                  </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(withSnackbar(Login));

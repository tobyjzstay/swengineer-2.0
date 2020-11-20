import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
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
  close: {
    padding: theme.spacing(0.5),
  },
});

class Notepad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      text: 'Loading...',
      characterCount: 0,
      characterLimit: 0,
      wordCount: 0,
      timer: null,
    };
  }

  componentDidMount() {
    this.props.handler(true);
    fetch('/api/notepad', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        this.props.handler(false);
      } else if (response.status === 401) {
        this.props.history.push('/login');
        this.props.enqueueSnackbar("Invalid login session", { variant: 'error' });
        this.props.handler(false);
        return;
      } else if (response.status === 500) {
        this.props.enqueueSnackbar("Internal Server Error", { variant: 'error' });
        this.props.handler(false);
        return;
      } else {
        this.props.enqueueSnackbar("Something went wrong", { variant: 'error' });
        this.props.handler(false);
        return;
      }
      return response.json();
    }).then(data => {
      if (!data) return;
      this.setState({
        loading: false,
        characterLimit: data.characterLimit,
      });
      this.updateText(data.text);
      this.props.handler(false);
    }).catch(() => { // failed to connect
      this.props.enqueueSnackbar("Internal Server Error", { variant: 'error' });
      this.props.handler(false);
    });
  }

  componentWillUnmount() {
    this.props.closeSnackbar();
  }

  saveText = () => {
    if (this.state.timer !== null) {
      clearTimeout(this.state.timer);
    }

    this.setState({
      timer: setTimeout(() => {
        if (this.state.characterCount <= this.state.characterLimit) {
          this.props.handler(true);
          fetch('/api/notepad', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: this.state.text.trim() })
          }).then(response => {
            if (response.status === 200) {
              this.props.enqueueSnackbar("All changes saved", { autoHideDuration: 3000, variant: 'success' });
              this.props.handler(false);
            } else if (response.status === 401) {
              this.props.history.push('/login');
              this.props.enqueueSnackbar("Invalid login session", { variant: 'error' });
              this.props.handler(false);
              return;
            } else if (response.status === 500) {
              this.props.enqueueSnackbar("Internal Server Error", { variant: 'error' });
              this.props.handler(false);
              return;
            } else {
              this.props.enqueueSnackbar("Something went wrong", { variant: 'error' });
              this.props.handler(false);
              return;
            }
            return response.json();
          })
            .then(data => {
              if (!data) return;
              // response
            });
        } else {
          this.props.enqueueSnackbar("Character limit exceeded. Changes are not saved.", { autoHideDuration: 0, persist: true, preventDuplicate: true, variant: 'error' });
        }
      }, 1000)
    })
  }

  wordCounter = (text) => {
    var array = text.split(' ');
    var wordCount = 0;

    function isWord(str) {
      var alphaNumericFound = false;
      for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if ((code > 47 && code < 58) || // numeric (0-9)
          (code > 64 && code < 91) || // upper alpha (A-Z)
          (code > 96 && code < 123)) { // lower alpha (a-z)
          alphaNumericFound = true;
          return alphaNumericFound;
        }
      }
      return alphaNumericFound;
    }

    for (var i = 0; i < array.length; i++) {
      if (array[i] !== ' ' && isWord(array[i])) {
        wordCount++;
      }
    }
    this.setState({ wordCount: wordCount });
  }

  characterCounter = (text) => {
    var characterCount = text.length;
    this.setState({ characterCount: characterCount });
    if (characterCount <= this.state.characterLimit) {
      this.props.closeSnackbar();
    }
  }

  updateText = (text) => {
    this.setState({ text: text });
    this.wordCounter(text);
    this.characterCounter(text);
    this.saveText();
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Notepad
          </Typography>
          <TextField
            id="outlined-multiline-static"
            margin="normal"
            label="Notes"
            fullWidth
            multiline
            disabled={this.state.loading}
            value={this.state.text}
            onChange={e => {
              this.updateText(e.target.value);
              if (this.state.characterCount <= this.state.characterLimit) {
                this.props.closeSnackbar();
              }
            }}
            error={this.state.characterCount > this.state.characterLimit}
            helperText={!this.state.loading ? `${this.state.characterCount} character${this.state.characterCount - 1 ? "s" : ""} (${this.state.wordCount} word${this.state.wordCount - 1 ? "s" : ""}) ` : ""}
            variant="outlined"
          />
          <Typography variant="subtitle1" gutterBottom>
            {!this.state.loading ? `Notepad is currently limited to ${this.state.characterLimit} character${this.state.characterLimit - 1 ? "s" : ""}.` : ""}
          </Typography>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(withSnackbar(Notepad));

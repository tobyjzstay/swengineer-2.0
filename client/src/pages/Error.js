import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Error extends Component {
  componentDidMount() {
    this.props.handler(false);
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h2">
              404
          </Typography>
            <Typography component="h1" variant="h5">
              Page not found
          </Typography>
          </div>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(Error);

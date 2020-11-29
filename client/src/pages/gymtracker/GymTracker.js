import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = (theme) => ({
  main: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class GymTracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      value: 0
    };
  }

  //   componentDidMount() {
  //     this.props.handler(true);
  //     fetch('/gymtracker', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     }).then(response => response.json())
  //       .then(data => {
  //         this.setState({
  //           loading: false,
  //           characterLimit: data.characterLimit,
  //         });
  //         this.updateText(data.text);
  //         this.props.handler(false);
  //       }).catch(() => { // failed to connect
  //         this.props.enqueueSnackbar("Internal Server Error", { variant: 'error' });
  //         this.props.handler(false);
  //       });
  //   }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.main}>
          <Typography component="h1" variant="h5">
            Gym Tracker
          </Typography>
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Squat" />
                  </ListItemLink>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Leg press" />
                  </ListItemLink>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Lunge" />
                  </ListItemLink>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Deadlift" />
                  </ListItemLink>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Leg extension" />
                  </ListItemLink>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Leg curl" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Standing calf raise" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Seated calf raise" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Hip adductor" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Bench press" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Chest fly" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Push-up" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Pull-down" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Pull-up" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Bent-over row" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Upright row" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Shoulder press" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Shoulder fly" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Lateral raise" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Shoulder shrug" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Pushdown" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Triceps extension" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Biceps curl" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Crunch" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Russian twist" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Leg raise" />
                  </ListItemLink></Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListItemLink href="/gymtracker/log">
                    <ListItemText primary="Back extension" />
                  </ListItemLink></Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(withSnackbar(GymTracker));

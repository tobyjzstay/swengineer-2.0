import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';

import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

import Switch from '@material-ui/core/Switch';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';

import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = (theme) => ({
  main: {
    marginTop: theme.spacing(8),
    textAlign: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper2: {
    textAlign: 'left',
    padding: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Log extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      reps: 1,
      open: false,
      type: 'regular',
      sets: {}
    };
  }

  componentDidMount() {
    this.props.handler(false);
  }

  handleChange = (event) => {
    this.setState({ type: event.target.value });
  };

  handleSliderChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleRepSliderChange = (event, newValue) => {
    this.setState({ reps: newValue });
  };

  handleInputChange = (event) => {
    this.setState({ value: event.target.value === '' ? '' : Number(event.target.value) });
  }

  handleRepsChange = (event) => {
    this.setState({ reps: event.target.value === '' ? '' : Number(event.target.value) });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleBlur = () => {
    if (this.state.value < 0) {
      this.setState({ value: 0 });
    } else if (this.state.value > 100) {
      this.setState({ value: 100 });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.main}>
          <Typography component="h1" variant="h5">
            Bench press
          </Typography>
          <div className={classes.root}>
            <Typography gutterBottom variant="subtitle2">
              {new Date().toDateString()}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div className={classes.paper2}>
                    <Grid container spacing={2} alignItems="center" justify="space-between">
                      <Grid item xs={8}>
                        <Typography gutterBottom variant="subtitle1">
                          Regular bench press
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                          12 reps at 50kg
                          <Typography variant="caption" color="textSecondary">
                            {"\t(incl.)"}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div className={classes.paper2}>
                    <Grid container spacing={2} alignItems="center" justify="space-between">
                      <Grid item xs={8}>
                        <Typography gutterBottom variant="subtitle1">
                          Regular bench press
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                          12 reps at 55kg
                          <Typography variant="caption" color="textSecondary">
                            {"\t(incl.)"}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div className={classes.paper2}>
                    <Grid container spacing={2} alignItems="center" justify="space-between">
                      <Grid item xs={8}>
                        <Typography gutterBottom variant="subtitle1">
                          Regular bench press
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                          10 reps at 60kg
                          <Typography variant="caption" color="textSecondary">
                            {"\t(incl.)"}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
        <Fab className={classes.fab} color="primary" aria-label="add" onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          fullWidth={true}
          maxWidth={'xs'}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Add Set
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} alignItems="center" justify="space-between">
              <Grid item xs={7}>
                <Typography id="input-slider" gutterBottom>
                  Form
                </Typography>
              </Grid>
              <Grid item xs={5} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.type}
                  onChange={this.handleChange}
                >
                  <MenuItem value={'regular'}>Regular</MenuItem>
                  <MenuItem value={'incline'}>Incline</MenuItem>
                  <MenuItem value={'decline'}>Decline</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <br />
            <Typography id="input-slider" gutterBottom>
              Reps
            </Typography>
            <Grid container spacing={2} alignItems="center" justify="space-between">
              <Grid item xs={8}>
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={typeof this.state.reps === 'number' ? this.state.reps : 1}
                  onChange={this.handleRepSliderChange}
                />
              </Grid>
              <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Input
                  value={this.state.reps}
                  margin="dense"
                  onFocus={e => { e.currentTarget.select() }}
                  onChange={this.handleRepsChange}
                  onBlur={this.handleBlur}
                  endAdornment={<InputAdornment position="end">rep{this.state.reps - 1 ? "s" : ""}</InputAdornment>}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 100,
                    type: 'number',
                    style: { textAlign: "right" },
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
            <Typography id="input-slider" gutterBottom>
              Weight
            </Typography>
            <Grid container spacing={2} alignItems="center" justify="space-between">
              <Grid item xs={8}>
                <Slider
                  min={0}
                  max={100}
                  step={2.5}
                  value={typeof this.state.value === 'number' ? this.state.value : 0}
                  onChange={this.handleSliderChange}
                />
              </Grid>
              <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Input
                  value={this.state.value}
                  margin="dense"
                  onFocus={e => { e.currentTarget.select() }}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                  endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                  inputProps={{
                    step: 2.5,
                    min: 0,
                    max: 1000,
                    type: 'number',
                    style: { textAlign: "right" },
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" justify="space-between">
              <Grid item xs={8}>
                <Typography id="input-slider" gutterBottom>
                  Including barbell weight
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Switch
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleClose} color="primary">
              Add
          </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

export default withStyles(useStyles)(withSnackbar(Log));

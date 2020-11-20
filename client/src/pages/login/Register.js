import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            emailConfirmError: '',
            password: '',
            passwordError: '',
            passwordConfirmError: '',
        };
    }

    componentDidMount() {
        this.props.handler(false);
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
            [[name] + "Error"]: false
        });
    }

    onSubmit = (event) => {
        if (event) event.preventDefault();
        this.props.handler(true);
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            if (response.status === 200) {
                this.props.history.push('/login');
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
                nameError: data.nameError,
                emailError: data.emailError,
                emailConfirmError: data.emailConfirmError,
                passwordError: data.passwordError,
                passwordConfirmError: data.passwordConfirmError,
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
                        Register
                    </Typography>
                    <div className={classes.form}>
                        <TextField
                            type="text"
                            name="name"
                            label="Name"
                            value={this.state.name}
                            autoComplete="name"
                            error={this.state.nameError !== ''}
                            helperText={this.state.nameError}
                            autoFocus
                            onChange={this.handleInputChange}
                            onKeyPress={e => { if (e.key === 'Enter') this.onSubmit() }}
                            required
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            type="email"
                            name="email"
                            label="Email Address"
                            value={this.state.email}
                            autoComplete="email"
                            error={this.state.emailError !== ''}
                            helperText={this.state.emailError}
                            onChange={this.handleInputChange}
                            onKeyPress={e => { if (e.key === 'Enter') this.onSubmit() }}
                            required
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            type="email"
                            name="emailConfirm"
                            label="Confirm Email Address"
                            value={this.state.emailConfirm}
                            error={this.state.emailConfirmError !== ''}
                            helperText={this.state.emailConfirmError}
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
                        <TextField
                            type="password"
                            name="passwordConfirm"
                            label="Confirm Password"
                            value={this.state.passwordConfirm}
                            error={this.state.passwordConfirmError !== ''}
                            helperText={this.state.passwordConfirmError}
                            onFocus={e => { e.currentTarget.select() }}
                            onChange={this.handleInputChange}
                            onKeyPress={e => { if (e.key === 'Enter') this.onSubmit() }}
                            required
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                        <Button
                            type="submit"
                            onClick={this.onSubmit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    Back
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(withSnackbar(Register));

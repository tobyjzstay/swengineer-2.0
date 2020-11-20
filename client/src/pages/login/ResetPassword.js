import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            password: '',
            passwordError: '',
            passwordConfirmError: '',
            resetCode: 0,
            resetError: ''
        };
    }

    componentDidMount() {
        this.props.handler(true);
        fetch('/reset/' + this.props.match.params.token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({ loading: false });
            };
            this.setState({ resetCode: response.status });
            return response.json();
        }).then(data => {
            this.setState({
                loading: false,
                resetError: data.resetError
            });
            this.props.handler(false);
        }).catch(() => { // failed to connect
            this.props.enqueueSnackbar("Internal Server Error", { variant: 'error' });
            this.props.handler(false);
        });
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
        fetch('/reset/' + this.props.match.params.token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            if (response.status === 200) {
                this.props.history.push('/login');
                this.props.enqueueSnackbar("Successfully changed password", { variant: 'success' });
                this.props.handler(false);
                return;
            };
            this.setState({ resetCode: response.status });
            return response.json();
        }).then(data => {
            if (!data) return;
            this.setState({
                resetError: data.resetError,
                passwordError: data.passwordError,
                passwordConfirmError: data.passwordConfirmError
            });
            this.props.handler(false);
        }).catch(() => { // failed to connect
            this.props.enqueueSnackbar("Internal Server Error", { variant: 'error' });
            this.props.handler(false);
        });
    }

    render() {
        const { classes } = this.props;
        return (<>
            { this.state.loading ? <></> :
                this.state.resetError === '' ?
                    <Container component="main" maxWidth="xs" >
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Change Password
                            </Typography>
                            <div className={classes.form}>
                                <TextField
                                    type="password"
                                    name="password"
                                    label="New Password"
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
                                    label="Confirm New Password"
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
                                    Change
                                </Button>
                            </div>
                        </div>
                    </Container>
                    :
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h2">
                            {this.state.resetCode}
                        </Typography>
                        <Typography component="h1" variant="h5">
                            Error: {this.state.resetError}
                        </Typography>
                    </div>
            }
        </>
        );
    }
}

export default withStyles(useStyles)(withSnackbar(ResetPassword));

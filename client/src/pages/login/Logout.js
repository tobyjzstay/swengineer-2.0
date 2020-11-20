import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

class Logout extends Component {
    componentDidMount() {
        this.props.handler(true);
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                this.props.history.push('/login');
                this.props.enqueueSnackbar("Successfully logged out", { variant: 'success' });
                this.props.handler(false);
                return;
            };
            this.props.enqueueSnackbar("Something went wrong", { variant: 'error' });
            this.props.handler(false);
        }).catch(() => { // failed to connect
            this.props.enqueueSnackbar("Internal Server Error", { variant: 'error' });
            this.props.handler(false);
        });
    }

    render() {
        return (
            <>
            </>
        );
    }
}

export default withSnackbar(Logout);

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

class TwitchClipper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clipId: '',
            source: '',
            error: false,
        };
    }

    componentDidMount() {
        this.props.handler(false);
    }

    componentWillUnmount() {
        this.props.closeSnackbar();
    }

    handleInputChange(value) {
        this.setState({
            clipId: value,
            error: false,
        });
    }

    onSubmit = (event) => {
        if (event) event.preventDefault();
        this.props.handler(true);
        this.setState({ source: '' });
        let value = new String(this.state.clipId);
        if (value.length === 9) {
            this.setState({ source: `https://clips-media-assets2.twitch.tv/AT-cm%7C${this.state.clipId}.mp4` });
            this.props.handler(false);
        } else if (value.includes("reddit.com")) {
            fetch(value.slice(0, -1) + '.json')
                .then(response => {
                    return response.json();
                }).then(data => {
                    if (!data) return;
                    let url = data[0].data.children[0].data.secure_media.oembed.thumbnail_url;
                    let source;
                    if (url.includes("AT-cm|")) {
                        source = url.slice(0, -19) + '.mp4';
                    } else if (url.includes("offset")) {
                        source = url.slice(0, -12) + '.mp4';
                        if (source.includes("-social")) {
                            source = source.replace('-social', '');
                        }
                    }
                    this.setState({ source: source });
                    this.props.handler(false);
                }).catch(() => { // failed to connect
                    this.props.enqueueSnackbar("Invalid URL", { variant: 'error' });
                    this.setState({ error: true });
                    this.props.handler(false);
                });
        } else {
            this.props.enqueueSnackbar("Invalid clip ID/URL", { variant: 'error' });
            this.setState({ error: true });
            this.props.handler(false);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Twitch Clipper
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Enter a clips.twitch.tv Reddit post or clip ID.
                    </Typography>
                    <TextField
                        name="clipId"
                        margin="normal"
                        label="Clip ID"
                        fullWidth
                        value={this.state.clipId}
                        onChange={e => {
                            this.handleInputChange(e.target.value);
                        }}
                        onKeyPress={e => { if (e.key === 'Enter') this.onSubmit() }}
                        error={this.state.error}
                        variant="outlined"
                    />
                    <Typography variant="subtitle1" gutterBottom>
                        {this.state.clidId}
                    </Typography>
                    {this.state.source ? <video width="100%" height="auto" controls autoPlay name="media">
                        <source src={this.state.source} type="video/mp4">
                        </source>
                    </video>
                        : <></>}
                    <Typography variant="subtitle1" gutterBottom>
                        Older/archived Reddit posts may not work as they do not have an extractable clip ID.
                    </Typography>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(withSnackbar(TwitchClipper));

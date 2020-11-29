import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { withSnackbar } from 'notistack';

const useStyles = (theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

class Home extends Component {
    componentDidMount() {
        this.props.handler(false);
    }

    render() {
        const { classes } = this.props;
        return (
            <Container href="/logout" component="main" maxWidth="lg">
                <div className={classes.paper}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            {[0].map((value) => (
                                <Grid key={value} item>
                                    <Link to='/notepad' style={{ textDecoration: 'none' }}>
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Notepad
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        A simple notepad to take notes. You can write plain text documents without any text formatting.
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                            {[0].map((value) => (
                                <Grid key={value} item>
                                    <Link to='/gymtracker' style={{ textDecoration: 'none' }}>
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Gym Tracker
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        Track gym workout progress. Provides insight on what muscles to workout.
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(withSnackbar(Home));

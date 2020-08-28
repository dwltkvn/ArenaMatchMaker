import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

// firebase
import firebase from "../components/firebase"

// material-ui import
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import MobileStepper from "@material-ui/core/MobileStepper"
import LinearProgress from "@material-ui/core/LinearProgress"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import Tooltip from "@material-ui/core/Tooltip"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Snackbar from "@material-ui/core/Snackbar"

// icons
import HelpIcon from "@material-ui/icons/Help"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import CloseIcon from "@material-ui/icons/Close"

const styles = {
  mainLayout: {
    //border: "dashed red"
  },
  mainContainer: {
    //border: "dashed blue"
  },
  selectGameMode: {
    minWidth: "100%"
  },
  stepper: {
    //minWidth: "100%",
    //border: "dashed blue"
    //flexGrow: 1
  },
  flexContainer: {
    //border: "dashed green",
    //align: "center"
  },
  marginStyle: {
    //padding: "0px"
  },
  appBarStyle: {
    //border: "dashed red",
    minWidth: "100%"
  }
}

const stateNames = {
  INIT: 0,
  REGISTERING: 1,
  SEARCHING: 2,
  MATCHED: 3,
  STARTED: 4,
  STATENAMES___MAX: 5
}
const gameModeNames = {
  HistoricBrawl: 0,
  Gladiator: 1,
  Artisan: 2,
  Pauper: 3
}

const gameModeDescription = {
  HistoricBrawl: "Singleton mode using a Commander and cards from Historic",
  Gladiator: "Singleton mode with a deck of 100 cards",
  Artisan: "Deck using only umcommon/common cards and basic lands",
  Pauper: "Deck using only commons cards and basic lands"
}

class MAMMPage extends React.Component {
  constructor(props) {
    super(props)
    // bind function to this class
    //this.register = this.register.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onRegistering = this.onRegistering.bind(this)
    this.onLogOut = this.onLogOut.bind(this)
    this.onConfirmation = this.onConfirmation.bind(this)

    // init the class state
    this.state = {
      stateMatchMaking: stateNames.INIT,
      stateOpponentUsername: "",
      stateGameMode: Object.keys(gameModeNames)[0],
      stateOpponentConfirmation: false,
      stateDisplayOpponentConfirmation: false,
      stateUID: null,
      stateAuth: false
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onGameModeChange = event => {
    const v = event.target.value
    this.setState({ stateGameMode: v })
  }

  onUsernameChange = event => {
    const v = event.target.value
    const vArray = v.split("#")
    const s = vArray.length
    if (s < 2) return // if there is not 2 or more elements, ret
    // username is valid if the last elem is not a Nan and if its size is more than 0
    const isValidUsername = !isNaN(vArray[s - 1]) & (vArray[s - 1].length > 0)

    if (isValidUsername)
      this.setState({ stateMatchMaking: stateNames.REGISTERING })
    else this.setState({ stateMatchMaking: stateNames.INIT })
  }

  onRegistering = () => {
    // prepare onAuth callback
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged")
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous
        var uid = user.uid
        console.log(uid)

        this.setState({
          stateMatchMaking: stateNames.SEARCHING,
          stateUID: uid,
          stateAuth: true
        })
        setTimeout(() => {
          this.setState({
            stateMatchMaking: stateNames.MATCHED,
            stateOpponentUsername: "Hell#123"
          })
        }, 3000)
      } else {
        // User is signed out.
        this.setState({ stateUID: null, stateAuth: false })
      }
      // ...
    })

    firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorMessage)
        // ...
      })
    /*this.setState({ stateMatchMaking: stateNames.SEARCHING })
    setTimeout(() => {
      this.setState({
        stateMatchMaking: stateNames.MATCHED,
        stateOpponentUsername: "Hell#123"
      })
    }, 3000)*/
  }

  onLogOut = () => {
    firebase.auth().signOut()
  }

  onConfirmation = () => {
    this.setState({ stateMatchMaking: stateNames.STARTED })
    // send back the confirmation to the opponent
    setTimeout(() => {
      this.setState({
        stateOpponentConfirmation: true,
        stateDisplayOpponentConfirmation: true
      })
    }, 3000)
  }

  render() {
    const classes = styles

    return (
      <Layout>
        <SEO title="Home" />
        <div style={classes.mainLayout}>
          <Container maxWidth="sm" style={classes.mainContainer}>
            <AppBar position="static">
              <Toolbar>
                <Box display="flex" style={classes.appBarStyle}>
                  <Box flexGrow={1}>
                    <Typography variant="h6">Arena Match Maker</Typography>
                  </Box>
                  <Box>
                    <Button color="inherit">Install</Button>
                  </Box>
                </Box>
              </Toolbar>
            </AppBar>
          </Container>
          <Container maxWidth="xs" style={classes.mainContainer}>
            <Grid container spacing={3}>
              <Grid item xs={12} />
              <Grid item xs={12}>
                <TextField
                  label="Your MTGA Username"
                  fullWidth
                  onChange={this.onUsernameChange}
                  style={classes.marginStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl style={classes.selectGameMode}>
                  <InputLabel>Game Mode</InputLabel>
                  <Select
                    autoWidth
                    value={this.state.stateGameMode}
                    onChange={this.onGameModeChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <Tooltip
                          title={gameModeDescription[this.state.stateGameMode]}
                        >
                          <IconButton>
                            <HelpIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    }
                  >
                    {Object.entries(gameModeNames).map(v => (
                      <MenuItem value={v[0]} key={v[1]}>
                        {v[0]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl style={classes.selectGameMode}>
                  <InputLabel>Your Opponent Username</InputLabel>
                  <Input
                    fullWidth
                    type="text"
                    value={this.state.stateOpponentUsername}
                    endAdornment={
                      <InputAdornment position="end">
                        <Tooltip title="Copy to clipboard">
                          <IconButton>
                            <FileCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {this.state.stateMatchMaking === stateNames.SEARCHING ? (
                  <LinearProgress />
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <ButtonGroup>
                  {this.state.stateMatchMaking !== stateNames.REGISTERING &&
                  this.state.stateMatchMaking !== stateNames.INIT ? null : (
                    <Button
                      disabled={
                        this.state.stateMatchMaking !== stateNames.REGISTERING
                      }
                      onClick={this.onRegistering}
                      color="primary"
                    >
                      Register
                    </Button>
                  )}
                  {this.state.stateMatchMaking !==
                  stateNames.SEARCHING ? null : (
                    <Button
                      disabled={
                        this.state.stateMatchMaking !== stateNames.SEARCHING
                      }
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  )}
                  {this.state.stateMatchMaking !== stateNames.MATCHED ? null : (
                    <Button
                      disabled={
                        this.state.stateMatchMaking !== stateNames.MATCHED
                      }
                      onClick={this.onConfirmation}
                      color="primary"
                    >
                      Confirm
                    </Button>
                  )}
                  {this.state.stateMatchMaking !== stateNames.MATCHED ? null : (
                    <Button
                      disabled={
                        this.state.stateMatchMaking !== stateNames.MATCHED
                      }
                      color="secondary"
                    >
                      Abort
                    </Button>
                  )}
                  {this.state.stateMatchMaking !== stateNames.STARTED ? null : (
                    <Button
                      disabled={
                        this.state.stateMatchMaking !== stateNames.STARTED
                      }
                      color="secondary"
                    >
                      Find Next Match
                    </Button>
                  )}
                </ButtonGroup>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={
            this.state.stateOpponentConfirmation &&
            this.state.stateDisplayOpponentConfirmation
          }
          onClose={() =>
            this.setState({ stateDisplayOpponentConfirmation: false })
          }
          autoHideDuration={6000}
          message={
            this.state.stateOpponentUsername + " confirmed starting the match"
          }
          action={
            <React.Fragment>
              {this.state.stateMatchMaking !== stateNames.MATCHED ? null : (
                <Button color="secondary" size="small">
                  Send Confirmation
                </Button>
              )}
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() =>
                  this.setState({ stateDisplayOpponentConfirmation: false })
                }
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Layout>
    )
  }
}

export default MAMMPage

import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

// firebase
import firebase from "../components/firebase"

// material-ui import
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Snackbar from "@material-ui/core/Snackbar"
import Slide from "@material-ui/core/Slide"

// icons
import CloseIcon from "@material-ui/icons/Close"

import RegisterCmpnt from "../components/registerComponent"
import SearchMatchCmpnt from "../components/searchMatchComponent"
import OpponentFoundCmpnt from "../components/opponentFoundComponent"

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
  TRANSITION: -1,
  INIT: 0,
  REGISTERING: 1,
  SEARCHING: 2,
  MATCHED: 3,
  STARTED: 4
}

class MAMMPage extends React.Component {
  constructor(props) {
    super(props)
    // bind function to this class
    //this.register = this.register.bind(this)
    this.onRegistering = this.onRegistering.bind(this)
    this.onCancelRegistration = this.onCancelRegistration.bind(this)
    this.onLogOut = this.onLogOut.bind(this)
    this.onConfirmation = this.onConfirmation.bind(this)
    this.onAbortMatch = this.onAbortMatch.bind(this)
    this.onUnload = this.onUnload.bind(this)

    // init the class state
    this.state = {
      stateMatchMaking: stateNames.INIT,
      stateUsername: "",
      stateOpponentUsername: "",
      stateGameMode: "",
      stateOpponentConfirmation: false,
      stateDisplayOpponentConfirmation: false,
      stateUID: null,
      stateAuth: false
    }

    // classes variables
    this.ts = 0
    this.transitionSpeed = 500
  }

  componentDidMount() {
    window.onbeforeunload = () => {
      this.onUnload()
      return undefined // undef -> prevent dialog prompt
    }
  }

  componentWillUnmount() {}

  onUnload() {
    const fbpath = `${this.state.stateUID}`
    const obj = {}

    if (fbpath) {
      firebase.database().ref(fbpath).off()

      firebase.database().ref(fbpath).set(obj)
    }
  }

  onRegistering = () => {
    // prepare onAuth callback
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged")
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous
        var uid = user.uid
        this.ts = Date.now()
        console.log(uid)

        this.setState({
          stateMatchMaking: stateNames.SEARCHING,
          stateUID: uid,
          stateAuth: true
        })

        const fbpath = `${uid}`
        const obj = {
          username: this.state.stateUsername,
          timestamp: this.ts,
          gameMode: this.state.stateGameMode,
          opponent: { username: "", timestamp: 0 }
        }
        firebase
          .database()
          .ref(fbpath)
          .set(obj)
          .then(() => {
            //this.waitForOpponent()
            firebase
              .database()
              .ref(fbpath)
              .on("value", snapshot => {
                if (snapshot.val() && snapshot.val().opponent) {
                  if (snapshot.val().opponent.username) {
                    console.log("fb match")
                    this.setState({
                      // opponent/username valid
                      //stateMatchMaking: stateNames.MATCHED,

                      stateOpponentUsername: snapshot.val().opponent.username
                    })
                    setTimeout(
                      () =>
                        this.setState({
                          stateMatchMaking: stateNames.TRANSITION
                        }),
                      this.transitionSpeed * 2
                    )
                    setTimeout(
                      () =>
                        this.setState({ stateMatchMaking: stateNames.MATCHED }),
                      this.transitionSpeed * 3
                    )
                  } else {
                    // no username
                    console.log("fb no username")
                    this.setState({
                      stateMatchMaking: stateNames.SEARCHING,
                      stateOpponentUsername: ""
                    })
                  }
                } else {
                  // no opponent field
                  console.log("fb no opponent field")
                  this.setState({
                    stateMatchMaking: stateNames.SEARCHING,
                    stateOpponentUsername: ""
                  })
                }
              })
          })
        /*setTimeout(() => {
          this.setState({
            stateMatchMaking: stateNames.MATCHED,
            stateOpponentUsername: "Hell#123"
          })
          setTimeout(() => {
            this.setState({
              stateOpponentConfirmation: true,
              stateDisplayOpponentConfirmation: true
            })
          }, 5000)
        }, 3000)*/
      } else {
        // User is signed out ... really useful ?
        const fbpath = `${uid}`
        firebase.database().ref(fbpath).set({})
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
  }

  onCancelRegistration = () => {
    const fbpath = `${this.state.stateUID}`
    const obj = {}

    firebase.database().ref(fbpath).off()

    firebase
      .database()
      .ref(fbpath)
      .set(obj)
      .then(() =>
        this.setState(
          {
            stateMatchMaking: stateNames.TRANSITION,
            stateOpponentUsername: ""
          },
          () =>
            setTimeout(
              () => this.setState({ stateMatchMaking: stateNames.INIT }),
              this.transitionSpeed
            )
        )
      )
  }

  onLogOut = () => {
    firebase.auth().signOut()
  }

  onConfirmation = () => {
    this.setState(
      { stateMatchMaking: stateNames.TRANSIION },
      setTimeout(
        () => this.setState({ stateMatchMaking: stateNames.STARTED }),
        this.transitionSpeed
      )
    )

    // send back the confirmation to the opponent
    /*setTimeout(() => {
      this.setState({
        stateOpponentConfirmation: true,
        stateDisplayOpponentConfirmation: true
      })
    }, 3000)*/
  }

  onAbortMatch = () => {
    this.onCancelRegistration()
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
              <Slide
                direction={
                  this.state.stateMatchMaking === stateNames.INIT
                    ? "left"
                    : "right"
                }
                in={this.state.stateMatchMaking === stateNames.INIT}
                mountOnEnter
                unmountOnExit
                timeout={{
                  enter: this.transitionSpeed,
                  exit: this.transitionSpeed
                }}
              >
                <Grid item xs={12}>
                  <RegisterCmpnt
                    defaultUsername={this.state.stateUsername}
                    cbOnRegisterBtnClicked={(u, g) =>
                      this.setState(
                        {
                          stateUsername: u,
                          stateGameMode: g,
                          stateMatchMaking: stateNames.TRANSITION
                        },
                        () => {
                          setTimeout(
                            () =>
                              this.setState({
                                stateMatchMaking: stateNames.REGISTERING
                              }),
                            this.transitionSpeed
                          )
                          setTimeout(
                            () => this.onRegistering(),
                            this.transitionSpeed * 5
                          )
                        }
                      )
                    }
                  />
                </Grid>
              </Slide>
              <Slide
                direction={
                  this.state.stateMatchMaking === stateNames.SEARCHING ||
                  this.state.stateMatchMaking === stateNames.REGISTERING
                    ? "left"
                    : "right"
                }
                in={
                  this.state.stateMatchMaking === stateNames.SEARCHING ||
                  this.state.stateMatchMaking === stateNames.REGISTERING
                }
                mountOnEnter
                unmountOnExit
                timeout={{
                  enter: this.transitionSpeed,
                  exit: this.transitionSpeed
                }}
              >
                <Grid item xs={12}>
                  <SearchMatchCmpnt
                    cbOnCancel={() => this.onCancelRegistration()}
                    propOpponentFound={this.state.stateOpponentUsername !== ""}
                    disableBtn={
                      this.state.stateMatchMaking !== stateNames.SEARCHING ||
                      this.state.stateOpponentUsername !== ""
                    }
                  />
                </Grid>
              </Slide>
              <Slide
                direction={
                  this.state.stateMatchMaking === stateNames.MATCHED
                    ? "left"
                    : "right"
                }
                in={this.state.stateMatchMaking === stateNames.MATCHED}
                mountOnEnter
                unmountOnExit
                timeout={{
                  enter: this.transitionSpeed,
                  exit: this.transitionSpeed
                }}
              >
                <Grid item xs={12}>
                  <OpponentFoundCmpnt
                    propOpponentUserName={this.state.stateOpponentUsername}
                    cbOnAbort={() => this.onAbortMatch()}
                  />
                </Grid>
              </Slide>
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
          autoHideDuration={
            this.state.stateMatchMaking === stateNames.MATCHED ? null : 6000
          }
          message={
            this.state.stateOpponentUsername + " confirmed starting the match"
          }
          action={
            <React.Fragment>
              {this.state.stateMatchMaking !== stateNames.MATCHED ? null : (
                <Button
                  color="secondary"
                  size="small"
                  onClick={() => this.onConfirmation()}
                >
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

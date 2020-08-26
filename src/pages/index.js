import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

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

const styles = {
  mainLayout: {
    border: "dashed red"
  },
  mainContainer: {
    border: "dashed blue"
  },
  selectGameMode: {
    minWidth: "100%"
  },
  stepper: {
    //minWidth: "100%",
    border: "dashed blue"
    //flexGrow: 1
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
  HISTORICBRAWL: "HistoricBrawl",
  GLADIATOR: "Gladiator",
  ARTISAN: "Artisan",
  PAUPER: "Pauper"
}

class MAMMPage extends React.Component {
  constructor(props) {
    super(props)
    // bind function to this class
    //this.register = this.register.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onRegistering = this.onRegistering.bind(this)

    // init the class state
    this.state = {
      stateMatchMaking: stateNames.INIT,
      stateOpponentUsername: ""
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
    this.setState({ stateMatchMaking: stateNames.SEARCHING })
    setTimeout(() => {
      console.log("Hello")
      this.setState({
        stateMatchMaking: stateNames.MATCHED,
        stateOpponentUsername: "Hell#123"
      })
    }, 3000)
  }

  render() {
    const classes = styles

    return (
      <Layout>
        <SEO title="Home" />
        <div style={classes.mainLayout}>
          <Container maxWidth="xs" style={classes.mainContainer}>
            <form noValidate autoComplete="off">
              <TextField
                label="Your MTGA Username"
                fullWidth
                onChange={this.onUsernameChange}
              />
              <FormControl style={classes.selectGameMode}>
                <InputLabel>Game Mode</InputLabel>
                <Select autoWidth value={Object.keys(gameModeNames)[0]}>
                  {Object.entries(gameModeNames).map(v => (
                    <MenuItem value={v[0]} key={v[0]}>
                      {v[1]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ButtonGroup color="primary">
                <Button
                  disabled={
                    this.state.stateMatchMaking !== stateNames.REGISTERING
                  }
                  onClick={this.onRegistering}
                >
                  Register
                </Button>
                <Button
                  disabled={
                    this.state.stateMatchMaking !== stateNames.SEARCHING
                  }
                >
                  Cancel
                </Button>
              </ButtonGroup>
              {this.state.stateMatchMaking === stateNames.SEARCHING ? (
                <LinearProgress />
              ) : null}
              <FormControl style={classes.selectGameMode}>
                <InputLabel>Your Opponent Username</InputLabel>
                <Input
                  fullWidth
                  type="text"
                  value={this.state.stateOpponentUsername}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <ButtonGroup color="primary">
                <Button
                  disabled={this.state.stateMatchMaking !== stateNames.MATCHED}
                >
                  Confirm
                </Button>
                <Button
                  disabled={this.state.stateMatchMaking !== stateNames.MATCHED}
                >
                  Abort
                </Button>
              </ButtonGroup>
              <ButtonGroup color="primary">
                <Button
                  disabled={this.state.stateMatchMaking !== stateNames.STARTED}
                >
                  Started :)
                </Button>
                <Button
                  disabled={this.state.stateMatchMaking !== stateNames.STARTED}
                >
                  Doesn't work :(
                </Button>
              </ButtonGroup>
            </form>

            <MobileStepper
              style={classes.stepper}
              variant="dots"
              steps={stateNames.STATENAMES___MAX}
              position="static"
              activeStep={this.state.stateMatchMaking}
            />
          </Container>
        </div>
      </Layout>
    )
  }
}

export default MAMMPage

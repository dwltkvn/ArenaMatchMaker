import React from "react"

// material-ui import
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import Tooltip from "@material-ui/core/Tooltip"
import InputAdornment from "@material-ui/core/InputAdornment"
import MenuItem from "@material-ui/core/MenuItem"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

// material-ui icons import
import IconButton from "@material-ui/core/IconButton"
import HelpIcon from "@material-ui/icons/Help"

// game mode cards import
import HistoricBrawlCard from "./GamesModeCards/HistoricBrawlCard"
import GladiatorCard from "./GamesModeCards/GladiatorCards"
import ArtisanCard from "./GamesModeCards/ArtisanCard"
import PauperCard from "./GamesModeCards/PauperCard"

const styles = {
  selectGameMode: {
    minWidth: "100%"
  }
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

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props)
    // bind function to this class
    //this.register = this.register.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.validateUsername = this.validateUsername.bind(this)
    this.onGameModeChange = this.onGameModeChange.bind(this)

    // init the class state
    this.state = {
      stateValideUsername: false,
      stateUsername: "",
      stateGameMode: Object.keys(gameModeNames)[0]
    }

    // classes variables
    //this.ts = 0
  }

  componentDidMount() {
    this.validateUsername(this.props.defaultUsername)
  }

  componentWillUnmount() {}

  onGameModeChange = event => {
    const v = event.target.value
    this.setState({ stateGameMode: v })
  }

  validateUsername = v => {
    const vArray = v.split("#")
    const s = vArray.length
    if (s < 2) return // if there is not 2 or more elements, ret
    // username is valid if the last elem is not a Nan and if its size is more than 0
    const isValidUsername = !isNaN(vArray[s - 1]) & (vArray[s - 1].length > 0)

    if (isValidUsername)
      this.setState({
        //stateMatchMaking: this.props.propStateNames.REGISTERING,
        stateUsername: v,
        stateValideUsername: isValidUsername
      })
    //else this.setState({ stateMatchMaking: stateNames.INIT })
  }

  onUsernameChange = event => {
    const v = event.target.value
    this.validateUsername(v)
  }

  render() {
    const classes = styles
    const props = this.props

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <TextField
            label="Your MTGA Username"
            fullWidth
            onChange={this.onUsernameChange}
            defaultValue={props.defaultUsername}
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
        <Grid item xs={12} />
        <Grid container justify="center">
          <Button
            disabled={this.state.stateValideUsername === false}
            onClick={() =>
              props.cbOnRegisterBtnClicked(
                this.state.stateUsername,
                this.state.stateGameMode
              )
            }
            color="primary"
            size="large"
            variant="outlined"
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12}>
          {this.state.stateGameMode === "HistoricBrawl" ? (
            <HistoricBrawlCard />
          ) : null}
          {this.state.stateGameMode === "Gladiator" ? <GladiatorCard /> : null}
          {this.state.stateGameMode === "Artisan" ? <ArtisanCard /> : null}
          {this.state.stateGameMode === "Pauper" ? <PauperCard /> : null}
        </Grid>
      </Grid>
    )
  }
}

export default RegisterComponent

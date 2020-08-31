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

    // init the class state
    this.state = {
      stateValideUsername: false,
      stateUsername: "",
      stateGameMode: Object.keys(gameModeNames)[0]
    }

    // classes variables
    //this.ts = 0
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
      this.setState({
        //stateMatchMaking: this.props.propStateNames.REGISTERING,
        stateUsername: v,
        stateValideUsername: isValidUsername
      })
    //else this.setState({ stateMatchMaking: stateNames.INIT })
  }

  render() {
    const classes = styles
    const props = this.props

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Your MTGA Username"
            fullWidth
            onChange={this.onUsernameChange}
            style={classes.marginStyle}
            InputProps={{
              readOnly: props.propMatchMaking > props.propStateNames.REGISTERING
            }}
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
      </Grid>
    )
  }
}

export default RegisterComponent

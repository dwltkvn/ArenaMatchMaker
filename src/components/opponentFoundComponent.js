import React from "react"

// material-ui import
import Grid from "@material-ui/core/Grid"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import Box from "@material-ui/core/Box"
import LinearProgress from "@material-ui/core/LinearProgress"

// material-ui icons import
import IconButton from "@material-ui/core/IconButton"
import FileCopyIcon from "@material-ui/icons/FileCopy"

const styles = {
  boxBorder: { border: "dashed red" }
}

class OpponentFoundComponent extends React.Component {
  constructor(props) {
    super(props)
    // bind function to this class
    //this.register = this.register.bind(this)
    this.onConfirmation = this.onConfirmation.bind(this)
    this.maxCount = 30
    // init the class state
    this.state = { stateCount: 0, stateConfirmed: false }

    // classes variables
    this.inserval = null
    //this.ts = 0
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.stateCount >= this.maxCount) this.props.cbOnAbort()
      this.setState(prevState => {
        return { stateCount: prevState.stateCount + 1 }
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onConfirmation() {
    clearInterval(this.interval)
    this.setState({ stateConfirmed: true, stateCount: 0 })
  }

  render() {
    const classes = styles
    const props = this.props

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <TextField
            label="Opponent Username"
            fullWidth
            defaultValue={props.propOpponentUserName}
            variant="outlined"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <FileCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} />
        <Grid container justify="space-evenly">
          <Box>
            <Button
              color="secondary"
              size="large"
              variant="outlined"
              onClick={() => props.cbOnAbort()}
            >
              Abort
            </Button>
            {this.state.stateConfirmed ? null : (
              <LinearProgress
                variant="determinate"
                value={(this.state.stateCount * 100) / this.maxCount}
                color="secondary"
              />
            )}
          </Box>
          <Button
            color="primary"
            size="large"
            variant="outlined"
            disabled={this.state.stateConfirmed}
            onClick={() => this.onConfirmation()}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default OpponentFoundComponent

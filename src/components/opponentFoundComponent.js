import React from "react"

// material-ui import
import Grid from "@material-ui/core/Grid"

import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

// material-ui icons import
import IconButton from "@material-ui/core/IconButton"
import FileCopyIcon from "@material-ui/icons/FileCopy"

const styles = {}

class OpponentFoundComponent extends React.Component {
  constructor(props) {
    super(props)
    // bind function to this class
    //this.register = this.register.bind(this)

    // init the class state
    this.state = {}

    // classes variables
    //this.ts = 0
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
            disabled={true}
            InputProps={{
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
          <Button color="secondary" size="large" variant="outlined">
            Abort
          </Button>
          <Button color="primary" size="large" variant="outlined">
            Confirm
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default OpponentFoundComponent

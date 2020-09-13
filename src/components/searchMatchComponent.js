import React from "react"

// material-ui import
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

// material-ui icons import

const styles = {}

class SearchMatchComponent extends React.Component {
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
        <Grid container justify="center">
          <CircularProgress size="6rem" />
        </Grid>
        <Grid item xs={12} />
        <Grid container justify="center">
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            onClick={() => props.cbOnCancel()}
            disabled={props.disableBtn === true}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default SearchMatchComponent

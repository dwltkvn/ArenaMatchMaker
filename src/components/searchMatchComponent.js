import React from "react"

// material-ui import
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Fade from "@material-ui/core/Fade"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

// material-ui icons import
import CheckIcon from "@material-ui/icons/Check"

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
          <Box position="relative" display="inline-flex">
            <Fade
              in={props.propOpponentFound === false}
              timeout={2000}
              unmountOnExit
            >
              <CircularProgress size="6rem" variant="indeterminate" />
            </Fade>

            <Fade
              in={props.propOpponentFound === true}
              timeout={4000}
              unmountOnExit
            >
              <CircularProgress size="6rem" variant="static" value={100} />
            </Fade>

            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="caption"
                component="div"
                color="textSecondary"
              >
                <CheckIcon />
              </Typography>
            </Box>
          </Box>
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

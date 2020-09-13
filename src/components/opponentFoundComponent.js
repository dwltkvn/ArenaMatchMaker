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
        <Grid item xs={12}>
          <Card>
            <CardActionArea>
              <CardMedia
                image="./images/gatsby-icon.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.propOpponentUserName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Go to MTG Arena, start the match and click on button to
                  confirm
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="secondary">
                Abort
              </Button>
              <Button size="small" color="primary">
                Confirm
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default SearchMatchComponent

import React from "react"

// material-ui import
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const styles = {}

class ArtisanCard extends React.Component {
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
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Artisan
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <ul>
              <li>60 cards deck</li>
              <li>Uncomon and Common cards</li>
              <li>Historic</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default ArtisanCard

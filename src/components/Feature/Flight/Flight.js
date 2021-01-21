import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Flight() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Air India
        </Typography> */}
        <Typography variant="h5" component="h2">
          Air India
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Delhi to Bangalore
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Flight Detail</Button>
        <Button size="small">Check-In/Change Seat</Button>
        <Button size="small">In-Flight</Button>
      </CardActions>
    </Card>
  );
}

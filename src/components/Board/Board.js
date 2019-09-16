import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    fontSize: 16
  }
});

const MapStateToProps = state => ({});
const MapDispatchToProps = {};

export const Board = props => {
  const { className, isAuthorized, ...rest } = props;
  const classes = useStyles();

  return <Grid container className={classes.root}></Grid>;
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Board);

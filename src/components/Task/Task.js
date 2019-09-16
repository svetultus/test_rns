import React from "react";
import { Grid } from "@material-ui/core/";

export const Task = props => {
  const {
    data: { name, id, status, progress, progressMsg, description, workers }
  } = props;
  return (
    props.data && (
      <Grid item>
        <div>{name}</div>
        <div>{id}</div>
        <div>{progress}</div>
        <div>{progressMsg}</div>
        <div>{description}</div>
        <div>
          {workers.map(item => {
            return (
              <div key={item.name} className={item.current ? "active" : ""}>
                {item.name}
              </div>
            );
          })}
        </div>
      </Grid>
    )
  );
};

export default Task;

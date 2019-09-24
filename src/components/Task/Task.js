import React from "react";
import { Grid } from "@material-ui/core/";
import { useDrag } from "react-dnd";

export const Task = props => {
  const {
    data: { name, id, status, progress, progressMsg, description, workers }
  } = props;
  const { data, openModal } = props;

  const [collectedProps, drag] = useDrag({
    item: { id: id, status: status, type: status.toString(), data: data }
  });

  return (
    props.data && (
      <Grid item ref={drag} onClick={openModal} data-id={id}>
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

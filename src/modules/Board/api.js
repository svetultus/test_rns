export const fetchTaskList = () =>
  fetch("http://localhost:3000/data.json").then(response =>
    response.status === 200 ? response.json() : Promise.reject(response)
  );

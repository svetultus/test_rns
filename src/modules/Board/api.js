export const fetchTaskList = () =>
  fetch("http://localhost:3000/data.json")
    .then(response =>
      response.status === 200 ? response.json() : Promise.reject(response)
    )
    .then(result =>
      result.map(item => ({
        ...item,
        description: item.description.slice(0, 20)
      }))
    );

export const fetchTask = id =>
  fetch("http://localhost:3000/data.json")
    .then(response =>
      response.status === 200 ? response.json() : Promise.reject(response)
    )
    .then(result => {
      return result.filter(item => item.id === id)[0];
    });

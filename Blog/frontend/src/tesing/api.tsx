import axios from "axios";

(function () {
    const api_url = `http://localhost:8000/api/login/`
    const todo_url = `http://localhost:8000/api/todos/`
    const credentials = JSON.stringify({
      username: "Nitish",
      password: "nk.@D136900"
    })
    axios
      .post(api_url, credentials)
      .then(res => {
        console.log(res.status)
        const token = res.data.token
        axios.get(todo_url, {
          headers: {
            "Authorization": `Token ${token}`
          }
        })
        .then((res) => {
          console.log(res.status)
          res.data.map((e: any) => console.log(e))
        })
        .catch((e) => {
          console.log(e)
        })
  
      })
      .catch((e) => {
        console.log(e)
      })
  
  
  })();
  
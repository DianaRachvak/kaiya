change/add proxy: "http//localhost:8000/api"
add /api/ to all routes

componentDidMount() {
  fetch('/polls')
    .then (response => response.json())
    .then (body => console.log(body))
}

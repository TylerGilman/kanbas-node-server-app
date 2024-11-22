export default function Hello(app) {
app.get('/', (req, res) => {
  res.send("Welcome to Full Stack Development!");
});
app.get("/hello", (req, res) => {
  res.send("Life is good!");
});
}


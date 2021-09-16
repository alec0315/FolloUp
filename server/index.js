const query = require('../database/querys.js')
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;
app.use(express.static(path.join(__dirname, '..')));

// app.use('/', (req, res) => {
//   res.render('index.html')
// })

app.get('/getLeads', function (req, res) {
query.grab()
.then((data) => {

  res.send(data)
})
.catch((error) => {
  res.status(404)
  res.end()
})
});

app.post('/createLead', function (req, res) {
console.log(req.body)
query.insert(req.body)
.then((data) => {
  res.send(data)

})
.catch((error) => {
  res.status(404)
  res.end()
})
});


app.put('/updateLead', function (req, res) {
  console.log(req.body)
  query.update(req.body)
  .then((data) => {
    res.send(data)

  })
  .catch((error) => {
    res.status(404)
    res.end()
  })
  });



app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});
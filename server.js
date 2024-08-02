const express = require('express');
const path = require('path');

const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;

// Register our first middleware right after the route handler
app.use((req, res, next) => {
  const start = Date.now();
  next();

  const delta = Date.now() - start;
  console.log(`Request received: ${ req.method } ${ req.baseUrl }${ req.url } ${ delta }ms`);
});

app.use('/site', express.static(path.join(__dirname, 'public')));
// Register json parse middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My friends are very clever',
    caption: 'Let\'s play football'
  });
});
// Mounting the friends and messages routing
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${ PORT }`);
});
const express = require('express');
const app = express();
app.use(express.static('./dist/manual-project'));
app.get('/*', function (req, res) {
 res.sendFile(__dirname + '/dist/manual-project/index.html');
});
app.listen(process.env.PORT || 8080);

var app = require("./app");
app.listen(process.env.PORT || 80, function(){
  console.log("Express server listening on port %d ", this.address().port);
});
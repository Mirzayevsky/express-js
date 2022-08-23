function Log (req,res,next) {
  console.log("writing log");
  next()
}
module.exports = Log;
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/wrzuty');
var Schema = mongoose.Schema;


// create a schema
var wrzutSchema = new Schema({
  portal: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date
});

wrzutSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// the schema is useless so far
// we need to create a model using it
var wrzut = mongoose.model('wrzut', wrzutSchema);

// make this available to our users in our Node applications
module.exports = wrzut;

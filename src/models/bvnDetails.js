const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bvnSchema = new Schema({
      bvn:{
        type: String,
        required: true
      },
      FirstName:{
        type: String,
        required: true
      },
      MiddleName:{
        type: String,
        required: true
      },
      LastName:{
        type: String,
        required: true
      },
      DateOfBirth:{
        type: String,
        required: true
      },
      PhoneNumber:{
        type: String,
        required: true
      },
      RegistrationDate:{
        type: String,
        required: true
      },
      EnrollmentBank:{
        type: String,
        required: true
      },
      EnrollmentBranch:{
        type: String,
        required: true
      },
      WatchListed:{
        type: String,
        required: true
      }
})

module.exports = mongoose.model('bvn', bvnSchema)

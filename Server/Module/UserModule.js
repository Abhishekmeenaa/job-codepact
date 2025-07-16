const mongoose = require("mongoose")

const RegisterEmployee = new mongoose.Schema({

    name: { type: String },

    email: { type: String },

    phone: { type: String },

    DOB: { type: String },

    City: { type: String },

    Qualification: { type: String },

    Skill: { type: String }
    ,

    password: { type: String },

})
module.exports = mongoose.model("User", RegisterEmployee)

// const mongoose = require("mongoose");

// // const UserSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //   },
// //   phone: {
// //     type: String,
// //     required: true,
// //   },
// //   // email: { type: String, default: null, sparse: true },
// //   dob: {
// //     type: String,
// //   },
// //   city: {
// //     type: String,
// //   },
// //   qualification: {
// //     type: String,
// //   },
// //   skills: [
// //     {
// //       type: String,
// //     },
// //   ],

// //   desgination: {
// //     type: String,
// //   },

// //   age: {
// //     type: Number,
// //   },

// //   gender: {
// //     type: String,
// //   },

// //   password: {
// //     type: String,
// //   },
// //   resetPasswordToken: String,
// //   resetPasswordExpire: Date,
// //   pdfBrochure: String, // Changed from PDFbrochure to pdfBrochure for consistency
// // });

// // module.exports = mongoose.model("user", UserSchema);

// const UserSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
// });

// module.exports = mongoose.model("User", UserSchema);

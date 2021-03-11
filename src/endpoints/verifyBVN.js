const express = require('express')
const router = express.Router()
const BvnDetails = require('../models/bvnDetails')

const { nibss } = require('innovation-sandbox');

const errors = require('../commons/errors/nibss-error');
const { NIBSSError } = errors;

const generateNIBSSCredentials = async () => {
 // use the sandbox key and NIBSS org code
 // safely stored locally in our .env file
 const credentials = await nibss.Bvnr.Reset({
   sandbox_key: process.env.SANDBOX_KEY,
   organisation_code: process.env.NIBSS_ORG_CODE
 });

 const { status } = credentials;
 if (status && status >= 400) {
   const message = 'Request likely has invalid Sandbox key and/or NIBSS ORG code';
   console.error(`[HTTP:${status}] ${message}`);
   throw new NIBSSError({
     status,
     message
   });
 }

 return credentials;
};

const getNIBSSCredentials = async () => {
 // TODO call generateNIBSSCredentials as few times as possible
 // and save certs in memory. E.g save to Redis
 const certs = await generateNIBSSCredentials();
 return certs;
};

const verifyBVN = async (data) => {
 const verification = await nibss.Bvnr.VerifySingleBVN({
   ...data,
   sandbox_key: process.env.SANDBOX_KEY,
   organisation_code: process.env.NIBSS_ORG_CODE
 });
 return verification;
};

const handleVerificationReq = async (req, res) => {
 // TODO validate the bvn input from the client
 let { bvn } = req.body;
 try {
   // TODO use imported NIBSS SDK to verify the bvn input
   const { ivkey, aes_key: aesKey, password } = await getNIBSSCredentials();
const { data: verification } = await verifyBVN({
  bvn,
  ivkey,
  password,
  aes_key: aesKey
})
   const message = verification ? 'verification completed' : `BVN ${bvn} could not be found / verified`;
   return res.status(200).json({
     message,
     verification
   })
    .then(() => {

     const newBvn =  new BvnDetails({
      bvn
     })
     newBvn
     .save()
  }).catc(err => res.json(err))
 } catch (error) {
   console.log(error);
   res.status(500).json({
     message: 'Unable to handle your verification request. Pls try again or contact support'
   });
 }
};
const postDetails = (req, res) => {
  const { bvn, FirstName, MiddleName, LastName,
  DateOfBirth,
  PhoneNumber,
  RegistrationDate,
  EnrollmentBank,
  EnrollmentBranch,
  WatchListed } = req.body
  const newDetails = new BvnDetails({
    bvn, FirstName, MiddleName, LastName,
    DateOfBirth,
    PhoneNumber,
    RegistrationDate,
    EnrollmentBank,
    EnrollmentBranch,
    WatchListed
  })
  newDetails
  .save()
  .then((details) =>{
      return res.status(200).json({
        message: "Item Uploaded Successfully!",
        details
      });
  })
  .catch((error) =>{
      console.log(error);
  });

}
const getDetails = (req, res) => {
  BvnDetails.find()
  .then(details => res.status(200).json(details))
  .catch(err => res.status(400).json("Error getting Interns"))
}

router.post('/', handleVerificationReq)
router.get('/', getDetails)
router.post('/details', postDetails)

module.exports = router;

// SMS API
const express = require('express')
const router = express.Router()
const Request = require('request')
const { nibss } = require('innovation-sandbox');
const { atlabs } = require('innovation-sandbox')

const errors = require('../commons/errors/nibss-error');
const { NIBSSError } = errors;

// SMS Sender
const handleSMS = async (req, res) => {
    const { sms } = req.body;
  Request.post(
    'https://sandboxapi.fsi.ng/atlabs/messaging',
    (err, result)=>{
    if(err){
      throw new NIBSSError({
        status,
        message
      });
    }
    atlabs.SMS.SMSService({
      sandbox_key: process.env.SANDBOX_KEY,
      payload: {
    to: sms,
    from: "FSI",
    message: "Congrats, your request is successfully recieved, we will contact you soon"
  }
    }).then(result => {
      res.status(200).json({
        result,
        message: "Message Sent"
      })
    }).catch(err => {
      res.json(err)
    })
  })
}

router.post('/', handleSMS);

module.exports = router;

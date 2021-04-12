const nodemailer = require('nodemailer')
const { defaultEmailHost, defaultEmailHostPort } = require('../../config')

console.log(defaultEmailHostPort, defaultEmailHost)
const transporter = nodemailer.createTransport({
  host: defaultEmailHost,
  port: defaultEmailHostPort
})

const sendMail = ({ from, to, subject, text }) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail({ from, to, subject, html: text },
      function (err, info) {
        if (!err) {
          resolve(info)
        } else {
          reject(err)
        }
      })
  })
}

module.exports = { sendMail }

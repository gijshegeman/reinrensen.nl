import nodemailer from "nodemailer"

export default function handler(req, res) {
    const body = req.body

    const maillist = [
        "reinschildert@gmail.com",
        "gijshegeman@hotmail.com"
    ]

    if (req.method === "POST") {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APPPASS,
            }
        })

        const mailNaarKlant = {
            from: `${process.env.EMAIL_SENDER} ${process.env.GMAIL_USER}`,
            to: `${body.email}`,
            subject: `Contact formulier: ${body.naam}`,
            text: `Beste ${body.naam},
            \r\nBedankt dat u contact heeft opgenomen met mij!
            \r\nUw ingevulde gegevens zijn:
            \r\nNaam: \t\t${body.naam}\r\nTel: \t\t\t${body.tel} \r\nE-mail: \t\t${body.email}
            \r\nUw bericht: \n${body.bericht} 
            \r\nIk probeer zo snel mogeijk contact met u op te nemen!
            \r\nMet vriendelijke groet, 
            \r\nRein Rensen
            \r\n\r\nwww.reinrensen.nl \n\nE-mail: \t\treinschildert@gmail.com \nInstagram: \t@schilderein           
            \r\n\r\n
           `
        }

        const mailNaarRein = {
            from: `${process.env.EMAIL_SENDER} ${process.env.GMAIL_USER}`,
            to: maillist,
            subject: `Contactformulier van: ${body.naam}`,
            text: `Dag Rein,
            \r\nEr is een bericht binnengekomen.
            \r\nNaam: ${body.naam} \nTel: ${body.tel} \nE-mail: ${body.email}
            \r\n${body.bericht}
            \r\n\r\n
            `
        }

        transporter.sendMail(mailNaarKlant, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log("Email sent: " + info.response)
            }
        })

        transporter.sendMail(mailNaarRein, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log("Email sent: " + info.response)
            }
        })
    }
    res.status(200).end()
}
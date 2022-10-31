import nodemailer from "nodemailer"
import middleware from '../../../middleware/middleware'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
    // console.log(req.body)
    // console.log(req.files)

    const body = req.body

    let attachment = [
        {
            filename: req.files.file[0].originalFilename,
            path: req.files.file[0].path,
        },
    ]

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
            subject: `Bevestiging aanvraag schilderij van: ${body.voornaam} ${body.achternaam}`,
            attachments: attachment,
            text: `Beste ${body.voornaam},
                    \r\nBedankt, de aanvraag is in goede orde ontvangen! 
                    \r\nOver de prijs en de geschatte levertijd zal ik u zo snel mogelijk berichten.
                    \r\nUw ingevulde gegevens zijn:
                    \r\nNaam: \t\t${body.voornaam} ${body.achternaam} \r\nTel: \t\t\t${body.tel} \r\nE-mail: \t\t${body.email} \r\nFormaat: \t\t${body.custom
                    ? `aangepast: L ${body.lengteCM} x B ${body.breedteCM} cm`
                    : body.verassing
                        ? "Ik laat me verassen"
                        : `L ${body.lengteCM} x B ${body.breedteCM} cm`}
                    \r\nUw bericht:
                    \r\n${body.bericht}
                    \r\n
                    \r\nMocht er toch iets mis zijn gegaan of heeft u een aanvulling en/of vraag? Neem dan gerust contact met mij op via dit mailadres!
                    \r\n\r\nMet vriendelijke groet,
                    \r\nRein Rensen
                    \r\n\r\nwww.reinrensen.nl \n\nE-mail: \t\treinschildert@gmail.com \nInstagram: \t@schilderein 
                   `
        }

        const mailNaarRein = {
            from: `${process.env.EMAIL_SENDER} ${process.env.GMAIL_USER}`,
            to: maillist,
            subject: `Nieuwe aanvraag van: ${body.voornaam} ${body.achternaam}`,
            attachments: attachment,
            text: `Dag Rein,
                    \r\nEr is een nieuwe aanvraag binnengekomen.
                    \r\nNaam: ${body.voornaam} ${body.achternaam} \nTel: ${body.tel} \nE-mail: ${body.email} 
                    \nFormaat: ${body.custom
                    ? `aangepast: L ${body.lengteCM} x B ${body.breedteCM} cm`
                    : body.verassing
                        ? "Ik laat me verassen"
                        : `L ${body.lengteCM} x B ${body.breedteCM} cm`}
                    \r\n${body.bericht}`
        }

        try {
            let infoNaarRein = await transporter.sendMail(mailNaarRein)
            console.log("infoNaarRein:", infoNaarRein) // <-- See response op nodemailer
        } catch (error) {
            console.error("failed to send email naar Rein:", error)
        }

        try {
            let infoNaarKlant = await transporter.sendMail(mailNaarKlant)
            console.log("infoNaarKlant:", infoNaarKlant) // <-- See response op nodemailer
        } catch (error) {
            console.error("failed to send email naar klant:", error)
        }
        res.status(200).end()
    }
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler
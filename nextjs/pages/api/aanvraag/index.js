import nodemailer from "nodemailer"
import middleware from '../../../middleware/middleware'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.use(middleware)

export const config = {
    api: {
        bodyParser: false
    }
}

handler.post(async (req, res) => {
    // console.log(req.body)
    // console.log(req.files)

    let attachment = [
        {
            filename: req.files.file[0].originalFilename,
            path: req.files.file[0].path,
        },
    ]

    if (req.method === "POST") {
        const {
            voornaam,
            achternaam,
            emailCustommer,
            tel,
            custom,
            lengteCM,
            breedteCM,
            verassing,
            bericht
        } = req.body

        const maillist = [
            // "reinschildert@gmail.com",
            "gijshegeman@hotmail.com"
        ]

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APPPASS,
            }
        })

        const mailNaarRein = {
            from: `${process.env.EMAIL_SENDER} ${process.env.GMAIL_USER}`,
            to: maillist,
            subject: `Nieuwe aanvraag van: ${voornaam} ${achternaam}`,
            attachments: attachment,
            text: `Dag Rein,
                    \r\nEr is een nieuwe aanvraag binnengekomen.
                    \r\nNaam: ${voornaam} ${achternaam} \nTel: ${tel} \nE-mail: ${emailCustommer} 
                    \nFormaat: ${custom
                    ? `aangepast: L ${lengteCM} x B ${breedteCM} cm`
                    : verassing
                        ? "Ik laat me verassen"
                        : `L ${lengteCM} x B ${breedteCM} cm`}
                    \r\n${bericht}`
        }

        const mailNaarKlant = {
            from: `${process.env.EMAIL_SENDER} ${process.env.GMAIL_USER}`,
            to: `${emailCustommer}`,
            subject: `Bevestiging aanvraag schilderij van: ${voornaam} ${achternaam}`,
            attachments: attachment,
            text: `Beste ${voornaam},
                    \r\nBedankt, de aanvraag is in goede orde ontvangen! 
                    \r\nOver de prijs en de geschatte levertijd zal ik u zo snel mogelijk berichten.
                    \r\nUw ingevulde gegevens zijn:
                    \r\nNaam: \t\t${voornaam} ${achternaam} \r\nTel: \t\t\t${tel} \r\nE-mail: \t\t${emailCustommer} \r\nFormaat: \t\t${custom
                    ? `aangepast: L ${lengteCM} x B ${breedteCM} cm`
                    : verassing
                        ? "Ik laat me verassen"
                        : `L ${lengteCM} x B ${breedteCM} cm`}
                    \r\nUw bericht:
                    \r\n${bericht}
                    \r\n
                    \r\nMocht er toch iets mis zijn gegaan of heeft u een aanvulling en/of vraag? Neem dan gerust contact met mij op via dit mailadres!
                    \r\n\r\nMet vriendelijke groet,
                    \r\nRein Rensen
                    \r\n\r\nwww.reinrensen.nl \n\nE-mail: \t\treinschildert@gmail.com \nInstagram: \t@schilderein 
                   `
        }
        res.status(200).send({ message: "emails send request succesfull" })

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
        return
    }
})



export default handler
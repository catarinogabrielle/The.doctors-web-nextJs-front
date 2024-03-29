const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.API_KEY_SEND_GRID
        }
    })
)

export default async (req, res) => {
    const { email, name, courseName, paymentlink } = req.body

    try {

        const message = {
            from: 'gabrielle.castro@ymonetize.com',
            to: email,
            subject: `Link de pagamento do curso ${courseName}`,
            html: `<p>Olá ${name}</p><b>O curso ${courseName} já é quase seu.</b><br><br><text>Acesse o link ${paymentlink} para efetuar o pagamento, e iniciar o curso.</text><br><br><text>Após o pagamento ser confirmado, você podera acessar o curso no período de 1 dia, <strong>IMPORTANTE QUE VOCÊ ADICIONE O EMAIL ${email} NO LINK DE PAGAMENTO, APARA CADASTRARMOS O MESMO EMAIL DA PLATAFORMA!</strong></text><br><text>Em caso de dúvidas, acesse nossa central de ajuda ou envie um e-mail para @catarinogabrielle@gmail.com</text><br><p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Consulte nossa equipe para obter mais informações sobre a plataforma. <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Este e-mail foi enviado para: </font></font><a href="mailto:${email}" target="_blank"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${email}</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> . </font><font style="vertical-align: inherit;">Não responda a este e-mail, uma vez que este endereço de e-mail não é monitorado.</font></font></p><p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">© 2023 The doctors agência e suas entidades relacionadas. </font><font style="vertical-align: inherit;">Todos os direitos reservados.</font></font></p>`,
            replyTo: 'gabrielle.castro@ymonetize.com'
        }

        await transporter.sendMail(message)

        return res.send('')
    } catch (err) {
        return res.json({
            error: true,
            message: err.message
        })
    }
}
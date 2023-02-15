import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: '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'
        }
    })
)

export default async function SendEmail(req, res) {
    const { email, name, courseName, link } = req.body

    console.log(email)

    try {

        const message = {
            from: 'catarinogabrielle@gmail.com',
            to: email,
            subject: `Link de pagamento do curso ${courseName}`,
            html: `<p>Olá ${name}</p><b>O curso ${courseName} já é quase seu.</b><br><br><text>Acesse o link ${link} para efetuar o pagamento, e iniciar o curso.</text><br><br><text>Após o pagamento ser confirmado, você podera acessar o curso no período de 1 dia</text><br><text>Em caso de dúvidas, acesse nossa central de ajuda ou envie um e-mail para catarinogabrielle@gmail.com .</text><br><p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Consulte nossa equipe para obter mais informações sobre a plataforma. <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Este e-mail foi enviado para: </font></font><a href="mailto:catarinogabrielle@gmail.com" target="_blank"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">catarinogabrielle@gmail.com</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> . </font><font style="vertical-align: inherit;">Não responda a este e-mail, uma vez que este endereço de e-mail não é monitorado.</font></font></p><p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">© 2023 The doctors agência e suas entidades relacionadas. </font><font style="vertical-align: inherit;">Todos os direitos reservados.</font></font></p>`,
            replyTo: 'catarinogabrielle@gmail.com'
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
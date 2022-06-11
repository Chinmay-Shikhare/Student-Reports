import nodemailer from "nodemailer";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const sendMail =
    (id: string, password: string, email: string) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: 'testingmycode011@gmail.com',
                pass: 'testingmycode011#$*'
            }
        });
        let mailOptions = {
            from: 'test@gmail.com',
            to: `${email}`,
            subject: `Student Reports`,
            text: `Thanks for Registering. Your user id is ${id} and password is ${password}`
        };
        transporter.sendMail(mailOptions, function (err: any, data: any) {
            if (err) { console.log(err); }
            else { console.log(`email send`); }
        });
    }
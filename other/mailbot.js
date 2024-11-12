import nodemailer from "nodemailer";

async function sendEmail(subject, body, to) {
    // Set up the SMTP server configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',//add club mail id
            pass: '' // password after smtp
        }
    });

    // Define the email options
    let mailOptions = {
        from: '',//add club mail id 
        to: to,
        subject: subject,
        text: body
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// List of emails
const recipients = [ ""]; // add list of mail id 

(async () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Prompt user for subject and body of the email
    readline.question("Subject of the mail: ", subject => {
        readline.question("What is the message: ", message => {
            console.log("Sending emails...");
            recipients.forEach(email => sendEmail(subject, message, email));
            console.log("Messages have been sent successfully.");
            readline.close();
        });
    });
})();




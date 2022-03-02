import mailgun from 'mailgun-js';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const mg = mailgun({
	apiKey: 'cf8cface470565947d364a1e7c12a9e6-45f7aa85-b13994dd',
	domain: 'sandboxb0ab94fa279e43b0aa742f5fe3e4f378.mailgun.org',
});

const sendMail = async (message, res) => {
	const { from, to, subject, attachment, template, html, text } = message;
	const data = {
		from,
		to,
		subject,
		text,
		template,
		inline: attachment,
		html,
		// 'h:X-Mailgun-Variables': JSON.stringify({ token: `${token}` }),
	};

	await mg.messages().send(data, (error, body) => {
		if (error) {
			return res.status(400).json({ error: error });
		}
		// console.log(body);
		return res.status(200).json({
			message: 'Email has been sent successfully.',
		});
	});
};

export default sendMail;

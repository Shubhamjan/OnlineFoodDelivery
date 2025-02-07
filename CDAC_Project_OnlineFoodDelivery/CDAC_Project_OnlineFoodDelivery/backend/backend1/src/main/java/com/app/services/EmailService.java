package com.app.services;

import java.util.Properties;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class EmailService {
	
	@Autowired
	private JavaMailSender mailSender;

	public void sendPasswordResetEmail(String toEmail, String resetLink) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(toEmail);
		message.setSubject("Password Reset Request");
		message.setText("To reset your password, click the link below:\n" + resetLink);
		message.setFrom("noreply@yourdomain.com");

		mailSender.send(message);
	}

	public static boolean sendEmail(String recipient, String subject, String body) {
		String senderEmail = "jsuraj61@gmail.com";
		String senderPassword = "wuuphjfjhyxawtpp";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(senderEmail, senderPassword);
			}
		});

		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(senderEmail));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
			message.setSubject(subject);
			message.setText(body);

			Transport.send(message);

			System.out.println("Email sent successfully to " + recipient);
			return true;
		} catch (MessagingException e) {
			System.out.println("Error sending email: " + e.getMessage());
			return false;
		}
	}

}
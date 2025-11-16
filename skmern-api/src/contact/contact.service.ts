import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configuration du transporteur d'email
    // Utilisez vos propres identifiants SMTP
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true pour 465, false pour les autres ports
      auth: {
        user: process.env.SMTP_USER || 'abdelilahsakkiou.21@gmail.com',
        pass: process.env.SMTP_PASS || '', // Mot de passe d'application Gmail
      },
    });
  }

  async sendContactEmail(createContactDto: CreateContactDto) {
    const { prenom, nom, email, telephone, sujet, message } = createContactDto;

    // Mapper les sujets en français
    const subjectMap = {
      menage: '🏠 Service de Ménage',
      jardinage: '🌱 Jardinage',
      reparation: '🔧 Réparation',
      plomberie: '🚿 Plomberie',
      electricite: '⚡ Électricité',
      peinture: '🎨 Peinture et Décoration',
      autre: '📋 Autre',
    };

    const subjectLabel = subjectMap[sujet] || sujet;

    // Configuration de l'email
    const mailOptions = {
      from: `"FIXILYA Contact" <${process.env.SMTP_USER || 'abdelilahsakkiou.21@gmail.com'}>`,
      to: process.env.CONTACT_EMAIL || 'abdelilahsakkiou.21@gmail.com',
      replyTo: email,
      subject: `Nouveau message de contact - ${subjectLabel}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
            }
            .content {
              padding: 30px;
            }
            .info-row {
              margin-bottom: 20px;
              padding: 15px;
              background: #f8f9fa;
              border-radius: 8px;
              border-left: 4px solid #00acc1;
            }
            .info-label {
              font-weight: 600;
              color: #16213e;
              margin-bottom: 5px;
              font-size: 14px;
              text-transform: uppercase;
            }
            .info-value {
              color: #333;
              font-size: 16px;
            }
            .message-box {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #ffd700;
              margin-top: 20px;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #e0e0e0;
            }
            .badge {
              display: inline-block;
              padding: 5px 15px;
              background: #00acc1;
              color: white;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Nouveau Message de Contact</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Plateforme FIXILYA</p>
            </div>
            
            <div class="content">
              <div style="text-align: center; margin-bottom: 25px;">
                <span class="badge">${subjectLabel}</span>
              </div>

              <div class="info-row">
                <div class="info-label">👤 Nom Complet</div>
                <div class="info-value">${prenom} ${nom}</div>
              </div>

              <div class="info-row">
                <div class="info-label">📧 Email</div>
                <div class="info-value"><a href="mailto:${email}" style="color: #00acc1; text-decoration: none;">${email}</a></div>
              </div>

              ${telephone ? `
              <div class="info-row">
                <div class="info-label">📞 Téléphone</div>
                <div class="info-value"><a href="tel:${telephone}" style="color: #00acc1; text-decoration: none;">${telephone}</a></div>
              </div>
              ` : ''}

              <div class="message-box">
                <div class="info-label">💬 Message</div>
                <div class="info-value" style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 5px 0;">🏠 NADOR-Maroc SELOUANE, 62000, MAROC</p>
              <p style="margin: 5px 0;">📞 +212 06 19 95 58 98</p>
              <p style="margin: 15px 0 5px 0; color: #999; font-size: 12px;">
                © ${new Date().getFullYear()} FIXILYA - Tous droits réservés
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email envoyé avec succès:', info.messageId);
      return {
        success: true,
        message: 'Email envoyé avec succès',
        messageId: info.messageId,
      };
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      throw error;
    }
  }
}


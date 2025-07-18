import { NextRequest, NextResponse } from 'next/server';
import { outlookService } from '@/lib/outlookService';

// GET - pobierz szablony komunikacji
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // email, sms, whatsapp

    switch (type) {
      case 'email': {
        const emailTemplates = await outlookService.getEmailTemplates();
        return NextResponse.json({
          success: true,
          data: emailTemplates,
          total: emailTemplates.length
        });
      }

      case 'sms': {
        const smsTemplates = await outlookService.getSMSTemplates();
        return NextResponse.json({
          success: true,
          data: smsTemplates,
          total: smsTemplates.length
        });
      }

      case 'whatsapp': {
        const whatsappTemplates = await outlookService.getWhatsAppTemplates();
        return NextResponse.json({
          success: true,
          data: whatsappTemplates,
          total: whatsappTemplates.length
        });
      }

      default: {
        // Zwróć wszystkie typy szablonów
        const [emailTemplates, smsTemplates, whatsappTemplates] = await Promise.all([
          outlookService.getEmailTemplates(),
          outlookService.getSMSTemplates(),
          outlookService.getWhatsAppTemplates()
        ]);

        return NextResponse.json({
          success: true,
          data: {
            email: emailTemplates,
            sms: smsTemplates,
            whatsapp: whatsappTemplates
          }
        });
      }
    }
  } catch (error) {
    console.error('Error fetching communication templates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

// POST - wyślij komunikację
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      type, 
      templateId, 
      customerId, 
      customerName, 
      email, 
      phone, 
      data 
    } = body;

    if (!type || !templateId || !customerId || !customerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let result: string;

    switch (type) {
      case 'email':
        if (!email) {
          return NextResponse.json(
            { success: false, error: 'Email address required for email communication' },
            { status: 400 }
          );
        }
        result = await outlookService.sendTemplateEmail(templateId, [email], data);
        break;

      case 'sms':
        if (!phone) {
          return NextResponse.json(
            { success: false, error: 'Phone number required for SMS communication' },
            { status: 400 }
          );
        }
        result = await outlookService.sendSMS(phone, templateId, data);
        break;

      case 'whatsapp':
        if (!phone) {
          return NextResponse.json(
            { success: false, error: 'Phone number required for WhatsApp communication' },
            { status: 400 }
          );
        }
        result = await outlookService.sendWhatsApp(phone, templateId, data);
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid communication type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: { messageId: result },
      message: `${type.toUpperCase()} sent successfully`
    });
  } catch (error) {
    console.error('Error sending communication:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send communication' },
      { status: 500 }
    );
  }
}

// PUT - zaktualizuj szablon
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, templateId, updates } = body;

    if (!type || !templateId || !updates) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    switch (type) {
      case 'email':
        await outlookService.updateEmailTemplate(templateId, updates);
        break;
      // SMS i WhatsApp templates nie mają jeszcze metod update
      default:
        return NextResponse.json(
          { success: false, error: 'Template update not supported for this type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: 'Template updated successfully'
    });
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update template' },
      { status: 500 }
    );
  }
} 
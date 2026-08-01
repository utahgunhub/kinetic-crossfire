import emailjs from '@emailjs/browser';

// EmailJS Configuration (hardcoded)
const EMAILJS_SERVICE_ID = 'service_2333go7';
const EMAILJS_ORDER_TEMPLATE_ID = 'template_tl7gbn7';
const EMAILJS_CONTACT_TEMPLATE_ID = 'template_9bb08pc';
const EMAILJS_DEALER_APPLICATION_TEMPLATE_ID = 'template_hjy8hxt';
const EMAILJS_PUBLIC_KEY = 'fHx6hqplnCkUeAcXP';

const ORDER_CONFIRMATION_MESSAGE =
  "Thank you for placing an order with Kinetic Crossfire, we will process it and ship it in the next two business days. Please remember that your bolt must be clean and lubricated more than usual. Be sure to read the User's Guide, and feel free to contact us with any questions. Have fun on the Range!";

interface OrderEmailParams {
  transactionId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    pricePerItem: number;
    totalForItem: number;
  }>;
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
}

interface ContactEmailParams {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends an order confirmation email to the customer
 * @param orderData - The order information to send
 * @returns Promise that resolves when email is sent
 */
export const sendOrderConfirmationEmail = async (orderData: OrderEmailParams): Promise<void> => {
  try {
    const includesThompsonFRT = orderData.items.some(
      (item) => item.productId === "thompson-blow-back-trigger"
    );

    // Format the items list for the email
    const itemsList = orderData.items.map((item, index) => 
      `${index + 1}. ${item.productName}
   - Quantity: ${item.quantity}
   - Price per item: $${item.pricePerItem.toFixed(2)}
   - Total: $${item.totalForItem.toFixed(2)}`
    ).join('\n\n');

    const itemsListWithGuide = includesThompsonFRT
      ? `${itemsList}\n\nThompson FRT User's Guide:\nhttps://kinetic-crossfire.com/user-guide.pdf`
      : itemsList;

    // Prepare the email template parameters
    const templateParams = {
      to_email: orderData.customerEmail,
      customer_name: orderData.customerName,
      order_number: orderData.transactionId,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      shipping_address: orderData.shippingAddress,
      items_list: itemsListWithGuide,
      order_message: ORDER_CONFIRMATION_MESSAGE,
      subtotal: `$${orderData.subtotal.toFixed(2)}`,
      shipping: `$${orderData.shipping.toFixed(2)}`,
      discount: orderData.discount && orderData.discount > 0
        ? `-$${orderData.discount.toFixed(2)}`
        : '$0.00',
      total: `$${orderData.total.toFixed(2)}`,
    };

    console.log('📧 Sending order confirmation email to:', orderData.customerEmail);
    
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ORDER_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Order confirmation email sent successfully!', response.status, response.text);
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    // Don't throw the error - we don't want to block the order if email fails
    // The order was already successful, email is just a nice-to-have
  }
};

/**
 * Sends a contact form submission email
 * @param contactData - Contact form information to send
 * @returns Promise that resolves when email is sent
 */
export const sendContactEmail = async (contactData: ContactEmailParams): Promise<void> => {
  const fullName = `${contactData.firstName} ${contactData.lastName}`.trim();
  const templateParams = {
    from_name: fullName,
    first_name: contactData.firstName,
    last_name: contactData.lastName,
    reply_to: contactData.email,
    from_email: contactData.email,
    subject: contactData.subject,
    message: contactData.message,
  };

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_CONTACT_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );
};

export interface DealerApplicationEmailParams {
  dealerName: string;
  gunsmithingServices: "yes" | "no";
  agentName: string;
  title: string;
  businessPhone: string;
  contactPhone: string;
  email: string;
  website: string;
  address: string;
  cityStateZip: string;
  signatureDate: string;
  agreementAccepted: boolean;
  applicationBody: string;
}

export const sendDealerApplicationEmail = async (
  application: DealerApplicationEmailParams
): Promise<void> => {
  const templateParams = {
    dealer_name: application.dealerName,
    gunsmithing_services: application.gunsmithingServices === "yes" ? "Yes" : "No",
    agent_name: application.agentName,
    title: application.title || "N/A",
    business_phone: application.businessPhone,
    contact_phone: application.contactPhone,
    email: application.email,
    reply_to: application.email,
    website: application.website || "N/A",
    address: application.address,
    city_state_zip: application.cityStateZip,
    signature_date: application.signatureDate,
    agreement_accepted: application.agreementAccepted ? "Yes" : "No",
    application_body: application.applicationBody,
    subject: `Dealer application — ${application.dealerName}`,
  };

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_DEALER_APPLICATION_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );
};







import emailjs from '@emailjs/browser';

// EmailJS Configuration (hardcoded)
const EMAILJS_SERVICE_ID = 'service_2333go7';
const EMAILJS_ORDER_TEMPLATE_ID = 'template_tl7gbn7';
const EMAILJS_CONTACT_TEMPLATE_ID = 'template_9bb08pc';
const EMAILJS_PUBLIC_KEY = 'fHx6hqplnCkUeAcXP';

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
      ? `${itemsList}\n\nThompson FRT Troubleshooting Guide:\nhttps://kinetic-crossfire.com/trouble-shooting.pdf`
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
      subtotal: `$${orderData.subtotal.toFixed(2)}`,
      shipping: `$${orderData.shipping.toFixed(2)}`,
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







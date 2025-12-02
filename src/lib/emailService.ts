import emailjs from '@emailjs/browser';

// EmailJS Configuration (hardcoded)
const EMAILJS_SERVICE_ID = 'service_4s5lsdc';
const EMAILJS_TEMPLATE_ID = 'template_xba6pcp';
const EMAILJS_PUBLIC_KEY = 'LHhhab8fiZXeSNaGT';

interface OrderEmailParams {
  transactionId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: Array<{
    productName: string;
    quantity: number;
    pricePerItem: number;
    totalForItem: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
}

/**
 * Sends an order confirmation email to the customer
 * @param orderData - The order information to send
 * @returns Promise that resolves when email is sent
 */
export const sendOrderConfirmationEmail = async (orderData: OrderEmailParams): Promise<void> => {
  try {
    // Format the items list for the email
    const itemsList = orderData.items.map((item, index) => 
      `${index + 1}. ${item.productName}
   - Quantity: ${item.quantity}
   - Price per item: $${item.pricePerItem.toFixed(2)}
   - Total: $${item.totalForItem.toFixed(2)}`
    ).join('\n\n');

    // Prepare the email template parameters
    const templateParams = {
      to_email: orderData.customerEmail,
      customer_name: orderData.customerName,
      order_number: orderData.transactionId,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      shipping_address: orderData.shippingAddress,
      items_list: itemsList,
      subtotal: `$${orderData.subtotal.toFixed(2)}`,
      shipping: `$${orderData.shipping.toFixed(2)}`,
      total: `$${orderData.total.toFixed(2)}`,
    };

    console.log('📧 Sending order confirmation email to:', orderData.customerEmail);
    
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
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


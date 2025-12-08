# EmailJS Template Setup Guide

This guide explains how to configure your EmailJS template for order confirmation emails.

## EmailJS Configuration

Your EmailJS credentials are hardcoded in the website:
- **Service ID**: `service_4s5lsdc`
- **Template ID**: `template_xba6pcp`
- **Public Key**: `LHhhab8fiZXeSNaGT`

## Template Configuration

Go to [EmailJS Dashboard](https://dashboard.emailjs.com/) and configure your template with the following:

### Email Template Structure

**Subject Line:**
```
Order Confirmation - {{order_number}} - Kinetic Crossfire
```

**Email Body:**
```
Hello {{customer_name}},

Thank you for placing an order with Kinetic Crossfire, we will process it and ship it in the next two business days. Please remember that your bolt must be clean and lubricated more than usual, and to use .556 ammunition for best results with higher weight springs. Have fun on the range!

- Kinetic Crossfire

---

ORDER DETAILS
---

Order Number: {{order_number}}

Customer Name: {{customer_name}}
Customer Email: {{customer_email}}
Customer Phone: {{customer_phone}}

Shipping Address:
{{shipping_address}}

---

ITEMS ORDERED
---

{{items_list}}

---

ORDER SUMMARY
---

Subtotal: {{subtotal}}
Shipping: {{shipping}}
Total: {{total}}

---

Thank you for your order!

Kinetic Crossfire
```

### Template Variables

Make sure your EmailJS template includes these variables:

- `{{to_email}}` - Recipient email address (configure in "To Email" field)
- `{{customer_name}}` - Customer's full name
- `{{order_number}}` - Transaction ID from Authorize.net
- `{{customer_email}}` - Customer's email address
- `{{customer_phone}}` - Customer's phone number
- `{{shipping_address}}` - Full formatted shipping address
- `{{items_list}}` - List of ordered items with details
- `{{subtotal}}` - Order subtotal
- `{{shipping}}` - Shipping cost
- `{{total}}` - Total order amount

### Important Settings

1. **To Email**: Set to `{{to_email}}` so it sends to the customer
2. **From Name**: Set to "Kinetic Crossfire"
3. **From Email**: Your verified sender email
4. **Reply To**: Your support email address

## Testing

After setting up:

1. Place a test order on your website
2. Check the browser console for email sending logs
3. Verify the customer receives the email
4. Check that all order details are correct in the email

## Troubleshooting

- **Email not sending**: Check browser console for errors
- **Missing variables**: Make sure all variables are wrapped in `{{}}` in the template
- **Incorrect data**: Verify the template variable names match exactly
- **Spam folder**: Check customer's spam/junk folder

## Email Sending Behavior

- Emails are sent automatically after successful payment
- If email sending fails, the order still completes successfully
- Email failures are logged in the browser console but don't block the checkout




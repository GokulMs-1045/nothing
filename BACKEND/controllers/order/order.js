import Product from '../../models/Dealer/product.model.js';
import Dealer from '../../models/Dealer/dealerStore.model.js';
import Order from '../../models/Customer/order.model.js';

export const createOrderbyId = async (req, res) => {
  try {
    console.log('Received Order Request:', req.body);
    console.log('Route Parameters:', req.params);

    // Extract googleId and productName from route parameters
    const { googleId, productName } = req.params;

    // Extract order details from the request body
    const {
      quantity,
      deliveryDate,
      deliveryTime,
      deliveryType,
      regularDeliveryDetails,
      deliveryMode,
      paymentMode,
      shippingDetails,
    } = req.body;

    // Manual validation
    if (!productName) return res.status(400).json({ message: 'Product name is required' });
    if (!quantity || !Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ message: 'Quantity must be a positive integer' });
    if (!deliveryDate || isNaN(Date.parse(deliveryDate))) return res.status(400).json({ message: 'Delivery date must be a valid date' });
    if (new Date(deliveryDate) <= new Date()) return res.status(400).json({ message: 'Delivery date must be in the future' });
    if (!deliveryTime || !['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'].includes(deliveryTime)) return res.status(400).json({ message: 'Invalid delivery time' });
    if (!deliveryType || !['One Time Delivery', 'Regular Delivery'].includes(deliveryType)) return res.status(400).json({ message: 'Invalid delivery type' });
    if (deliveryType === 'Regular Delivery' && (!regularDeliveryDetails || !regularDeliveryDetails.frequency || !['Daily', 'Weekly', 'Monthly'].includes(regularDeliveryDetails.frequency))) return res.status(400).json({ message: 'Invalid regular delivery details' });
    if (!deliveryMode) return res.status(400).json({ message: 'Delivery mode is required' });
    if (!paymentMode || !['Cash on Delivery', 'Online Payment'].includes(paymentMode)) return res.status(400).json({ message: 'Invalid payment mode' });
    if (!shippingDetails || typeof shippingDetails !== 'object' || !shippingDetails.name || !shippingDetails.phoneNumber || !shippingDetails.email || !shippingDetails.zip || !shippingDetails.city || !shippingDetails.state || !shippingDetails.landmark || !shippingDetails.address) {
      return res.status(400).json({ message: 'Invalid or missing shipping details' });
    }

    // Fetch product details by product name from Dealer database
    console.log('Searching for product with name:', productName);
    const product = await Product.findOne({ productName: new RegExp(`^${productName}$`, 'i') });
    if (!product) {
      console.error('Product not found for name:', productName);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product Found:', product);

    // Fetch dealer details by googleId from UserDetails database
    console.log('Fetching dealer with googleId:', product.googleId);
    const dealer = await Dealer.findOne({ googleId: product.googleId });
    if (!dealer) {
      console.error('Dealer not found for googleId:', product.googleId);
      return res.status(404).json({ message: 'Dealer not found' });
    }
    console.log('Dealer Found:', dealer);

    // Verify that the googleId from the route matches the authenticated user
    //if (!req.user || !req.user.googleId || req.user.googleId !== googleId) {
    //  return res.status(401).json({ message: 'Unauthorized: googleId does not match authenticated user' });
    //}

    // Handle file upload for online payment
    let paymentFile = null;
    if (paymentMode === 'Online Payment') {
      if (!req.file) {
        return res.status(400).json({ message: 'Payment file is required for online payment' });
      }
      paymentFile = req.file.path; // Assuming multer is set up
    }

    // Prepare order data
    const orderData = {
      googleId, // Use the googleId from the route
      productName: product._id, // Use product ID instead of name
      productDescription: product.description,
      returnPolicy: product.returnPolicy,
      price: product.price,
      quantity,
      deliveryDate: new Date(deliveryDate),
      deliveryTime,
      deliveryType,
      regularDeliveryDetails: deliveryType === 'Regular Delivery' ? regularDeliveryDetails : undefined,
      deliveryMode,
      paymentMode,
      paymentFile,
      shippingDetails,
    };

    console.log('Creating Order with Data:', orderData);

    // Create and save the order
    const newOrder = new Order(orderData);
    await newOrder.save();
    console.log('Order Created Successfully:', newOrder);

    return res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
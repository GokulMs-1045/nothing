import Product from '../../models/Dealer/product.model.js';
import Dealer from '../../models/Dealer/dealerStore.model.js';
import Order from '../../models/Customer/order.model.js';


export const createOrderbyId = async (req, res) => {
  try {
    console.log('Received Order Request:', req.body);
    console.log('Route Parameters:', req.params);

    const { googleId, productName } = req.params;
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

    // Manual validation (unchanged)
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

    // Fetch product details
    console.log('Searching for product with name:', productName);
    const product = await Product.findOne({ productName: new RegExp(`^${productName}$`, 'i') });
    if (!product) {
      console.error('Product not found for name:', productName);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product Found:', product);

    // Fetch dealer details
    console.log('Fetching dealer with googleId:', product.googleId);
    const dealer = await Dealer.findOne({ googleId: product.googleId });
    if (!dealer) {
      console.error('Dealer not found for googleId:', product.googleId);
      return res.status(404).json({ message: 'Dealer not found' });
    }
    console.log('Dealer Found:', dealer);

    // Handle file upload for online payment
    let paymentFile = null;
    if (paymentMode === 'Online Payment') {
      if (!req.file) {
        return res.status(400).json({ message: 'Payment file is required for online payment' });
      }
      paymentFile = req.file.path;
    }

    // Prepare order data with product name as string
    const orderData = {
      googleId,
      productName: product.productName, // Store the actual string name
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

    return res.status(201).json({ 
      message: 'Order created successfully', 
      order: newOrder 
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getOrdersById = async (req, res) => {
  try {
    const { googleId, productName } = req.params;

    if (!googleId) {
      return res.status(400).json({ message: 'googleId is required' });
    }

    const query = { googleId };

    if (productName) {
      const product = await Product.findOne({ productName: new RegExp(`^${productName}$`, 'i') });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      query.productName = product._id;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    // Manually fetch product details
    const populatedOrders = await Promise.all(
      orders.map(async (order) => {
        const product = await Product.findById(order.productName);
        return {
          ...order.toObject(),
          productDetails: product ? {
            productName: product.productName,
            description: product.description,
            price: product.price,
            returnPolicy: product.returnPolicy,
          } : null,
        };
      })
    );

    return res.status(200).json({ message: 'Orders fetched successfully', orders: populatedOrders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders and populate product details
    const orders = await Order.find({})
      .populate('productName', 'productName description price returnPolicy') // Populate product details
      .sort({ createdAt: -1 }); // Sort by creation date (newest first)

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found in the database' });
    }

    console.log('All Orders Found:', orders);
    return res.status(200).json({ message: 'All orders fetched successfully', orders });
  } catch (error) {
    console.error('Fetch all orders error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
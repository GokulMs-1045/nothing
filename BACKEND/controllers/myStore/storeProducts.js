import Dealer from '../../models/Dealer/dealerStore.model.js';
import Product from '../../models/Dealer/product.model.js';
import { UserDetails, Dealer as DealerConn } from '../../config/db.js';

let DealerModel, ProductModel;

const initializeModels = async () => {
  try {
    const userDetailsConn = await UserDetails;
    const dealerConn = await DealerConn;

    console.log('UserDetails connection readyState:', userDetailsConn.readyState);
    console.log('Dealer connection readyState:', dealerConn.readyState);

    DealerModel = Dealer(userDetailsConn);
    ProductModel = Product(dealerConn);

    console.log('DealerModel collection name:', DealerModel.collection.collectionName);
    console.log('ProductModel collection name:', ProductModel.collection.collectionName);
    console.log('DealerModel initialized:', !!DealerModel);
    console.log('ProductModel initialized:', !!ProductModel);
  } catch (error) {
    console.error('Error initializing models:', error.message);
    throw error;
  }
};

// POST: Add a new product
export const addProduct = async (req, res) => {
  try {
    const { googleId } = req.params;
    const { name, description, instock, price,returnPolicy } = req.body;

    console.log('Received request to add product for googleId:', googleId);
    console.log('Request headers:', req.headers);
    console.log('Product data from body:', { name, description, instock, price,returnPolicy });

    if (!googleId) {
      console.log('Google ID is missing from route');
      return res.status(400).json({ error: 'Google ID is required in the route' });
    }
    if (!name || !description || instock === undefined || price === undefined||!returnPolicy) {
      console.log('Missing required product fields');
      return res.status(400).json({ error: 'All fields (name, description, instock, price) are required in the body' });
    }

    const trimmedGoogleId = googleId.trim();
    console.log('Trimmed googleId:', trimmedGoogleId);

    if (!DealerModel || !ProductModel) {
      console.log('Initializing models...');
      await initializeModels();
    }

    console.log('Checking if dealer exists with googleId:', trimmedGoogleId);
    const dealer = await DealerModel.findOne({
      googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') }
    }).lean();
    console.log('Dealer query result:', dealer);

    if (!dealer) {
      console.log('Dealer not found for googleId:', trimmedGoogleId);
      return res.status(404).json({ error: 'Dealer not found in UserDetails database' });
    }

    const newProduct = {
      googleId: trimmedGoogleId,
      name,
      description,
      instock,
      price,
      returnPolicy
    };

    console.log('Saving new product to Dealer database:', newProduct);
    const savedProduct = await ProductModel.create(newProduct);
    console.log('Saved product:', savedProduct);
    console.log('Saved to collection:', ProductModel.collection.collectionName);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('❌ Error adding product:', error.message);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'A product with this name already exists for this dealer' });
    }
    if (error.name === 'MongooseError' || error.name === 'MongoNetworkError') {
      return res.status(503).json({
        error: 'Database connection issue',
        details: error.message,
      });
    }
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
};

// GET: Get all products for a dealer
export const getProductsByGoogleId = async (req, res) => {
  try {
    const { googleId } = req.params;

    console.log('Received request to get products for googleId:', googleId);
    console.log('Request headers:', req.headers);

    if (!googleId) {
      console.log('Google ID is missing from route');
      return res.status(400).json({ error: 'Google ID is required in the route' });
    }

    const trimmedGoogleId = googleId.trim();
    console.log('Trimmed googleId:', trimmedGoogleId);

    if (!DealerModel || !ProductModel) {
      console.log('Initializing models...');
      await initializeModels();
    }

    console.log('Checking if dealer exists with googleId:', trimmedGoogleId);
    const dealer = await DealerModel.findOne({
      googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') }
    }).lean();
    console.log('Dealer query result:', dealer);

    if (!dealer) {
      console.log('Dealer not found for googleId:', trimmedGoogleId);
      return res.status(404).json({ error: 'Dealer not found in UserDetails database' });
    }

    console.log('Querying products for googleId:', trimmedGoogleId);
    const products = await ProductModel.find({
      googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') }
    }).lean();
    console.log('Products query result:', products);

    if (!products || products.length === 0) {
      console.log('No products found for googleId:', trimmedGoogleId);
      return res.status(404).json({ error: 'No products found for this dealer' });
    }

    console.log('Sending products response:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    if (error.name === 'MongooseError' || error.name === 'MongoNetworkError') {
      return res.status(503).json({
        error: 'Database connection issue',
        details: error.message,
      });
    }
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
};

// GET: Get a product by googleId and productName
export const getProductByName = async (req, res) => {
  try {
    const { googleId, productName } = req.params;

    console.log('Received request to get product for googleId:', googleId, 'and productName:', productName);
    console.log('Request headers:', req.headers);

    if (!googleId || !productName) {
      console.log('Google ID or Product Name is missing from route');
      return res.status(400).json({ error: 'Google ID and Product Name are required in the route' });
    }

    const trimmedGoogleId = googleId.trim();
    const trimmedProductName = productName.trim();
    console.log('Trimmed googleId:', trimmedGoogleId, 'Trimmed productName:', trimmedProductName);

    if (!DealerModel || !ProductModel) {
      console.log('Initializing models...');
      await initializeModels();
    }

    console.log('Checking if dealer exists with googleId:', trimmedGoogleId);
    const dealer = await DealerModel.findOne({
      googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') }
    }).lean();
    console.log('Dealer query result:', dealer);

    if (!dealer) {
      console.log('Dealer not found for googleId:', trimmedGoogleId);
      return res.status(404).json({ error: 'Dealer not found in UserDetails database' });
    }

    console.log('Querying product with googleId:', trimmedGoogleId, 'and productName:', trimmedProductName);
    const product = await ProductModel.findOne({
      googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') },
      name: { $regex: new RegExp(`^${trimmedProductName}$`, 'i') }
    }).lean();
    console.log('Product query result:', product);

    if (!product) {
      console.log('Product not found for googleId:', trimmedGoogleId, 'and productName:', trimmedProductName);
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Sending product response:', product);
    res.status(200).json(product);
  } catch (error) {
    console.error('❌ Error fetching product:', error.message);
    if (error.name === 'MongooseError' || error.name === 'MongoNetworkError') {
      return res.status(503).json({
        error: 'Database connection issue',
        details: error.message,
      });
    }
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
    try {
      const { googleId, productName } = req.params;
      const updateData = req.body;
  
      console.log('Received request to update product for googleId:', googleId, 'and productName:', productName);
      console.log('Request headers:', req.headers);
      console.log('Update data:', updateData);
  
      if (!googleId || !productName) {
        console.log('Google ID or Product Name is missing from route');
        return res.status(400).json({ error: 'Google ID and Product Name are required in the route' });
      }
  
      if (!updateData || Object.keys(updateData).length === 0) {
        console.log('No update data provided');
        return res.status(400).json({ error: 'Update data is required' });
      }
  
      const trimmedGoogleId = googleId.trim();
      const trimmedProductName = productName.trim();
      console.log('Trimmed googleId:', trimmedGoogleId, 'Trimmed productName:', trimmedProductName);
  
      if (!DealerModel || !ProductModel) {
        console.log('Initializing models...');
        await initializeModels();
      }
  
      console.log('Checking if dealer exists with googleId:', trimmedGoogleId);
      const dealer = await DealerModel.findOne({
        googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') }
      }).lean();
      console.log('Dealer query result:', dealer);
  
      if (!dealer) {
        console.log('Dealer not found for googleId:', trimmedGoogleId);
        return res.status(404).json({ error: 'Dealer not found in UserDetails database' });
      }
  
      console.log('Updating product with googleId:', trimmedGoogleId, 'and productName:', trimmedProductName);
      const updatedProduct = await ProductModel.findOneAndUpdate(
        {
          googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') },
          name: { $regex: new RegExp(`^${trimmedProductName}$`, 'i') } // Case-insensitive match
        },
        { $set: updateData },
        { new: true, runValidators: true, lean: true }
      );
      console.log('Update query result:', updatedProduct);
  
      if (!updatedProduct) {
        console.log('Product not found for googleId:', trimmedGoogleId, 'and productName:', trimmedProductName);
        return res.status(404).json({ error: 'Product not found' });
      }
  
      console.log('Sending updated product response:', updatedProduct);
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('❌ Error updating product:', error.message);
      if (error.name === 'MongooseError' || error.name === 'MongoNetworkError') {
        return res.status(503).json({
          error: 'Database connection issue',
          details: error.message,
        });
      }
      res.status(500).json({
        error: 'Internal server error',
        details: error.message,
      });
    }
  };
// DELETE: Delete a product by googleId and productName
export const deleteProduct = async (req, res) => {
  try {
    const { googleId, productName } = req.params;

    console.log('Received request to delete product for googleId:', googleId, 'and productName:', productName);
    console.log('Request headers:', req.headers);

    if (!googleId || !productName) {
      console.log('Google ID or Product Name is missing from route');
      return res.status(400).json({ error: 'Google ID and Product Name are required in the route' });
    }

    const trimmedGoogleId = googleId.trim();
    const trimmedProductName = productName.trim();
    console.log('Trimmed googleId:', trimmedGoogleId, 'Trimmed productName:', trimmedProductName);

    if (!DealerModel || !ProductModel) {
      console.log('Initializing models...');
      await initializeModels();
    }

    console.log('Checking if dealer exists with googleId:', trimmedGoogleId);
    const dealer = await DealerModel.findOne({
      googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') }
    }).lean();
    console.log('Dealer query result:', dealer);

    if (!dealer) {
      console.log('Dealer not found for googleId:', trimmedGoogleId);
      return res.status(404).json({ error: 'Dealer not found in UserDetails database' });
    }

    console.log('Deleting product with googleId:', trimmedGoogleId, 'and productName:', trimmedProductName);
    const deletedProduct = await ProductModel.findOneAndDelete({
      googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') },
      name: trimmedProductName
    });
    console.log('Delete query result:', deletedProduct);

    if (!deletedProduct) {
      console.log('Product not found for googleId:', trimmedGoogleId, 'and productName:', trimmedProductName);
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Product deleted successfully');
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting product:', error.message);
    if (error.name === 'MongooseError' || error.name === 'MongoNetworkError') {
      return res.status(503).json({
        error: 'Database connection issue',
        details: error.message,
      });
    }
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
};
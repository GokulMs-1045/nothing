import Dealer from '../../models/Dealer/dealerStore.model.js';
import { UserDetails } from '../../config/db.js';

let DealerModel;

const initializeModels = async () => {
  try {
    const userDetailsConn = await UserDetails;
    console.log('UserDetails connection readyState:', userDetailsConn.readyState);
    DealerModel = Dealer(userDetailsConn);
    console.log('DealerModel initialized:', !!DealerModel);
  } catch (error) {
    console.error('Error initializing models:', error.message);
    throw error;
  }
};
export const getDealerByGoogleId = async (req, res) => {
  try {
    const { googleId } = req.params;

    console.log('Received request for googleId:', googleId);
    console.log('Request headers:', req.headers);

    if (!googleId) {
      console.log('Google ID is missing');
      return res.status(400).json({ error: 'Google ID is required' });
    }

    const trimmedGoogleId = googleId.trim();
    console.log('Trimmed googleId:', trimmedGoogleId);

    if (!DealerModel) {
      console.log('Initializing models...');
      await initializeModels();
    }

    console.log('Querying DealerModel with googleId:', trimmedGoogleId);
    const dealer = await DealerModel.findOne({
      googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') }
    }).lean();
    console.log('Dealer query result:', dealer);

    if (!dealer) {
      console.log('Dealer not found for googleId:', trimmedGoogleId);
      return res.status(404).json({ error: 'Dealer not found' });
    }

    console.log('Sending dealer response:', dealer);
    res.status(200).json(dealer);
  } catch (error) {
    console.error('❌ Error fetching dealer:', error.message);
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

export const updateDealerByGoogleId = async (req, res) => {
  try {
    const { googleId } = req.params;
    const updateData = req.body;

    console.log('Received update request for googleId:', googleId);
    console.log('Request headers:', req.headers);
    console.log('Update data:', updateData);

    if (!googleId) {
      console.log('Google ID is missing');
      return res.status(400).json({ error: 'Google ID is required' });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      console.log('No update data provided');
      return res.status(400).json({ error: 'Update data is required' });
    }

    const trimmedGoogleId = googleId.trim();
    console.log('Trimmed googleId:', trimmedGoogleId);

    if (!DealerModel) {
      console.log('Initializing models...');
      await initializeModels();
    }

    console.log('Updating DealerModel with googleId:', trimmedGoogleId);
    const updatedDealer = await DealerModel.findOneAndUpdate(
      { googleId: { $regex: new RegExp(`^${trimmedGoogleId}$`, 'i') } },
      { $set: updateData },
      { new: true, runValidators: true, lean: true } // Return the updated document
    );
    console.log('Update query result:', updatedDealer);
    console.log('Raw update executed on collection:', DealerModel.collection.collectionName);

    if (!updatedDealer) {
      console.log('Dealer not found for update with googleId:', trimmedGoogleId);
      return res.status(404).json({ error: 'Dealer not found' });
    }

    console.log('Sending updated dealer response:', updatedDealer);
    res.status(200).json(updatedDealer);
  } catch (error) {
    console.error('❌ Error updating dealer:', error.message);
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
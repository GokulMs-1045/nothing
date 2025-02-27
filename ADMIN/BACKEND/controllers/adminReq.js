require('../models/adminReq.mode');

const adminReq1 = async (req, res) => {
    try {
        const req = await User.findById(req.params.id);
        if (!req) return res.status(404).send('User not found');
        res.json(req);
    }catch (err){
        res.status(500).send('Server error');
    }
};

const adminReq2 = async (req, res) => {
    try {
        const req = await User.findById(req.params.id);
        if (!req) return res.status(404).send('User not found');
        res.json(req);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

module.exports = {adminReq1,adminReq2};
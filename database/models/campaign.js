var mongoose = require('mongoose');
const CampaignSchema = new mongoose.Schema({
    campName: String,
    status: String,
    });

const CampaignModle = mongoose.model('Campaign',CampaignSchema);
module.exports = CampaignModle;
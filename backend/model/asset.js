import mongoose from "mongoose";
const { Schema } = mongoose;

const assetSchema = new mongoose.Schema({
    s1: {
        type: String,
    },
    s2: {
        type: String,
    },
    s3: {
        type: String,
    },
    s4: {
        type: String,
    },
    s5: {
        type: String,
    },
    s6: {
        type: String,
    },
    s7: {
        type: String,
    },
    s8: {
        type: String,
    },

},{timestamps: true}); 


assetSchema.pre('save', function(next) {
    const currentDate = new Date();
    const istDate = new Date(currentDate.getTime() + (5.5 * 60 * 60 * 1000));
    this.createdAt = istDate;
    this.updatedAt = istDate;
    next();
});

assetSchema.pre('update', function(next) {
    const currentDate = new Date();
    const istDate = new Date(currentDate.getTime() + (5.5 * 60 * 60 * 1000));
    this.update({}, { $set: { updatedAt: istDate } });
    next();
});

export default mongoose.model('asset', assetSchema);

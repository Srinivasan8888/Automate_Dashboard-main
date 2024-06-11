import asset from "../model/asset.js";

export const createAsset = async (req, res) => {
    const {
        s1, s2, s3, s4, s5, s6, s7, s8
    } = req.query;

    const saveAsset = new asset({
        s1: String(s1),
        s2: String(s2),
        s3: String(s3),
        s4: String(s4),
        s5: String(s5),
        s6: String(s6),
        s7: String(s7),
        s8: String(s8),
    });

    try {
        const savedAsset = await saveAsset.save();
        res.status(200).json(savedAsset);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const jsonAsset = async(req, res) => {
    try {
    const allData = await asset.find().limit(40).sort({ _id: -1 });
    res.json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
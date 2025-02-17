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

export const jsonAsset = async (req, res) => {
    try {
        const allData = await asset.find().limit(40).sort({ _id: -1 });
        res.json(allData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const reportdata = async (req, res) => {
    const { sensorid } = req.query;

    try {

        const assetDocumentArray = await asset.find({}, { _id: 0, [sensorid]: 1, updatedAt: 1 });
        res.json(assetDocumentArray);
    } catch (error) {
        console.error("Error:", error);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
    }
};

export const chartjsondata = async (req, res) => {
    const { sensor, limits } = req.query;
    
    try {   
        const limit = parseInt(limits, 10) || 0;
        const assetDocumentArray = await asset.find({}, { _id: 0, [sensor]: 1, updatedAt: 1 }).limit(limit);
        res.json(assetDocumentArray);
    } catch (error) {
        console.error("Error:", error);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
    }
};


export const chartjsondate = async (req, res) => {
    const { sensor, date1, date2 } = req.query;
  
    try {
      const startDate = new Date(date1);
      const endDate = new Date(date2);
  
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
      console.log("Sensor:", sensor);
  
      const query = {
        $and: [
          { createdAt: { $gte: startDate } },
          { createdAt: { $lte: endDate } },
        ],
      };
  
      console.log("Query:", query);
  
      const assetDocumentArray = await asset.find(query, { _id: 0, [sensor]: 1, createdAt: 1 });
  
      console.log("Result:", assetDocumentArray);
  
      res.json(assetDocumentArray);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  };
  
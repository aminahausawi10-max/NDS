const cloudinary = require('cloudinary').v2;
const { verifyToken } = require('./middleware');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { fileData, fileName } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'No file data provided' });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileData, {
      folder: 'nds_documents',
      public_id: fileName ? fileName.split('.')[0] + '_' + Date.now() : 'doc_' + Date.now(),
      resource_type: 'auto'
    });

    return res.status(200).json({
      message: 'File uploaded successfully',
      url: uploadResult.secure_url
    });

  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return res.status(500).json({ error: 'Upload failed: ' + err.message });
  }
};

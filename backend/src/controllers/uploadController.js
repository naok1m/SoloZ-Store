export const uploadProductImageController = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File is required' })
  }

  const baseUrl = `${req.protocol}://${req.get('host')}`
  const imageUrl = `${baseUrl}/uploads/${req.file.filename}`

  return res.status(201).json({ imageUrl })
}

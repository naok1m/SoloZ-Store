import fs from 'fs'
import path from 'path'
import multer from 'multer'

const uploadsDir = path.resolve(process.cwd(), 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase()
    const safeExt = ext || '.jpg'
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`)
  },
})

const allowedMime = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif'])

export const uploadProductImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!allowedMime.has(file.mimetype)) {
      const error = new Error('Invalid file type. Use PNG, JPG, WEBP or GIF.')
      error.status = 400
      cb(error)
      return
    }
    cb(null, true)
  },
})

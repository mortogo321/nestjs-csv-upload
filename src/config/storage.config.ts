import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = './uploads';

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }

    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return `${Date.now()}${extname(file.originalname)}`;
}

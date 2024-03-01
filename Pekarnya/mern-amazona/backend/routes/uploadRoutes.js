import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
import fs from 'fs'
import streamifier from 'streamifier';
import { isAdmin, isAuth,isActivated } from '../utils.js';

const upload = multer();

const uploadRouter = express.Router();


uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  isActivated,
  upload.single('file'),
  async (req, res) => {
    cloudinary.config({
      cloud_name: 'dk7ozvcsa',
      api_key: '392837477435225',
      api_secret: 'cRQVNnivff-MaOjWUzQ67kh5uFo',
    });
    
  
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({folder:"fooo"},(error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.files.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.send(result);
  }
);
export default uploadRouter;

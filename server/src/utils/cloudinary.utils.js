import { cloudinary } from '../config/index.js';

const uploadImage = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(buffer);
  });
};

const deleteImage = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );
  });
};

const uploadMultipleImages = async (files, folder) => {
  if (!files?.length) {
    return [];
  }

  const uploadedImages = [];

  try {
    for (const file of files) {
      const image = await uploadImage(file.buffer, folder);

      uploadedImages.push(image);
    }

    return uploadedImages;
  } catch (error) {
    await deleteMultipleImages(uploadedImages);

    throw error;
  }
};

const deleteMultipleImages = async (images) => {
  if (!images?.length) {
    return;
  }

  for (const image of images) {
    try {
      await deleteImage(image.publicId);
    } catch (error) {
      console.error(
        `Failed to delete Cloudinary image: ${image.publicId}`,
        error
      );
    }
  }
};

export { uploadImage, uploadMultipleImages, deleteImage, deleteMultipleImages };

import fs from 'node:fs/promises'

const removeFS = async (image) => {
  const path = `./public/images/${image}`;

  try {
    await fs.unlink(path);
  } catch (error) {
    console.log(path)
  }
};

const removeBulkFS = async (images) => {
  await images.forEach(image => removeFS(image));
}

export const imageService = {
  removeFS,
  removeBulkFS
};

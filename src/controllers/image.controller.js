import { ApiError } from '../exceptions/api.error.js';
import { heroService } from '../services/hero.service.js';
import fs from 'node:fs/promises'

const get = async (req, res) => {
  const { filename } = req.params;

  res.sendFile(`/public/images/${filename}`, {'root': '.'});
};

const create = async (req, res) => {
  const { filename } = req.file;
  const { id } = req.params;

  if (!filename || !id) {
    throw ApiError.BadRequest();
  }

  try {
    await heroService.addImage(filename, id);
    res.send({
      status: 'success',
      body: filename,
    });
  } catch (error) {
    throw ApiError.NotFound();
  }
}

const remove = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  if (!image || !id) {
    throw ApiError.BadRequest();
  }

  const path = `./public/images/${image}`;

  try {
    await fs.unlink(path);
    await heroService.removeImage(image, id)

    res.send([1])
  } catch (error) {
    throw ApiError.BadRequest();
  }
};

export const imageController = {
  get,
  create,
  remove
};

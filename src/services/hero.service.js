import { Sequelize } from 'sequelize';
import { Hero } from '../models/hero.model.js';

export const normalizeHero = ({
  id,
  nickname,
  real_name,
  origin_description,
  superpowers,
  catch_phrase,
  images
}) => {
  return {
    id,
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images
  };
};

const getAll = async () => {
  return Hero.findAll({
    order: [
      ['createdAt', 'ASC'],
  ]
  });
};

const getOne = async id => {
  return Hero.findOne({ where: { id } });
};

const getByNickName = async nickname => {
  return Hero.findOne({ where: { nickname } });
};

const create = async heroInfo => {
  return Hero.create(heroInfo);
};

const remove = async id => {
  return Hero.destroy({
    where: {
      id,
    },
  });
};

const update = async (updatedInfo, id) => {
  return Hero.update(updatedInfo, {
    where: {
      id,
    },
  });
};

const addImage = async (path, id) => {
  return Hero.update(
    { images: Sequelize.fn('array_append', Sequelize.col('images'), path) },
    {
      where: {
        id,
      },
    },
  );
};

const removeImage = async (path, id) => {
  return Hero.update(
    { images: Sequelize.fn('array_remove', Sequelize.col('images'), path) },
    {
      where: {
        id,
      },
    },
  );
};

export const heroService = {
  getAll,
  getOne,
  getByNickName,
  create,
  remove,
  update,
  normalizeHero,
  addImage,
  removeImage,
};

import { DataTypes } from 'sequelize';
import { client } from '../utils/db.js';

export const Hero = client.define('hero', {
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  real_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  origin_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  superpowers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  catch_phrase: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  }
});

import { ApiError } from '../exceptions/api.error.js';
import { heroService } from '../services/hero.service.js';
import { imageService } from '../services/image.service.js';

const getAll = async (req, res) => {
  const heroes = await heroService.getAll();
  const normalizedHeroes = heroes.map(heroService.normalizeHero);

  res.send(normalizedHeroes);
};

const getOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw ApiError.BadRequest();
  }

  const hero = await heroService.getOne(id);

  if (!hero) {
    throw ApiError.NotFound();
  }

  const normalizedHero = heroService.normalizeHero(hero);

  res.send(normalizedHero);
};

const create = async (req, res) => {
  const newHeroInfo = {
    nickname: req.body.nickname,
    real_name: req.body.real_name,
    origin_description: req.body.origin_description,
    superpowers: req.body.superpowers,
    catch_phrase: req.body.catch_phrase,
  };

  if (Object.values(newHeroInfo).some(info => !info)) {
    throw ApiError.BadRequest(
      'Each hero must have: nickname, real_name, origin_description, superpowers, catch_phrase',
    );
  }

  const existingHero = await heroService.getByNickName(newHeroInfo.nickname);

  if (existingHero) {
    throw ApiError.BadRequest('Hero must have unique nickname!');
  }

  const newHero = await heroService.create(newHeroInfo);
  const normalizedHero = heroService.normalizeHero(newHero);

  res.send(normalizedHero);
};

const remove = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw ApiError.BadRequest();
  }

  const hero = await heroService.getOne(id);

  if (!hero) {
    throw ApiError.NotFound();
  }

  await imageService.removeBulkFS(hero.images);

  const wasDeleted = await heroService.remove(id);

  if (!wasDeleted) {
    throw ApiError.NotFound();
  }

  res.send([1]);
};

const replace = async (req, res) => {
  const id = req.params.id;

  const newHeroInfo = {
    nickname: req.body.nickname,
    real_name: req.body.real_name,
    origin_description: req.body.origin_description,
    superpowers: req.body.superpowers,
    catch_phrase: req.body.catch_phrase,
  };

  if (!id || Object.values(newHeroInfo).some(info => !info)) {
    throw ApiError.BadRequest('Replacing hero requires full information');
  }

  const updatedHero = await heroService.update(newHeroInfo, id);

  if (!updatedHero) {
    throw ApiError.NotFound();
  }

  res.send(updatedHero);
};

const update = async (req, res) => {
  const id = req.params.id;

  const newHeroInfo = {
    nickname: req.body.nickname || null,
    real_name: req.body.real_name || null,
    origin_description: req.body.origin_description || null,
    superpowers: req.body.superpowers || null,
    catch_phrase: req.body.catch_phrase || null,
  };

  for (const info in newHeroInfo) {
    if (newHeroInfo[info] === null) {
      delete newHeroInfo[info];
    }
  }

  if (!id || Object.keys(newHeroInfo).length === 0) {
    throw ApiError.BadRequest();
  }

  const existingHero = await heroService.getByNickName(newHeroInfo.nickname);

  if (existingHero) {
    throw ApiError.BadRequest('Hero must have unique nickname!');
  }

  const updatedHero = await heroService.update(newHeroInfo, id);

  if (!updatedHero) {
    throw ApiError.NotFound();
  }

  res.send(updatedHero);
};

export const heroController = {
  getAll,
  getOne,
  create,
  remove,
  replace,
  update,
};

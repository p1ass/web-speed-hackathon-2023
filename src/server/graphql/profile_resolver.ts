import DataLoader from 'dataloader';
import { In } from 'typeorm';

import { MediaFile } from '../../model/media_file';
import type { Profile } from '../../model/profile';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const profileResolver: GraphQLModelResolver<Profile> = {
  avatar: async (parent) => {
    return avatarResolver.load(parent.avatar.id);
  },
};

const avatarResolver = new DataLoader(async (keys): Promise<MediaFile[]> => {
  const mediaFileRepository = dataSource.getRepository(MediaFile);
  const avatars = await mediaFileRepository.find({
    where: {
      id: In(keys),
    },
  });
  return keys.map((avatarId) => avatars.filter((avatar) => avatar.id === avatarId)[0]);
});

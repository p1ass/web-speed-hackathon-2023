import DataLoader from 'dataloader';
import { In } from 'typeorm';

import { MediaFile } from '../../model/media_file';
import { Profile } from '../../model/profile';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const profileResolver: GraphQLModelResolver<Profile> = {
  avatar: async (parent) => {
    const profile = await dataSource.manager.findOneOrFail(Profile, {
      relations: {
        avatar: true,
      },
      where: { id: parent.id },
    });

    return profile.avatar;
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

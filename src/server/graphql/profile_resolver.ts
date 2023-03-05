import DataLoader from 'dataloader';
import { In } from 'typeorm';

import { Profile } from '../../model/profile';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const profileResolver: GraphQLModelResolver<Profile> = {
  avatar: async (parent) => {
    return (await profileDataLoaderResolver.load(parent.id)).avatar;
  },
};

const profileDataLoaderResolver = new DataLoader(async (keys): Promise<Profile[]> => {
  const profileRepository = dataSource.getRepository(Profile);
  const profiles = await profileRepository.find({
    relations: {
      avatar: true,
      user: true,
    },
    where: {
      id: In(keys),
    },
  });
  return keys.map((profileId) => profiles.filter((profile) => profile.id === profileId)[0]);
});

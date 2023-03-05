import DataLoader from 'dataloader';
import { In } from 'typeorm';

import { Review } from '../../model/review';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const reviewResolver: GraphQLModelResolver<Review> = {
  product: async (parent) => {
    return (await reviewsLoader.load(parent.id)).product;
  },
  user: async (parent) => {
    return (await reviewsLoader.load(parent.id)).user;
  },
};

const reviewsLoader = new DataLoader(async (keys): Promise<Review[]> => {
  const reviewRepository = dataSource.getRepository(Review);
  const reviews = await reviewRepository.find({
    relations: {
      product: true,
      user: true,
    },
    where: {
      id: In(keys),
    },
  });
  return keys.map((reviewId) => reviews.filter((review) => review.id === reviewId)[0]);
});

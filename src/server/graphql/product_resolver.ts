import DataLoader from 'dataloader';
import { In } from 'typeorm';

import { LimitedTimeOffer } from '../../model/limited_time_offer';
import type { Product } from '../../model/product';
import { ProductMedia } from '../../model/product_media';
import { Review } from '../../model/review';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const productResolver: GraphQLModelResolver<Product> = {
  media: (parent) => {
    return productMediasLoader.load(parent.id);
  },
  offers: (parent) => {
    return limitedTimeOffersLoader.load(parent.id);
  },
  reviews: (parent) => {
    return reviewsLoader.load(parent.id);
  },
};

const productMediasLoader = new DataLoader(async (keys): Promise<ProductMedia[][]> => {
  const productMediaRepository = dataSource.getRepository(ProductMedia);
  const productMedias = await productMediaRepository.find({
    relations: {
      file: true,
      product: true,
    },
    where: {
      product: In(keys),
    },
  });
  return keys.map((productId) => productMedias.filter((productMedia) => productMedia.product.id === productId));
});

const limitedTimeOffersLoader = new DataLoader(async (keys): Promise<LimitedTimeOffer[][]> => {
  const limitedTimeOfferRepository = dataSource.getRepository(LimitedTimeOffer);
  const limitedTimeOffers = await limitedTimeOfferRepository.find({
    relations: {
      product: true,
    },
    where: {
      product: In(keys),
    },
  });
  return keys.map((productId) =>
    limitedTimeOffers.filter((limitedTimeOffer) => limitedTimeOffer.product.id === productId),
  );
});

const reviewsLoader = new DataLoader(async (keys): Promise<Review[][]> => {
  const reviewRepository = dataSource.getRepository(Review);
  const reviews = await reviewRepository.find({
    relations: {
      product: true,
      // user: true,
    },
    where: {
      product: In(keys),
    },
  });
  return keys.map((productId) => reviews.filter((review) => review.product.id === productId));
});

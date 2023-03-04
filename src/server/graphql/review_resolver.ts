import type { Review } from '../../model/review';

import type { GraphQLModelResolver } from './model_resolver';

export const reviewResolver: GraphQLModelResolver<Review> = {
  product: async (parent) => {
    return parent.product;
  },
  user: async (parent) => {
    return parent.user;
  },
};

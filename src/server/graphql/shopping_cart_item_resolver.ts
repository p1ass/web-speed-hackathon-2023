import DataLoader from 'dataloader';
import { In } from 'typeorm';

import { ShoppingCartItem } from '../../model/shopping_cart_item';
import { dataSource } from '../data_source';

import type { GraphQLModelResolver } from './model_resolver';

export const shoppingCartItemResolver: GraphQLModelResolver<ShoppingCartItem> = {
  product: async (parent) => {
    return (await shoppingCartItemsResolver.load(parent.id)).product;
  },
};

export const shoppingCartItemsResolver = new DataLoader(async (keys): Promise<ShoppingCartItem[]> => {
  const shoppingCardItemRepository = dataSource.getRepository(ShoppingCartItem);
  const shoppingCartItems = await shoppingCardItemRepository.find({
    relations: {
      product: true,
    },
    where: {
      id: In(keys),
    },
  });
  return keys.map(
    (shoppingCartItemId) =>
      shoppingCartItems.filter((shoppingCartItem) => shoppingCartItem.id === shoppingCartItemId)[0],
  );
});

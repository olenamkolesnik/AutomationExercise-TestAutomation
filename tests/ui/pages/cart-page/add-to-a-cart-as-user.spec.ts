import { test } from '../../../../src/common/fixtures/index';
import { assertCartItem } from '../../../../src/ui/assertions/assert-cart-item';

test.describe('Products Page - add to a cart as user', () => {

  test('should add a product to the cart', async ({addToCartFlow, product, cartPage}) => {
    await addToCartFlow.addProduct(product.name);

    const cartItem = await cartPage.getCartItemByName(product.name);
    const cartItemData = await cartItem.getData();
    assertCartItem(cartItemData, product, 1);
  });
});

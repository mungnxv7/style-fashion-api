export function generateCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const timeStamp = Date.now().toString(36);
  result += timeStamp;
  for (let i = 0; i < length - timeStamp.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const create = async (req, res) => {
  try {
    const { user, productsOrder, voucher } = req.body;
    const userData = await userService.getUserById(user);
    if (!userData) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const carts = await cartService.getCartsByIdUser(user);
    if (!carts || carts.products_cart.length === 0) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "There are no products in your cart"
      );
    }
    const cartMap = new Map();
    carts.products_cart.forEach((itemCart) => {
      if (!itemCart.attribute) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "There an atrribute that are not in product"
        );
      }
      const key = `${itemCart.product._id.toString()}_${itemCart.attribute._id.toString()}`;
      cartMap.set(key, itemCart._id);
    });
    const productCartIds = productsOrder.map((itemOrder) => {
      const key = `${itemOrder.productId}_${itemOrder.attributeId}`;
      const getProductCartId = cartMap.get(key);
      if (!getProductCartId) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "There are products that are not in your cart."
        );
      }
      return getProductCartId;
    });
    const isProductOrderInProdcutsColection = productsOrder.map(
      async (itemOrder) => {
        const product = await productService.getProductByID(
          itemOrder.productId
        );
        if (!product) {
          throw new ApiError(
            httpStatus.NOT_FOUND,
            "There an atrribute that are not in product"
          );
        }
      }
    );
    await Promise.all(isProductOrderInProdcutsColection);
    const order = await orderService.createOrder(req.body);
    const documentAttribute = await Promise.all(
      order.productsOrder.map(async (orderItem) => {
        const attribute = await attributeService.getAttributeByID(
          orderItem.attributeId
        ); // Tìm kiếm attribute
        return {
          updateOne: {
            filter: { _id: attribute._id }, // Điều kiện lọc dựa trên _id
            update: { $set: { stock: attribute.stock - orderItem.quantity } }, // Cập nhật quantity
          },
        };
      })
    );
    await cartService.removeCartItemsByIds(user, productCartIds);
    await attributeService.updateAttributeMany(documentAttribute);
    res.status(httpStatus.CREATED).json(order);
  } catch (error) {
    errorMessage(res, error);
  }
};

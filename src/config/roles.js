const allRoles = {
  admin: [
    "manageUsers",
    "manageProducts",
    "manageCategories",
    "manageOrders",
    "manageProfile",
    "manageAddress",
    "manageCarts",
    "manageReviews",
    "manageVoucher",
  ],
  manager: [
    "manageUsers",
    "manageProducts",
    "manageCategories",
    "manageOrders",
    "manageAddress",
    "manageCarts",
    "manageProfile",
    "manageReviews",
    "manageVoucher",
  ],
  staff: [
    "manageProducts",
    "manageCategories",
    "manageOrders",
    "manageAddress",
    "manageCarts",
    "manageProfile",
    "manageReviews",
    "manageVoucher",
  ],
  customer: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };

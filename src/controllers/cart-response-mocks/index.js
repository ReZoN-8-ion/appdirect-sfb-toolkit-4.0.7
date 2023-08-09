const mockCart = require("./models")

module.exports = storage => ({
  additions: () =>
    mockCart(storage, { WITH_CHILD_ITEMS: true, WITH_CONTENT_WRAPPER: true }),
  preview: () =>
    mockCart(storage, {
      WITH_CHILD_ITEMS: true,
      WITH_CONTENT_WRAPPER: false,
      WITH_ITEM_DETAILS: true
    })
})

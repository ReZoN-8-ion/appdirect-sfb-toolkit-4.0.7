const MStorage = require("./cart-storage")
const CartResponse = require("./cart-response-mocks")

const isObject = suspect =>
  typeof suspect === "object" && suspect.constructor === Object
class Cart {
  constructor({
    req = {
      params: {},
      cookies: {}
    },
    res = {}
  }) {
    this.res = res
    this.req = req
    const context = `${req.config.marketplacePath}:${req.config.theme}`
    this.storage = MStorage(context)
  }

  isPayloadValid() {
    const payload = this.req.body
    if (!isObject(payload)) return false
    if (payload.items && !Array.isArray(payload.items)) return false
    for (let i = 0; i < payload.items.length; i += 1) {
      if (!payload.items[i].pricingPlanId) return false
      if (
        payload.items[i].associations &&
        !Array.isArray(payload.items[i].associations)
      )
        return false
    }
    return true
  }

  handleAdditions() {
    if (!this.isPayloadValid()) {
      return this.res
        .status(400)
        .send("Bad Request: Incorrectly formed payload")
    }
    const currentItems = this.storage.read("items") || []
    if (this.req.body.items.length) {
      const updatedItems = [...currentItems, ...this.req.body.items]
      const result = this.storage.save("items", updatedItems)
      const mockedResponseNew = CartResponse(result.data.items).additions()
      return this.res.send(mockedResponseNew)
    }
    const mockedResponseCurrent = CartResponse(currentItems).additions()
    return this.res.send(mockedResponseCurrent)
  }

  handlePreview() {
    const items = this.storage.read("items")
    const mockedResponse = CartResponse(items).preview()
    this.res.send(mockedResponse)
  }

  handleClear() {
    const result = this.storage.clear()
    this.res.send(result)
  }
}

module.exports = Cart

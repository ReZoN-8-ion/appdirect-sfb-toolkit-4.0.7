const corsPipe = require("../api/cors")
const userBootstrapContext = require("./mockRoutes/user/bootstrapContext")
const userAssignments = require("./mockRoutes/user/assignments")
const userMemberships = require("./mockRoutes/user/memberships")
const marketplaceManagerMemberships = require("./mockRoutes/marketplaceManager/memberships");
const marketplaceManagerAssignmetns = require("./mockRoutes/marketplaceManager/assignments");
const marketplaceManagerBootstrapContext = require("./mockRoutes/marketplaceManager/bootstrapContext");

module.exports = routes => {
  // because of CORS we have to pipe calls
  routes.get("/api/session/v1/bootstrap-context", (req, res) => {
    switch(req.cookies.mockRole) {
      case 'USER':
        res.send(userBootstrapContext);
        break;
      case 'MARKETPLACE_MANAGER':
        res.send(marketplaceManagerBootstrapContext);
        break;
      default:
        corsPipe.callApi(req, res, "get");
    }
  })
  routes.get(
    "/api/channel/v1/styles/:marketplaceName/theme/:status",
    (req, res) => corsPipe.callApi(req, res)
  )
  routes.get("/api/v3/universal-nav/assignments/:companyId/:userId",
    (req, res) => {
      switch(req.cookies.mockRole) {
        case 'USER':
          res.send(userAssignments);
          break;
        case 'MARKETPLACE_MANAGER':
          res.send(marketplaceManagerAssignmetns);
          break;
        default:
          corsPipe.callApi(req, res);
      }
  })
  routes.get("/api/account/v2/users/:userId/memberships", (req, res) => {
    switch(req.cookies.mockRole) {
      case 'USER':
        res.send(userMemberships)
        break;
      case 'MARKETPLACE_MANAGER':
        res.send(marketplaceManagerMemberships);
        break;
      default:
        corsPipe.callApi(req, res);
    }
  })
  routes.get("/api/channel/v1/styles/:partner/templates*", (req, res) =>
    corsPipe.callApi(req, res)
  )
  routes.get("/api/marketplace/v1/listing*", (req, res) =>
    corsPipe.callApi(req, res)
  )
  routes.get("/api/internal/storefront/v1/listingPage*", (req, res) =>
    corsPipe.callApi(req, res)
  )
  routes.get("/api/marketplace/v1/navigator*", (req, res) =>
    corsPipe.callApi(req, res)
  )
  routes.get("/api/v3/universal-nav/configuration*", (req, res) =>
    corsPipe.callApi(req, res)
  )
  routes.get(
    "/api/domains/reseller/v1/edition/:edition/suggestions*",
    (req, res) => corsPipe.callApi(req, res)
  )
  routes.get("/api/marketplace/v1/productlines*", (req, res) =>
    corsPipe.callApi(req, res)
  )
  routes.post("/api/reviews/graphql*", (req, res) =>
    corsPipe.callApi(req, res, "post")
  )
}

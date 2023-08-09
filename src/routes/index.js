const routes = require("express").Router()
const corsRoutes = require("./cors")
const PageCtrl = require("../controllers")
const CartCtrl = require("../controllers/cart")

corsRoutes(routes)
routes.get("/", (req, res) =>
  new PageCtrl({ req, res, page: "home" }).redirectToLocalePage()
)
routes.post("/api/checkout/v1/shoppingCarts/storefront/additions", (req, res) =>
  new CartCtrl({ req, res }).handleAdditions()
)
routes.get("/api/checkout/v1/shoppingCarts/storefront/clear", (req, res) =>
  new CartCtrl({ req, res }).handleClear()
)
routes.get("/api/checkout/v1/cart/preview", (req, res) =>
  new CartCtrl({ req, res }).handlePreview()
)
routes.get("/api/v1/translation/*", (req, res) =>
  new PageCtrl({ req, res }).redirectToMarketplacePage()
)
routes.get("/api/marketplace/v1/*", (req, res) =>
  new PageCtrl({ req, res }).redirectToMarketplacePage()
)
routes.get("/api/theme/v1/*", (req, res) =>
  new PageCtrl({ req, res }).redirectToMarketplacePage()
)
routes.get("/home", (req, res) =>
  new PageCtrl({ req, res, page: "home" }).redirectToLocalePage()
)
routes.get("/listing*?", (req, res) =>
  new PageCtrl({ req, res, page: "listing" }).redirectToLocalePage()
)
routes.get("/browse/:type/:name/:id", (req, res) =>
  new PageCtrl({ req, res, page: "browse" }).redirectToLocalePage()
)
routes.get("/browse/:type/:typeSection/:name/:id", (req, res) =>
  new PageCtrl({ req, res, page: "browse" }).redirectToLocalePage()
)
routes.get("/browse/:type/:name/:id/:subName/:subId", (req, res) =>
  new PageCtrl({ req, res, page: "browse" }).redirectToLocalePage()
)
routes.get("/apps", (req, res) =>
  new PageCtrl({ req, res, page: "profile" }).redirectToLocalePage()
)

routes.get("/compare", (req, res) =>
  new PageCtrl({ req, res, page: "compare" }).redirectToLocalePage()
)
routes.get("/help", (req, res) =>
  new PageCtrl({ req, res, page: "help" }).redirectToLocalePage()
)

routes.get("/:locale/home", (req, res) =>
  new PageCtrl({ req, res, page: "home" }).render()
)

routes.get("/:locale/listing/:section*?", (req, res) =>
  new PageCtrl({ req, res, page: "listing" }).render()
)

routes.get("/:locale/browse/:type/:name/:id", (req, res) =>
  new PageCtrl({ req, res, page: "browse" }).render()
)

routes.get("/:locale/browse/:type/:typeSection/:name/:id", (req, res) =>
  new PageCtrl({ req, res, page: "browse" }).render()
)

routes.get("/:locale/browse/:type/:name/:id/:subName/:subId", (req, res) =>
  new PageCtrl({ req, res, page: "browse" }).render()
)

routes.get("/:locale/listing*?", (req, res) =>
  new PageCtrl({ req, res, page: "listing" }).render()
)
routes.get("/:locale/apps/:id", (req, res) =>
  new PageCtrl({ req, res, page: "profile" }).render()
)
routes.get("/:locale/apps/:id/:appname", (req, res) =>
  new PageCtrl({ req, res, page: "profile" }).render()
)
routes.get("/:locale/apps/:id/:appname/overview", (req, res) =>
  new PageCtrl({ req, res, page: "profile" }).render()
)
routes.get("/:locale/apps/:id/:appname/:section", (req, res) =>
  new PageCtrl({ req, res, page: "profile" }).render()
)
routes.get("/:locale/bundles/:id", (req, res) =>
  new PageCtrl({ req, res, page: "bundle" }).render()
)
routes.get("/:locale/bundles/:id/:bundlename", (req, res) =>
  new PageCtrl({ req, res, page: "bundle" }).render()
)
routes.get(
  "/:locale/bundles/:id/:bundlename/bundledProduct/:bundledProductId",
  (req, res) => new PageCtrl({ req, res, page: "bundle" }).render()
)
routes.get("/:locale/pages/order-confirmation/:id", (req, res) =>
  new PageCtrl({ req, res, page: "orderConfirmation" }).render()
)
routes.get("/:locale/pages/*", (req, res) =>
  new PageCtrl({ req, res, page: "custom" }).render()
)
routes.get("/:locale/compare", (req, res) =>
  new PageCtrl({ req, res, page: "compare" }).render()
)
routes.get("/:locale/help", (req, res) =>
  new PageCtrl({ req, res, page: "help" }).render()
)
routes.get("/:locale/*", (req, res) =>
  new PageCtrl({ req, res, page: "custom" }).render()
)
// Custom pages
routes.get("/pages/*", (req, res) =>
  new PageCtrl({ req, res, page: "custom" }).render()
)

routes.get("/admin", (req, res) =>
  new PageCtrl({ req, res, page: "admin" }).render()
)

module.exports = routes

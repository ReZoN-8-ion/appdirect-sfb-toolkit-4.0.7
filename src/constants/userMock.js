const customUserAttributes = require("./customUserAttributesMock")

const userMock = {
  name: "{Username} LastName",
  isLoggedIn: true,
  email: "Username.lastname@email.com",
  family_name: "{Username}",
  given_name: "LastName",
  roles: ["CREATE_QUOTE", "USER"],
  userUuid: "686e6521-4ed5-4164-a776-00b04c9d73ff",
  hasCustomerContract: false,
  locale: "en_US",
  attributes: {
    HAS_CUSTOMER_CONTRACT: "false"
  },
  companyUuid: "3dc98547-47dd-47bb-9b01-4569be3412e6",
  currency: "USD",
  customUserAttributes,
  customerContractEditionUuids: [],
  ownedPartners: [],
  segments: {
    items: []
  }
}

module.exports = userMock

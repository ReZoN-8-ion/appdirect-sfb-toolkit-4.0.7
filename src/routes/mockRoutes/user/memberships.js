const userMemberships = {
  links: [],
  content: [
    {
      user: {
        uuid: "8492bd34-180f-4575-b3ed-c90216cfa8c0",
        userId: 8945368,
        email: "Username.lastName@email.com",
        userName: "Username.lastName@email.com",
        firstName: "{Username}",
        lastName: "LastName",
        idpUuid: null,
        picture: null,
        activated: true,
        allowLogin: true,
        ldapId: null,
        boostUser: null,
        creationDate: 1592328809000,
        externalId: "{Username}.lastName@email.com",
        locale: "en-US",
        lastSuccessfulLogin: 1616068357000,
        openId:
          "https://marketplace.appsmart.com/openid/id/8492bd34-180f-4575-b3ed-c90216cfa8c0",
        roles: ["ROLE_USER"],
        currency: "USD",
        customAttributes: [],
        properties: {
          country: null,
          state: null
        },
        metadata: {
          apsUid: null
        },
        links: [
          {
            rel: "self",
            href:
              "https://marketplace.appsmart.com/api/account/v2/users/8492bd34-180f-4575-b3ed-c90216cfa8c0"
          },
          {
            rel: "memberships",
            href:
              "https://marketplace.appsmart.com/api/account/v2/users/8492bd34-180f-4575-b3ed-c90216cfa8c0/memberships"
          }
        ]
      },
      company: {
        uuid: "3dc98547-47dd-47bb-9b01-4569be3412e6",
        companyId: null,
        name: "AppSmart (jbilling.com)",
        enabled: true,
        allowLogin: true,
        address: null,
        companySize: null,
        customAttributes: [
          {
            name: "PrimaryDomain",
            attributeType: "TEXT",
            label: "Primary Domain",
            hint: "",
            value: "AppSmart.com"
          }
        ],
        creationDate: null,
        industry: null,
        salesAgent: null,
        emailAddress: null,
        idpUuid: null,
        website: null,
        picture:
          "https://d3bql97l1ytoxn.cloudfront.net/profilePics/img6037176009655840101.png?7e5cb84af24bbd9cd0b2a37fbd9ea87b",
        vendor: true,
        reseller: false,
        channelAdmin: false,
        referral: false,
        externalId: null,
        phoneNumber: "866-456-3211",
        defaultRole: "USER",
        countryCode: null,
        status: null,
        thirtyDaysPurchaseLimit: null,
        thirtyDaysPurchaseLimitExempt: false,
        thirtyDaysPurchaseLimitOverrideAmt: null,
        thirtyDaysPurchaseRemainingAmt: null,
        dailyPurchaseLimit: null,
        dailyPurchaseLimitExempt: false,
        dailyPurchaseLimitOverrideAmt: null,
        dailyPurchaseRemainingAmt: null,
        importAppsEnabled: true,
        onlyAdminsCanBuy: false,
        links: [
          {
            rel: "self",
            href:
              "https://marketplace.appsmart.com/api/account/v2/companies/3dc98547-47dd-47bb-9b01-4569be3412e6"
          },
          {
            rel: "memberships",
            href:
              "https://marketplace.appsmart.com/api/account/v2/companies/3dc98547-47dd-47bb-9b01-4569be3412e6/memberships"
          }
        ]
      },
      enabled: true,
      lastUsed: false,
      roles: [],
      credentialsProfile: null,
      position: null,
      mosiUser: null,
      metadata: {
        mosi_username: null
      },
      links: [
        {
          rel: "self",
          href:
            "https://marketplace.appsmart.com/api/account/v2/companies/3dc98547-47dd-47bb-9b01-4569be3412e6/memberships/8492bd34-180f-4575-b3ed-c90216cfa8c0"
        },
        {
          rel: "user",
          href:
            "https://marketplace.appsmart.com/api/account/v2/users/8492bd34-180f-4575-b3ed-c90216cfa8c0"
        },
        {
          rel: "company",
          href:
            "https://marketplace.appsmart.com/api/account/v2/companies/3dc98547-47dd-47bb-9b01-4569be3412e6"
        }
      ]
    }
  ]
}

module.exports = userMemberships

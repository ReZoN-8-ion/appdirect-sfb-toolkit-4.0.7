const memberships = {
    links: [],
    content: [
        {
            user: {
                uuid: "9dda461e-e7cc-4137-85dd-fbe8b9f7e94e",
                userId: 11435715,
                email: "marketplace.manager@appdirect.com",
                userName: "marketplace.manager@appdirect.com",
                firstName: "Marketplace",
                lastName: "Manager",
                idpUuid: null,
                picture: null,
                activated: true,
                allowLogin: true,
                ldapId: null,
                boostUser: null,
                creationDate: 1610042173000,
                externalId: null,
                locale: "en-US",
                lastSuccessfulLogin: 1617642281000,
                openId: "https://sfbmarketplace.byappdirect.com/openid/id/9dda461e-e7cc-4137-85dd-fbe8b9f7e94e",
                roles: [
                    "ROLE_USER"
                ],
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
                        href: "https://sfbmarketplace.byappdirect.com/api/account/v2/users/9dda461e-e7cc-4137-85dd-fbe8b9f7e94e"
                    },
                    {
                        rel: "memberships",
                        href: "https://sfbmarketplace.byappdirect.com/api/account/v2/users/9dda461e-e7cc-4137-85dd-fbe8b9f7e94e/memberships"
                    }
                ]
            },
            company: {
                uuid: "1df65377-7269-4368-b671-1d129d966b4e",
                companyId: null,
                name: "sfbmarketplace",
                enabled: true,
                allowLogin: true,
                address: null,
                companySize: null,
                customAttributes: [],
                creationDate: null,
                industry: null,
                salesAgent: null,
                emailAddress: null,
                idpUuid: null,
                website: null,
                picture: null,
                vendor: true,
                reseller: false,
                channelAdmin: false,
                referral: false,
                externalId: null,
                phoneNumber: "5142417385",
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
                importAppsEnabled: false,
                onlyAdminsCanBuy: false,
                links: [
                    {
                        rel: "self",
                        href: "https://sfbmarketplace.byappdirect.com/api/account/v2/companies/1df65377-7269-4368-b671-1d129d966b4e"
                    },
                    {
                        rel: "memberships",
                        href: "https://sfbmarketplace.byappdirect.com/api/account/v2/companies/1df65377-7269-4368-b671-1d129d966b4e/memberships"
                    }
                ]
            },
            enabled: true,
            lastUsed: false,
            roles: [
                "ROLE_BILLING_ADMIN",
                "ROLE_CHANNEL_SUPPORT",
                "ROLE_DEVELOPER",
                "ROLE_CHANNEL_ADMIN",
                "ROLE_CHANNEL_PRODUCT_SUPPORT",
                "ROLE_SALES_SUPPORT",
                "ROLE_SYS_ADMIN"
            ],
            credentialsProfile: null,
            position: null,
            mosiUser: null,
            metadata: {
                mosi_username: null
            },
            links: [
                {
                    rel: "self",
                    href: "https://sfbmarketplace.byappdirect.com/api/account/v2/companies/1df65377-7269-4368-b671-1d129d966b4e/memberships/9dda461e-e7cc-4137-85dd-fbe8b9f7e94e"
                },
                {
                    rel: "user",
                    href: "https://sfbmarketplace.byappdirect.com/api/account/v2/users/9dda461e-e7cc-4137-85dd-fbe8b9f7e94e"
                },
                {
                    rel: "company",
                    href: "https://sfbmarketplace.byappdirect.com/api/account/v2/companies/1df65377-7269-4368-b671-1d129d966b4e"
                }
            ]
        }
    ]
}

module.exports = memberships;
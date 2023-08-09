const DEFAULT_APP_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAABfGlDQ1BJQ0MgcHJvZmlsZQAAKJFjYGAqSSwoyGFhYGDIzSspCnJ3UoiIjFJgv8PAzcDDIMRgxSCemFxc4BgQ4MOAE3y7xsAIoi/rgsxK8/x506a1fP4WNq+ZclYlOrj1gQF3SmpxMgMDIweQnZxSnJwLZOcA2TrJBUUlQPYMIFu3vKQAxD4BZIsUAR0IZN8BsdMh7A8gdhKYzcQCVhMS5AxkSwDZAkkQtgaInQ5hW4DYyRmJKUC2B8guiBvAgNPDRcHcwFLXkYC7SQa5OaUwO0ChxZOaFxoMcgcQyzB4MLgwKDCYMxgwWDLoMjiWpFaUgBQ65xdUFmWmZ5QoOAJDNlXBOT+3oLQktUhHwTMvWU9HwcjA0ACkDhRnEKM/B4FNZxQ7jxDLX8jAYKnMwMDcgxBLmsbAsH0PA4PEKYSYyjwGBn5rBoZt5woSixLhDmf8xkKIX5xmbARh8zgxMLDe+///sxoDA/skBoa/E////73o//+/i4H2A+PsQA4AJHdp4DTXElsAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkAwUPGCiNjQ5IAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAA6hJREFUeNrtm19P6kwQxp/pliqYWk2FEEGxmiDo9/8qJt6Yxmjin2hVCqXd0j0XrzWcVzhSTpfC6U7CTaFN++OZZ3dmgDjnAoAAEAkhtnRdBxGhTCGEQBRFYIzFADQAIM55DICISEs/VMZIxSCESABw/VMtrKxAplXzGRqASAOgQ8X/IdU0hWFmWjEFZk4oMHNCL7vpKsUoMAqMAqPAKDAKzObuY9bhJq6vrxEEwX/flKbh8vISjLFyKyYIgi8oAJAkCZ6fn1Uqvb6+fjvmeZ4C8/b29u1YGIbgnJcXTBAEiKJo5ntFq6ZQMJ7nze0vz0qx0lTXnudBCDETzng8Buccuq6XSzGpj/xpIjHLf/55MIukSpHpVBiYRdQQBAEmk0l5wIRhOHc1WpfVqRAwWR62KJ/R1jWN0hgOh0iSZHOKyHTeG8dxpvM45wjDMNM5j4+P2N3dzfZgug7DMJaew1MYhpk3MnEc4+rqaiPm3I7jZIa6dCqNRqNC5L1MfHx8rM5jtra2NuanItVqdbVgut1uYdv1hTyCCO12G7Ztr85jpg3Ydd2l5SorDMPA2dkZDMNYHuzfgJneut/d3a2FGdu2jXa7/feKG4/HuTxNFEW4ublBGIaF+I+maeh0OjBNM59UzAtMGvf393h5eVkplFqtBsdxcm2g5w4GAHzfh+u6K1nSm80mGo1G/uYtAwwATCYTuK6L4XAoZ8uu63AcZ+nluDAwaTw9PeHh4SHXa5qmiZOTE6lepss2ykajkTuYer0OTZNb/0qvrt/f3wutztcWjIz25MaDEUJgMBjkft0kSeD7/uaCkVkqyFaNVDAy+7UyvGslYIQQUm8+jmOMRqPNAzMYDDIVlaZpol6vZzpH5txJk5lGi+yRiAitVgunp6c4PDxEt9sFY2whQDIVKW12vYjxViqVr75Jeh/VahUXFxdwXffHFS1NJxllgRTF+L7/YwG5v7+PXq83s5lERHAcB61W60fVyVqdpID5080SETqdDo6Ojn58aNu2cX5+jkql8m+AmZf729vb6Pf7sCxr4WsZhoFer4e9vb2Z73POFx73ZvIYWS2HWcVks9lcrgVAhOPjY1iWhdvb22/GLGPwL0UxBwcH3wx2WSjTYVkW+v0+arXa17GdnR0p5iu9H7OpoX4ZrsAoMAqMAqPAKDBrH+p/10oxCkxuYLjC8HswxqABIIXi90oegNCEEEzBIDDGQEQQQkAIQelQX0y9WEnhJJ9NeCKi6BeuQbKy+AUlUAAAAABJRU5ErkJggg=="

const getPricingTotal = () => ({
  amountDueAfterTax: "34.4800000000",
  amountDueBeforeTax: "32.0000000000",
  taxSummary: [
    {
      description: "Flat Tax",
      taxAmount: "2.4800000000"
    }
  ],
  recurringTotals: [
    {
      billingCycle: {
        period: "MONTHLY",
        dayOfMonth: 6
      },
      totalSalePrice: "25.0000000000",
      totalSalePriceTaxIncluded: null
    },
    {
      billingCycle: {
        period: "MONTHLY",
        dayOfMonth: 7
      },
      totalSalePrice: "30.0000000000",
      totalSalePriceTaxIncluded: null
    }
  ],
  totalTaxAmount: "2.4800000000"
})

const mockSingleCart = (items = [], associations = []) => ({
  id: "0c000000000a000000000rt0",
  createdOn: "1581524304971",
  ownerUserId: "a00aa0a0-a0a0-0a00-aa00-0000aaa0000",
  ownerCompanyId: "0aaa00a0-0a00-0a0a-a000-0aa0000aa0a0",
  buyerType: "CUSTOMER",
  currency: "USD",
  status: "ACTIVE",
  paymentMethodId: null,
  preAuthId: null,
  buyerUserId: "a00aa0a0-a0a0-0a00-aa00-0000aaa0000",
  buyerCompanyId: "0aaa00a0-0a00-0a0a-a000-0aa0000aa0a0",
  items,
  associations,
  itemsCount: items.length || 0,
  pricingTotal: items.length ? getPricingTotal() : null
})

const getIndex = (index, digits = 6) =>
  (index / 10 ** digits).toFixed(digits).replace(".", "")

const getEditionIdBasedOnPPId = pricingPlanId => `${pricingPlanId}-3DI7I0N`

const mockEdition = pricingPlanId => ({
  id: getEditionIdBasedOnPPId(pricingPlanId),
  name: "Toolkit Sample",
  editionCode: "TOOLKITE",
  revenueModel: "RECURRING",
  freeTrialTerms: {
    freeTrialDuration: 0,
    freeTrialDurationPeriod: "DAY",
    freeTrialGracePeriod: null
  },
  pricingPlans: [
    {
      id: pricingPlanId,
      currency: "USD",
      pricingPeriod: "MONTHLY",
      pricingSources: [
        {
          source: "BASE_CATALOG",
          pricingDefinitions: [
            {
              costTypeCategory: "ONE_TIME",
              costType: "METERED_USAGE",
              pricingStrategy: "UNIT",
              unit: "USER",
              salePrice: null,
              wholeSalePrice: null,
              priceRanges: [
                {
                  min: "0.0000000000",
                  max: null,
                  salePrice: "8.0000000000",
                  wholeSalePrice: null
                }
              ],
              unitAllowsDecimals: null,
              increment: null,
              allowsMeteredUsage: null,
              displaysPricePerIncrement: null
            }
          ]
        }
      ]
    }
  ]
})

const mockDetails = (index, pricigPlanId, isAddon = false) => {
  const name = isAddon ? `Addon ${index + 1}` : `Product ${index + 1}`
  const mockedLink = `#mockedLinkTo${name.replace(" ", "")}`
  return {
    id: "1",
    type: "PRODUCT",
    customIntegration: null,
    stacked: false,
    branding: {
      name,
      vendor: "AppDirect",
      desc: "Short sample description",
      iconUrl: isAddon ? "" : DEFAULT_APP_ICON,
      href: mockedLink,
      storefrontUrl: mockedLink
    },
    editions: [mockEdition(pricigPlanId)]
  }
}

const mockCartItem = (index, pricingPlanId) => ({
  pricingPlanId,
  id: index,
  referenceId: null,
  subscriptionId: null,
  serviceConfiguration: null,
  billingConfiguration: null,
  discountCode: null,
  discountId: null,
  customPrices: [],
  units: [
    {
      quantity: "1.0000000000",
      unit: "USER"
    }
  ],
  customAttributes: null,
  customContractConfiguration: null
})

const getAssociationItem = ([cartItemId, ...childItemIds]) => ({
  parentItemId: cartItemId,
  childItemIds,
  type: null
})

const contentWrapper = singleCart => ({
  content: [singleCart],
  page: {
    size: 10,
    totalElements: 1,
    totalPages: 1,
    number: 1
  }
})

const mockCart = (
  requestData = [],
  {
    WITH_CHILD_ITEMS = false,
    WITH_CONTENT_WRAPPER = false,
    WITH_ITEM_DETAILS = false
  }
) => {
  const cartItemsAssociations = []
  const items = []

  if (!Array.isArray(requestData)) {
    return mockSingleCart(items, cartItemsAssociations)
  }

  requestData.forEach(({ pricingPlanId, associations = [] }, itemIndex) => {
    const cartItemIds = []
    const childItems = []

    const cartItem = mockCartItem(cartItemIds[0], pricingPlanId)
    cartItemIds.push(`000000-${getIndex(itemIndex)}`)

    associations.forEach((associationPricingPlanId, associationIndex) => {
      const associationItemIndex = `000000-${getIndex(itemIndex)}-${getIndex(
        associationIndex
      )}`
      const cartAssociationItem = mockCartItem(
        associationItemIndex,
        associationPricingPlanId
      )
      if (WITH_ITEM_DETAILS) {
        cartAssociationItem.selectedPricingPlanId = associationPricingPlanId
        cartAssociationItem.selectedEditionId = getEditionIdBasedOnPPId(
          pricingPlanId
        )
        cartAssociationItem.itemDetails = mockDetails(
          associationIndex,
          associationPricingPlanId,
          true
        )
      }
      childItems.push(cartAssociationItem)
      cartItemIds.push(associationItemIndex)
    })

    if (WITH_ITEM_DETAILS) {
      cartItem.selectedPricingPlanId = pricingPlanId
      cartItem.selectedEditionId = getEditionIdBasedOnPPId(pricingPlanId)
      cartItem.itemDetails = mockDetails(itemIndex, pricingPlanId)
    }

    if (WITH_CHILD_ITEMS) {
      cartItem.childItems = childItems
      items.push(cartItem)
    } else {
      items.push(cartItem, ...childItems)
    }
    cartItemsAssociations.push(getAssociationItem(cartItemIds))
  })

  const singleCart = mockSingleCart(items, cartItemsAssociations)
  if (WITH_CONTENT_WRAPPER) {
    return contentWrapper(singleCart)
  }
  return singleCart
}

module.exports = mockCart

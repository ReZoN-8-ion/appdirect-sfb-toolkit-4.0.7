const customUserAttributesMock = {
  key_user_1: {
    id: 3638,
    entityType: "USER",
    type: "TEXT",
    partner: "APPDIRECT",
    attributeKey: "key_user_1",
    enabled: true,
    required: false,
    system: false,
    taggedPermissions: {},
    label: { "en-US": "Demo user ID" },
    hint: { "en-US": "" }
  },
  PatKey: {
    id: 3471,
    entityType: "USER",
    type: "TEXT",
    partner: "APPDIRECT",
    attributeKey: "PatKey",
    enabled: true,
    required: false,
    system: false,
    taggedPermissions: {
      USER_PROFILE: {
        RESELLER: { permission: "READ", required: false },
        CHANNEL_SUPPORT: { permission: "READ", required: false },
        SALES_SUPPORT: { permission: "READ", required: false },
        USER: { permission: "READ", required: false },
        DEVELOPER: { permission: "READ", required: false }
      }
    },
    validation: {
      validationType: "EXTERNAL",
      uuid: "8c4901f6-25f0-4d26-ad97-a8a2242721b0",
      errorMessageTranslations: { "en-US": "asdasd" },
      consumerKey: "asda",
      consumerSecret: "*****",
      endpointTemplate: "http://example.com?{value}",
      errorCodeMessages: {}
    },
    label: { "en-US": "Pat custom attribute" },
    hint: { "en-US": "" }
  },
  "attrnew-francais": {
    id: 7029,
    entityType: "USER",
    type: "MULTISELECT",
    partner: "APPDIRECT",
    attributeKey: "attrnew-francais",
    enabled: true,
    required: false,
    system: false,
    taggedPermissions: {},
    label: {
      fr: "attrnew-francais",
      "en-US": "attrnew-fr"
    },
    hint: {
      fr: "attrnew-francais"
    },
    valueOptions: [
      {
        uuid: "daa455fc-e2ec-404e-bcf7-0372379c06cf",
        optionKey: "francais",
        optionLabel: {
          fr: "francais"
        }
      }
    ]
  },
  user: {
    id: 3481,
    entityType: "USER",
    type: "MULTISELECT",
    partner: "APPDIRECT",
    attributeKey: "user",
    enabled: true,
    required: false,
    system: false,
    taggedPermissions: {
      USER_DETAILS: {
        RESELLER: { permission: "WRITE", required: false },
        CHANNEL_SUPPORT: { permission: "WRITE", required: false },
        SALES_SUPPORT: { permission: "WRITE", required: false }
      }
    },
    label: { "en-US": "user_label" },
    hint: { "en-US": "hint" },
    valueOptions: [
      {
        uuid: "2c3908ec-6389-42c4-a1a2-32ed3e135df6",
        optionKey: "o1",
        optionLabel: { "en-US": "o1" }
      },
      {
        uuid: "bad98a5f-17a5-4661-bb81-48bc397cfab1",
        optionKey: "o2",
        optionLabel: { "en-US": "o2" }
      }
    ]
  },
  user_email: {
    id: 6603,
    entityType: "USER",
    type: "TEXT",
    partner: "APPDIRECT",
    attributeKey: "user_email",
    enabled: true,
    required: false,
    system: false,
    taggedPermissions: {
      USER_DETAILS: {
        SALES_SUPPORT: {
          permission: "WRITE",
          required: false
        },
        RESELLER: {
          permission: "WRITE",
          required: false
        },
        CHANNEL_SUPPORT: {
          permission: "WRITE",
          required: false
        }
      }
    },
    label: {
      "en-US": "user email"
    },
    hint: {
      "en-US": ""
    }
  }
}

module.exports = customUserAttributesMock

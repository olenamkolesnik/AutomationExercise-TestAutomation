export const getUserResponseSchema = {
  type: "object",
  required: ["responseCode", "user"],
  additionalProperties: false,
  properties: {
    responseCode: {
      type: "number",
      enum: [200]
    },

    user: {
      type: "object",
      required: [
        "id",
        "name",
        "email",
        "title",
        "birth_day",
        "birth_month",
        "birth_year",
        "first_name",
        "last_name",
        "company",
        "address1",
        "address2",
        "country",
        "state",
        "city",
        "zipcode"
      ],
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        title: { type: "string" },

        birth_day: { type: "string", pattern: "^[0-9]{1,2}$" },
        birth_month: { type: "string", pattern: "^[0-9]{1,2}$" },
        birth_year: { type: "string", pattern: "^[0-9]{4}$" },

        first_name: { type: "string" },
        last_name: { type: "string" },

        company: { type: "string" },
        address1: { type: "string" },
        address2: { type: "string" },

        country: { type: "string" },
        state: { type: "string" },
        city: { type: "string" },

        zipcode: { type: "string" }
      }
    }
  }
};

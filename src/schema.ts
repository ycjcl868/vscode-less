export default {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: "string",
      enum: ["less", "scss"],
    },
    theme: {
      type: "string"
    }
  }
};

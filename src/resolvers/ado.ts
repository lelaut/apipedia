import { Resolvers } from "../__generated__/types";

const ado = [
  {
    value: "AA",
  },
  {
    value: "BB",
  },
];

const resolvers: Resolvers = {
  Query: {
    ado: () => ado,
  },
};

export default resolvers;

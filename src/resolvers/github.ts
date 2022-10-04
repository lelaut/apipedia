import { Resolvers } from "../__generated__/types";

const github = [
  {
    value: "The Awakening",
  },
  {
    value: "City of Glass",
  },
];

const resolvers: Resolvers = {
  Query: {
    github: () => github,
  },
};

export default resolvers;

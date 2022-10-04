
        import { gql } from "apollo-server";
        import { mergeTypeDefs } from "@graphql-tools/merge";

        const types = {
        './graphql/repository.graphql': gql`type GithubRepository {
  value: String
}

type ADORepository {
  value: String
}

type Query {
  github: [GithubRepository]
  ado: [ADORepository]
}
`,
'./graphql/test.graphql': gql`type Another {
  something: String
}

type Query {
  another: Another
}
`,
};
export default mergeTypeDefs(Object.values(types));
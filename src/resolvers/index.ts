// TODO: import 'Query' and 'Mutation' from .codegen and merge the
// implementation here using `mergeResolvers`, then default export them

import { mergeResolvers } from "@graphql-tools/merge";

import adoResolvers from "./ado";
import githubResolvers from "./github";

export default mergeResolvers([adoResolvers, githubResolvers]);

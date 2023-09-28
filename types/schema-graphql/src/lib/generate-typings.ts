import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./schema.graphql'],
  path: join(process.cwd(), 'src/lib/schema.graphql.ts'),
  outputAs: 'class',
  watch: true,
});

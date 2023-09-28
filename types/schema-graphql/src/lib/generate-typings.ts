import { GenerateOptions, GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const options: GenerateOptions = {
  typePaths: ['./schema.graphql'],
  path: join(process.cwd(), 'src/lib/schema.graphql.ts'),
  outputAs: 'class',
  watch: true,
};

if (process.env['NODE_ENV'] === 'production') {
  options.watch = false;
}

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate(options);

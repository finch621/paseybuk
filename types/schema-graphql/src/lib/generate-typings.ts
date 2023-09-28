import { GenerateOptions, GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const shouldWatch = process.argv[2];

const options: GenerateOptions = {
  typePaths: [join(process.cwd(), 'src/schema.graphql')],
  path: join(process.cwd(), 'src/lib/schema.graphql.ts'),
  outputAs: 'class',
  watch: shouldWatch ? true : false,
};

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate(options);

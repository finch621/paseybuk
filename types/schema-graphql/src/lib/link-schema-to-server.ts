import { symlink } from 'fs';
import { join } from 'path';

const schemaFileName = 'schema.graphql';
const serverProjectRoot = join(process.cwd(), '../../../../apps/server/src');
const serverSchemaLinkPath = `${serverProjectRoot}/${schemaFileName}`;
const schemaPath = join(process.cwd(), `../../${schemaFileName}`);

symlink(schemaPath, serverSchemaLinkPath, 'file', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Symlink created to ${serverSchemaLinkPath}`);
  }
});

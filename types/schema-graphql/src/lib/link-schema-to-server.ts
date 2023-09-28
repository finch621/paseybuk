import { readFileSync, symlink } from 'fs';
import { join } from 'path';

const schemaFileName = 'schema.graphql';
const serverProjectRoot = join(process.cwd(), '../../apps/server/src');
const serverSchemaLinkPath = `${serverProjectRoot}/${schemaFileName}`;
const schemaPath = join(process.cwd(), `/src/${schemaFileName}`);

if (!readFileSync(serverSchemaLinkPath)) {
  symlink(schemaPath, serverSchemaLinkPath, 'file', (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.info(`Schema file linked to ${serverSchemaLinkPath}`);
    }
  });
} else {
  console.info(`Link already existed`);
}

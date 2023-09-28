import { existsSync, symlink } from 'fs';
import { resolve } from 'path';

const fileName = 'schema.graphql';
const schemaPath = resolve(`src/${fileName}`);
const schemaLinkPath = resolve(`../../apps/server/src/${fileName}`);

if (!existsSync(schemaLinkPath)) {
  symlink(schemaPath, schemaLinkPath, (err: unknown) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.info(
        `Schema file from ${schemaPath} linked to ${schemaLinkPath}`
      );
    }
  });
} else {
  console.info(`Link already existed`);
}

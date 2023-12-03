import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'yaml';

let config: any = null;
export function getConfig() {
  if (config) {
    return config;
  }
  const yamlPath = resolve(
    process.cwd(),
    `app.${process.env.NODE_ENV || 'development'}.yaml`,
  );

  const file = readFileSync(yamlPath, 'utf8');
  try {
    config = parse(file) || {};
    return config;
  } catch (e) {
    console.error('load config file is failed:' + e?.toString());
    return {};
  }
}

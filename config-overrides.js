module.exports = function override(config, env) {
  const oneOfNode = config.module.rules.find(conf => {
    if (!Reflect.has(conf, 'oneOf')) {
      return undefined;
    }
    return conf;
  });

  if (!oneOfNode) {
    console.log(`could not find oneOf node`);
    return;
  }

  const tsLoader = oneOfNode['oneOf'].find(conf => {
    return conf.loader && conf.loader.includes('ts-loader');
  });

  if (!tsLoader) {
    console.log(`could not find ts-loader node`);
    return;
  }

  // Use ts-import-plugin.
  const tsImportPluginFactory = require('ts-import-plugin');
  const antdTransformer = tsImportPluginFactory({
    libraryName: 'antd',
    libraryDirectory: 'lib',
    style: 'css'
  });

  // Add optinos for ts-loader.
  tsLoader['options'] = {
    getCustomTransformers: () => ({ before: [antdTransformer] })
  };

  // FIXED Warning: The 'no-use-before-declare' rule requires type infomation.
  const tsLintLoader = config.module.rules.find(conf => {
    return conf.loader && conf.loader.includes('tslint-loader');
  });
  tsLintLoader.options = tsLintLoader.options || {};
  tsLintLoader.options.typeCheck = true;

  const rewireLess = require('react-app-rewire-less');
  config = rewireLess(config, env);

  // For import with absolute path.
  const path = require('path');
  config.resolve.modules = [path.resolve('src')].concat(config.resolve.modules);

  return config;
};

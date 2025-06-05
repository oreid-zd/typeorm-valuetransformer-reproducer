// wrapper to use with ts-node
// [ts-]node -e 'require("typeorm/cli")' does not play well with its CLI parser
//
// Why we don't use yarn run --require ... typeorm-ts-node-[commonjs|esm]:
// It doesn't work with dotenv / tsconfig-paths: https://github.com/typeorm/typeorm/issues/8824
import 'typeorm/cli'

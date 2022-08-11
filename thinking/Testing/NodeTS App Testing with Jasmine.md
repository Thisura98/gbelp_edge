# Testing Node TS app with Jasmine

## Note

```ts
export function myFunc(){}
import { myFunc } from './lib';
```

These are TypeScript modules. They are compiled into whatever module format you specify in the `tsconfig.json` file. There are no 'require' methods in TypeScript modules.

*.spec.ts are also TypeScript modules. However, Jasmine (by default) only works with .js files. To support TS to JS compilation in the middle, ts-node is used. In jasmine.json we have configured a helper that registers the ts-node compiler before jasmine evaluates code.

## Pre-requisites

1. A NodeJS project configured with typescript.
2. NodeTS.
3. Some TS code that can be tested.

## Setup

1. npm i npm i jasmine @types/jasmine jasmine-spec-reporter --save
2. Create the following 3 files

```
node
 |- src
    |- ts code ...
 |- package.json
 |- index.ts
 |- spec
    |- helpers
       |- jasmine-ts-helper.js          <-- 1
       |- spec-reporter-helper.js       <-- 2
 |- jasmine.json                        <-- 3
```

3. Setup jasmine-ts-helper.js

```js
const { register } = require('ts-node');
register({ project: 'tsconfig.json' })
```

- Make sure to use CommonJS import here ('require'). __DO NOT USE__ import.

4. Setup spec-reporter-helper.js

```js
const SpecReporter = require('jasmine-spec-reporter').SpecReporter

jasmine.getEnv().clearReporters() // remove default reporter logs
jasmine.getEnv().addReporter(
    new SpecReporter({
        // add jasmine-spec-reporter
        spec: {
            displayPending: true,
        },
    })
)
```

- This provides nice reports

5. Setup jasmine.json

```json
{
    "spec_dir": "spec",
    "spec_files": ["**/*[sS]pec.ts"]
}
```

- All test code must be placed in the "spec" folder.
- Jasmine should only look for '.spec.ts' files.

6. Add test command to package.json

```json
  "scripts": {
    "test": "npx jasmine --config=jasmine.json"
  },
```

## Writing Tests

1. Create new folder 'spec'.
2. Add a '*.spec.ts' file.

```
node
 |- src
 |- spec
    |- test.config.spec.ts
 |- package.json
 |- jasmine.json
```

3. Write a test.

```ts
describe('Sample Tests', () => {
    it('Equality', async () => {
        expect(2).toBe(2);
    });
});
```

4. npm test


## Acknowledgements

- [https://github.com/svi3c/jasmine-ts/issues/177#issuecomment-1008292856](This comment by @ert78gb)

- [https://medium.com/@turhan.oz/typescript-with-jasmine-easy-project-setup-530c7cc764e8](Typescript with Jasmine by Turhan Oz)
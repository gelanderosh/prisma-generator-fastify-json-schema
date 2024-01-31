## [2.0.0-beta.5](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2024-01-31)


### Bug Fixes

* **schema:** Removed key "mode" from patternProperties in [#definitions](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/issues/definitions)/comparisonOperatiors since its already taken care of in its own property and raises a complaint for matching properties. ([d80cd71](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/d80cd710eccb7e6aa89fa37449035ee33623ee71))

## [2.0.0-beta.4](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2024-01-31)


### Bug Fixes

* **package:** Fix [#for](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/issues/for)Include/select schema which was missing type and properties props. ([fd86e7d](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/fd86e7dfe7a49cf7420d9ec5ceb3879d12af8eb9))

## [2.0.0-beta.3](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2024-01-31)


### Bug Fixes

* **package:** Fix withRequired and withoutRequired schemas which were missing type and properties props. ([9df9c49](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/9df9c49e15b9828287adb2e6fb5fc87c6eb50e16))

## [2.0.0-beta.2](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2024-01-31)


### Bug Fixes

* **package:** Fixed bin route. ([97fd467](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/97fd46749d8cad9ac6b18b724254d9dea79d580b))

## [2.0.0-beta.1](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.1.5...v2.0.0-beta.1) (2024-01-31)


### ⚠ BREAKING CHANGES

* **generator:** Removed the capacity to allow single schema file generation, removed relation fields entirely as they have no use in fastify.
* **generator:** Removed the capacity to allow single schema file generation, removed relation fields entirely as they have no use in fastify.
* **generator:** Removed the capacity to allow single schema file generation, removed relation fields entirely as they have no use in fastify.

### perf

* **generator:** Rewrote most of the functionalities of the plugin. ([d31df99](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/d31df99eab5c285c29c99796facaf79b873d3a55))
* **generator:** Rewrote most of the functionalities of the plugin. ([23602c3](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/23602c35c365972cc8c3fd64a77c7564b3a8446b))
* **generator:** Rewrote most of the functionalities of the plugin. ([cde32f8](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/cde32f86c2e5eb7697d1c4926fbccf9471ab2cd6))


### Features

* **schema:** Add ability to generate a schema with nested schema with required attributes and not required. ([f9cacce](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/f9cacce448c2ca5238d70031100500308bab518e))


### Bug Fixes

* **build:** Fixed package-lock.json so it can build. ([9cc6b14](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/9cc6b140222226527e9ed2f5ead850383509430c))
* **build:** Fixed package-lock.json so it can build. ([41bb5da](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/41bb5da99e54846cb6a9b7b9c13ea2cd2d543446))


### Dependencies and Other Build Updates

* **deps:** bump @prisma/generator-helper from 5.8.1 to 5.9.0 ([79aafaf](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/79aafaf38c30b3819a3395100cc62cda48102904))
* **deps:** bump @prisma/internals from 5.8.1 to 5.9.0 ([75726e3](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/75726e34e4bc8e0a494e68db67a3df3fccb77bc8))
* **dev-deps:** bump @prisma/client from 5.8.1 to 5.9.0 ([a6f27bb](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/a6f27bb3939b84588f643b7164d33ae46578c8a6))
* **dev-deps:** bump @swc/cli from 0.3.2 to 0.3.5 ([10b1b47](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/10b1b47a44dea6e7fb2e5ad5ac165c413642a79b))
* **dev-deps:** bump @swc/core from 1.3.106 to 1.3.107 ([bd3a50c](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/bd3a50c5dc70e8755a1eaa9703fdecd112139b28))
* **dev-deps:** bump @types/node from 20.11.7 to 20.11.10 ([0638ebf](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/0638ebf504653d5274dcb4ad6fdd612d2f4c5e31))
* **dev-deps:** bump @typescript-eslint/eslint-plugin ([c486e69](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/c486e692731dc39baa2bf14d9dc3c8ca02c3c0c7))
* **dev-deps:** bump @typescript-eslint/parser from 6.19.1 to 6.20.0 ([7b7bb6e](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/7b7bb6efe0df25addb1b7038ddba65f648d1c01e))
* **dev-deps:** bump browserslist from 4.22.2 to 4.22.3 ([1dca735](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/1dca735d8d678c9cbb657042de576168ea115e28))
* **dev-deps:** bump prisma from 5.8.1 to 5.9.0 ([693b189](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/693b18996d825dd609a2d886528c439355dda96f))

## [1.1.5](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.1.4...v1.1.5) (2024-01-26)

## [1.1.4-beta.3](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.1.4-beta.2...v1.1.4-beta.3) (2024-01-26)


### Bug Fixes

* **build:** Fixed package-lock.json so it can build. ([16f4011](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/16f401133d5c336759c900612f6e507c58d73a40))

## [1.1.4](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.1.3...v1.1.4) (2024-01-26)
* **build:** Fixed package-lock.json so it can build. ([9cc6b14](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/9cc6b140222226527e9ed2f5ead850383509430c))

## [1.1.4-beta.2](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.1.4-beta.1...v1.1.4-beta.2) (2024-01-26)


### Bug Fixes

* **build:** Fixed package-lock.json so it can build. ([41bb5da](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/41bb5da99e54846cb6a9b7b9c13ea2cd2d543446))

## [1.1.4-beta.1](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.1.3...v1.1.4-beta.1) (2024-01-26)


### Bug Fixes

* **build:** Fixed package-lock.json so it can build. ([dbc1bea](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/dbc1bea5987fbf03c93c85ecc39b1e34bf42d195))
* **build:** Fixed package-lock.json so it can build. Added semantic-release as dev dependency. ([52b1743](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/52b1743d7771ce1731d2556f343a324a456ab587))

## [1.1.3](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.1.2...v1.1.3) (2024-01-26)


### Bug Fixes

* **build:** Test binary. ([7278ea3](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/7278ea3046d690f9bd72021b113a30a764135c8a))

## [1.1.2](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.1.1...v1.1.2) (2024-01-26)


### Bug Fixes

* **build:** Test binary. ([f74224b](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/f74224b90ba39b01d7cfd0ef7f9ba740a1d0c6e8))

## [1.1.1](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.1.0...v1.1.1) (2024-01-26)


### Bug Fixes

* **logging:** Removed multiple console.logs. ([ba09896](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/ba0989600aec32bd15a309994ae1ed11bda3cf53))


### Dependencies and Other Build Updates

* **dev-deps:** bump @swc/cli from 0.3.0 to 0.3.2 ([314d063](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/314d063dbed24253ed7e127786d15f82e59f05ab))
* **dev-deps:** bump @swc/core from 1.3.105 to 1.3.106 ([1dadb56](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/1dadb56bcf34fc2836758007393d5a86a700f04b))
* **dev-deps:** bump @types/node from 20.11.6 to 20.11.7 ([ec4bb99](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/ec4bb99f413bc082d6cd7fc8658de356902b4872))

## [1.1.0](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.0.1...v1.1.0) (2024-01-25)


### Features

* **schema:** Added option to ignore default values. ([bad4131](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/bad41313d062be4ad740fd25a0fe6152c785e39f))


### Dependencies and Other Build Updates

* **dev-deps:** bump @swc/cli from 0.1.65 to 0.3.0 ([ed4c697](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/ed4c69706c58d71408291fe73dfa6a948fb10cc8))
* **dev-deps:** bump @types/node from 20.11.5 to 20.11.6 ([c96f8c9](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/c96f8c917cb57a98fc4367d044deb240a24d450f))

## [1.0.1](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/compare/v1.0.0...v1.0.1) (2024-01-23)


### Bug Fixes

* **version:** Version 1.0.1 release ([dfca9e1](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/dfca9e104a946419eedf7fff9bb29ae494ab7fa7))

## 1.0.0 (2024-01-23)


### Bug Fixes

* **version:** Version 1.0.1 release ([df67ea0](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/df67ea018c8381289836e90973cfc5735b18de36))


### Dependencies and Other Build Updates

* **dev-deps:** bump @semantic-release/github from 9.2.3 to 9.2.6 ([604adc1](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/604adc1952ee6425e5a6c80acdbe113ef5788d7a))
* **dev-deps:** bump @semantic-release/npm from 11.0.1 to 11.0.2 ([88c5df5](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/88c5df53a026cd8e81786669b58c1743a6376bb9))
* **dev-deps:** bump @swc/cli from 0.1.63 to 0.1.65 ([d34c837](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/d34c837d17c3e8a779c28b96d6ba878e2894248e))
* **dev-deps:** bump @swc/core from 1.3.104 to 1.3.105 ([20bcbc9](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/20bcbc9872acef4975ce3ef71aded748f4e8dfb3))
* **dev-deps:** bump @swc/jest from 0.2.30 to 0.2.31 ([5a41f54](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/5a41f54e9db6e26f2d7cec3fc3248be11a101898))
* **dev-deps:** bump @typescript-eslint/eslint-plugin ([bd57a02](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/bd57a027c8c3190077570aded3c37cbafd746105))
* **dev-deps:** bump @typescript-eslint/parser from 6.19.0 to 6.19.1 ([c4b59d3](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/c4b59d3a4fe5a54f59bca9c112e68e7b4297f315))
* **dev-deps:** bump prettier from 3.0.3 to 3.2.4 ([e258dac](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/commit/e258dac1726e4be208d0b270dd3f7fe8cf2f3959))

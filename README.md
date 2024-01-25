[![Actions Status](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/workflows/build/badge.svg)](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/actions)
[![Dependabot auto-merge](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/actions/workflows/dependabot.yml/badge.svg)](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/actions/workflows/dependabot.yml)
[![CodeQL](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/actions/workflows/codeql-analysis.yml)[![npm](https://img.shields.io/npm/v/prisma-generator-fastify-json-schema)](https://www.npmjs.com/package/prisma-generator-fastify-json-schema)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/mexdevelop/prisma-generator-fastify-json-schema/blob/main/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)

# Prisma Fastify JSON Schema Generator

This is a fork of [prisma-json-schema-generator](https://github.com/valentinpalkovic/prisma-json-schema-generator) by [Valentin Palkovic](https://github.com/valentinpalkovic) that adds support for [Fastify](https://www.fastify.io/) generating individual schemas for each model in version 7 of the specification (https://json-schema.org/).

## Getting Started

**1. Install**

npm:

```shell
npm install prisma-generator-fastify-json-schema --save-dev
```

**2. Add the generator to the schema**

```prisma
generator jsonSchema {
  provider = "prisma-generator-fastify-json-schema"
}
```

With a custom output path (default=./json-schema)

```prisma
generator jsonSchema {
  provider = "prisma-generator-fastify-json-schema"
  output = "custom-output-path"
}
```

Additional options

```prisma
generator jsonSchema {
  provider = "prisma-generator-fastify-json-schema"
  keepRelationScalarFields = "true"
  schemaId = "some-schema-id"
  includeRequiredFields = "true"
  persistOriginalType = "true"
  forceAnyOf = "true"
  generateExportFile= "true"
  exportFileName = "schemas"
  exportAsEsModule = "true"
  useAssert = "true"
  ignoreDefaults = "true"
}
```

The generator currently supports a few options

| Key                      | Default Value | Description                                                                                                                                                                                            |
|--------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| keepRelationScalarFields | "false"       | By default, the JSON Schema that's generated will output only objects for related model records. If set to "true", this will cause the generator to also output foreign key fields for related records |
| keepRelationFields       | "true"        | Determines whether to include fields from related models in the generated schema. Setting it to `"false"` allows excluding related model fields from the schema.                                       |
| includeRequiredFields    | "false"       | If this flag is `"true"` all required scalar prisma fields that do not have a default value, will be added to the `required` properties field for that schema definition.                              |
| persistOriginalType      | "false"       | If this flag is `"true"` the original type will be added under the property key "originalType"                                                                                                         |
| forceAnyOf               | "false"       | If this flag is `"true"` the union types will be forced to use `anyOf`. Check [contradictory types](https://ajv.js.org/strict-mode.html#contradictory-types) for details                               |
| generateExportFile       | "false"       | If this flag is `"true"` an index.ts file that imports and then exports all of the schemas as an object will be generated                                                                              |
| exportFileName           | "index.ts"    | The name of the export file that will be generated if `generateExportFile` is set to `"true"`                                                                                                          |
| exportAsEsModule         | "false"       | If this flag is `"true"` the export file will be generated as an ES module if `generateExportFile` is set to `"true"`                                                                                  |
| useAssert                | "false"       | If this flag is `"true"` the generated index file will use "assert" on json imports otherwise it will use "with" if both `generateExportFile` and `exportAsEsModule` are set to true.                  |

**3. Run generation**

prisma:

```shell
prisma generate
```

nexus with prisma plugin:

```shell
nexus build
```

## Supported Node Versions

|         Node Version | Support            |
|---------------------:|:-------------------|
| (Maintenance LTS) 18 | :heavy_check_mark: |
|             (LTS) 20 | :heavy_check_mark: |
|         (Current) 21 | :heavy_check_mark: |

## Examples

### PostgreSQL

This generator converts a prisma schema like this:

```prisma
datasource db {
	provider = "postgresql"
	url      = env("DATABASE_URL")
}

model User {
    id                  Int      @id @default(autoincrement())
    // Double Slash Comment: It will NOT show up in JSON schema
    createdAt           DateTime @default(now())
    /// Triple Slash Comment: It will show up in JSON schema [EMAIL]
    email               String   @unique
    weight              Float?
    is18                Boolean?
    name                String?
    number              BigInt   @default(34534535435353)
    favouriteDecimal    Decimal
    bytes               Bytes /// Triple Slash Inline Comment: It will show up in JSON schema [BYTES]
    successorId         Int?     @unique
    successor           User?    @relation("BlogOwnerHistory", fields: [successorId], references: [id])
    predecessor         User?    @relation("BlogOwnerHistory")
    role                Role     @default(USER)
    posts               Post[]
    keywords            String[]
    biography           Json
}

model Post {
    id     Int   @id @default(autoincrement())
    user   User? @relation(fields: [userId], references: [id])
    userId Int?
}

enum Role {
    USER
    ADMIN
}
```

into:

Post.json
```JSON

        {
            "properties": {
                "id": { "type": "integer" },
                "user": {
                    "anyOf": [
                        { "$ref": "User" },
                        { "type": "null" }
                    ]
                }
            },
            "type": "object"
        }
```


User.json
```JSON
{
  "properties": {
      "biography": {
          "type": [
              "number",
              "string",
              "boolean",
              "object",
              "array",
              "null"
          ]
      },
      "createdAt": { "format": "date-time", "type": "string" },
      "email": {
          "description": "Triple Slash Comment: Will show up in JSON schema [EMAIL]",
          "type": "string"
      },
      "id": { "type": "integer" },
      "is18": { "type": ["boolean", "null"] },
      "keywords": { "items": { "type": "string" }, "type": "array" },
      "name": { "type": ["string", "null"] },
      "number": { "type": "integer", "default": "34534535435353" },
      "bytes": {
          "description": "Triple Slash Inline Comment: Will show up in JSON schema [BYTES]",
          "type": "string"
      },
      "favouriteDecimal": { "type": "number" },
      "posts": {
          "items": { "$ref": "Post" },
          "type": "array"
      },
      "predecessor": {
          "anyOf": [
              { "$ref": "User" },
              { "type": "null" }
          ]
      },
      "role": { "enum": ["USER", "ADMIN"], "type": "string", "default": "USER" },
      "successor": {
          "anyOf": [
              { "$ref": "User" },
              { "type": "null" }
          ]
      },
      "weight": { "type": ["integer", "null"] }
  },
  "type": "object"
}
```

So the following input will correctly be validated:

```javascript

    post = {
        id: 0,
        user:{
            id: 100,
        },
    },
    user = {
        id: 10,
        createdAt: '1997-07-16T19:20:30.45+01:00',
        email: 'jan@scharnow.city',
        biography: {
            bornIn: 'Scharnow',
        },
        is18: true,
        keywords: ['prisma2', 'json-schema', 'generator'],
        name: null,
        posts: [
            {
                id: 4,
            },
            {
                id: 20,
            },
        ],
        predecessor: {
            id: 10,
            email: 'horst@wassermann.de',
        },
        successor: null,
        role: 'USER',
        weight: 10.14,
    }
```

### MongoDB

The generator also takes care of composite types in MongoDB:

```prisma
datasource db {
    provider = "mongodb"
    url      = env("DATABASE_URL")
}

model User {
    id      String @id @default(auto()) @map("_id") @db.ObjectId
    photos  Photo[]
}

type Photo {
    height Int      @default(200)
    width  Int      @default(100)
    url    String
}
```

Output:

User.json
```JSON
{
    "properties": {
        "id": { "type": "string" },
        "photos": {
            "items": { "$ref": "#/definitions/Photo" },
            "type": "array"
        }
    },
  "type": "object"
}
```

Photo.json
```JSON
 {
     "properties": {
         "height": {
             "type": "integer",
             "default": 200
         },
         "width": {
             "type": "integer",
             "default": 100
         },
         "url": {
             "type": "string"
         }
     },
     "type": "object"
 }
```

### No relation fields

For some use cases, it might be useful to not include relation fields in the generated schema. This can be achieved by setting the `keepRelationFields` option to `"false"` and the `keepRelationScalarFields` option to `"true"`. For example if you want to use the generated schema to validate POST request object for instance, you might want to use this option.

```prisma
datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}

generator jsonSchema {
  provider                 = "prisma-generator-fastify-json-schema"
  keepRelationScalarFields = "true" // default is "false"
  keepRelationFields       = "false" // default is "true"
}

model User {
    id                  Int      @id @default(autoincrement())
    createdAt           DateTime @default(now())
    email               String   @unique
    weight              Float?
    is18                Boolean?
    name                String?
    number              BigInt   @default(34534535435353)
    favouriteDecimal    Decimal
    bytes               Bytes
    successorId         Int?     @unique
    successor           User?    @relation("BlogOwnerHistory", fields: [successorId], references: [id])
    predecessor         User?    @relation("BlogOwnerHistory")
    role                Role     @default(USER)
    posts               Post[]
    keywords            String[]
    biography           Json
}

model Post {
    id     Int   @id @default(autoincrement())
    user   User? @relation(fields: [userId], references: [id])
    userId Int?
}

enum Role {
    USER
    ADMIN
}
```

Output:

Post.json
```JSON
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer"
    },
    "userId": {
      "anyOf": [
        {
          "type": "integer"
        },
        {
          "type": "null"
        }
      ]
    }
  }
}
```
User.json
```JSON
{
  "type": "object",
  "properties": {
    "biography": {
      "type": [
        "number",
        "string",
        "boolean",
        "object",
        "array",
        "null"
      ]
    },
    "createdAt": {
      "format": "date-time",
      "type": "string"
    },
    "email": {
      "description": "Triple Slash Comment: Will show up in JSON schema [EMAIL]",
      "type": "string"
    },
    "id": {
      "type": "integer"
    },
    "is18": {
      "anyOf": [
        {
          "type": "boolean"
        },
        {
          "type": "null"
        }
      ]
    },
    "keywords": {
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "name": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "number": {
      "type": "integer",
      "default": "34534535435353"
    },
    "bytes": {
      "description": "Triple Slash Inline Comment: Will show up in JSON schema [BYTES]",
      "type": "string"
    },
    "favouriteDecimal": {
      "type": "number"
    },
    "role": {
      "enum": [
        "USER",
        "ADMIN"
      ],
      "type": "string",
      "default": "USER"
    },
    "successorId": {
      "anyOf": [
        {
          "type": "integer"
        },
        {
          "type": "null"
        }
      ]
    },
    "weight": {
      "anyOf": [
        {
          "type": "integer"
        },
        {
          "type": "null"
        }
      ]
    },
    "type": "object"
  }
}
```

### Generate export file
In order to generate an index file that imports and then exports all the schemas as an object, set the `generateExportFile` option to `"true"`. By default, the generated index file will export as a CommonJS module, if you want to generate an ES module, set the `exportAsEsModule` option to `"true"`.

```javascript
// index.ts with exportAsEsModule option set to "false"
const User = require('./User.json');
module.exports = { User };
```

```javascript
// index.ts with exportAsEsModule option set to "true"
import User from './User.json' with { type: 'json' };
export { User };
```

#### Use assert ES module import
When generating an index file as an ES module you can use `assert` or `with` to import the schemas. By default, the generated index file will use `with` to import the schemas. If you want to use `assert`, set the `useAssert` option to `"true"`.

```javascript
// index.ts with exportAsEsModule and useAssert options set to "true"
import User from './User.json' assert { type: 'json' };
```

#### Custom export file name
By default, the generated index file will be named `index.ts`. If you want to change the name of the generated index file, set the `exportFileName` option to the desired name.

```javascript
// schemas.ts with exportFileName option set to "schemas.ts"
import User from './User.json' with { type: 'json' };
export { User };
```


## License: MIT

Copyright (c) 2020 Valentin Palkovic

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

```

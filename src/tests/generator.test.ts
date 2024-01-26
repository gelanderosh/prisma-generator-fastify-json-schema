import { getDMMF } from '@prisma/internals'
import { transformDMMF } from '../generator/transformDMMF'

const datamodelPostGresQL = /* Prisma */ `
	datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

  model User {
    id               Int      @id @default(autoincrement())
    // Double Slash Comment: Will NOT show up in JSON schema
    createdAt        DateTime @default(now())
    /// Triple Slash Comment: Will show up in JSON schema [EMAIL]
    email            String   @unique
    number           BigInt   @default(34534535435353)
    favouriteDecimal Decimal  @default(22.222222)
    bytes            Bytes /// Triple Slash Inline Comment: Will show up in JSON schema [BYTES]
    weight           Float?   @default(333.33)
    is18             Boolean? @default(false)
    name             String?  @default("Bela B")
    successorId      Int?     @unique @default(123)
    successor        User?    @relation("BlogOwnerHistory", fields: [successorId], references: [id])
    predecessor      User?    @relation("BlogOwnerHistory")
    role             Role     @default(USER)
    posts            Post[]
    keywords         String[]
    biography        Json
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
`

const datamodelMongoDB = /* Prisma */ `
  datasource db {
    provider = "mongodb"
    url      = env("DATABASE_URL")
  }

  model User {
    id     String  @id @default(auto()) @map("_id") @db.ObjectId
    photos Photo[]
  }

  type Photo {
    height Int    @default(200)
    width  Int    @default(100)
    url    String
  }
`

describe('JSON Schema Generator', () => {
    describe('db postgresql', () => {
        it('returns JSON Schema for given models', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelPostGresQL })
            expect(transformDMMF(dmmf)).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            biography: {
                                type: [
                                    'number',
                                    'string',
                                    'boolean',
                                    'object',
                                    'array',
                                    'null',
                                ],
                            },
                            bytes: {
                                description:
                                    'Triple Slash Inline Comment: Will show up in JSON schema [BYTES]',
                                type: 'string',
                            },
                            createdAt: { format: 'date-time', type: 'string' },
                            email: {
                                description:
                                    'Triple Slash Comment: Will show up in JSON schema [EMAIL]',
                                type: 'string',
                            },
                            favouriteDecimal: {
                                default: 22.222222,
                                type: 'number',
                            },
                            id: { type: 'integer' },
                            is18: { default: false, type: ['boolean', 'null'] },
                            keywords: {
                                items: { type: 'string' },
                                type: 'array',
                            },
                            name: {
                                default: 'Bela B',
                                type: ['string', 'null'],
                            },
                            number: {
                                default: '34534535435353',
                                type: 'integer',
                            },
                            posts: { items: { $ref: 'Post' }, type: 'array' },
                            predecessor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            role: {
                                default: 'USER',
                                enum: ['USER', 'ADMIN'],
                                type: 'string',
                            },
                            successor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            weight: {
                                default: 333.33,
                                type: ['number', 'null'],
                            },
                        },
                        type: 'object',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: { type: 'integer' },
                            user: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                        },
                        type: 'object',
                    },
                ],
            ])
        })

        it('keeps relation scalar fields if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelPostGresQL })
            expect(
                transformDMMF(dmmf, { keepRelationScalarFields: 'true' }),
            ).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            biography: {
                                type: [
                                    'number',
                                    'string',
                                    'boolean',
                                    'object',
                                    'array',
                                    'null',
                                ],
                            },
                            bytes: {
                                description:
                                    'Triple Slash Inline Comment: Will show up in JSON schema [BYTES]',
                                type: 'string',
                            },
                            createdAt: { format: 'date-time', type: 'string' },
                            email: {
                                description:
                                    'Triple Slash Comment: Will show up in JSON schema [EMAIL]',
                                type: 'string',
                            },
                            favouriteDecimal: {
                                default: 22.222222,
                                type: 'number',
                            },
                            id: { type: 'integer' },
                            is18: { default: false, type: ['boolean', 'null'] },
                            keywords: {
                                items: { type: 'string' },
                                type: 'array',
                            },
                            name: {
                                default: 'Bela B',
                                type: ['string', 'null'],
                            },
                            number: {
                                default: '34534535435353',
                                type: 'integer',
                            },
                            posts: { items: { $ref: 'Post' }, type: 'array' },
                            predecessor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            role: {
                                default: 'USER',
                                enum: ['USER', 'ADMIN'],
                                type: 'string',
                            },
                            successor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            successorId: {
                                default: 123,
                                type: ['integer', 'null'],
                            },
                            weight: {
                                default: 333.33,
                                type: ['number', 'null'],
                            },
                        },
                        type: 'object',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: { type: 'integer' },
                            user: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            userId: { type: ['integer', 'null'] },
                        },
                        type: 'object',
                    },
                ],
            ])
        })

        it('keeps relation fields by default', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelPostGresQL })
            expect(transformDMMF(dmmf)).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            biography: {
                                type: [
                                    'number',
                                    'string',
                                    'boolean',
                                    'object',
                                    'array',
                                    'null',
                                ],
                            },
                            bytes: {
                                description:
                                    'Triple Slash Inline Comment: Will show up in JSON schema [BYTES]',
                                type: 'string',
                            },
                            createdAt: {
                                format: 'date-time',
                                type: 'string',
                            },
                            email: {
                                description:
                                    'Triple Slash Comment: Will show up in JSON schema [EMAIL]',
                                type: 'string',
                            },
                            favouriteDecimal: {
                                default: 22.222222,
                                type: 'number',
                            },
                            id: {
                                type: 'integer',
                            },
                            is18: {
                                default: false,
                                type: ['boolean', 'null'],
                            },
                            keywords: {
                                items: {
                                    type: 'string',
                                },
                                type: 'array',
                            },
                            name: {
                                default: 'Bela B',
                                type: ['string', 'null'],
                            },
                            number: {
                                default: '34534535435353',
                                type: 'integer',
                            },
                            posts: {
                                items: {
                                    $ref: 'Post',
                                },
                                type: 'array',
                            },
                            predecessor: {
                                anyOf: [
                                    {
                                        $ref: 'User',
                                    },
                                    {
                                        type: 'null',
                                    },
                                ],
                            },
                            role: {
                                default: 'USER',
                                enum: ['USER', 'ADMIN'],
                                type: 'string',
                            },
                            successor: {
                                anyOf: [
                                    {
                                        $ref: 'User',
                                    },
                                    {
                                        type: 'null',
                                    },
                                ],
                            },
                            weight: {
                                default: 333.33,
                                type: ['number', 'null'],
                            },
                        },
                        type: 'object',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: {
                                type: 'integer',
                            },
                            user: {
                                anyOf: [
                                    {
                                        $ref: 'User',
                                    },
                                    {
                                        type: 'null',
                                    },
                                ],
                            },
                        },
                        type: 'object',
                    },
                ],
            ])
        })

        it('skip relation fields if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelPostGresQL })
            expect(
                transformDMMF(dmmf, { keepRelationFields: 'false' }),
            ).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            biography: {
                                type: [
                                    'number',
                                    'string',
                                    'boolean',
                                    'object',
                                    'array',
                                    'null',
                                ],
                            },
                            bytes: {
                                description:
                                    'Triple Slash Inline Comment: Will show up in JSON schema [BYTES]',
                                type: 'string',
                            },
                            createdAt: {
                                format: 'date-time',
                                type: 'string',
                            },
                            email: {
                                description:
                                    'Triple Slash Comment: Will show up in JSON schema [EMAIL]',
                                type: 'string',
                            },
                            favouriteDecimal: {
                                default: 22.222222,
                                type: 'number',
                            },
                            id: {
                                type: 'integer',
                            },
                            is18: {
                                default: false,
                                type: ['boolean', 'null'],
                            },
                            keywords: {
                                items: {
                                    type: 'string',
                                },
                                type: 'array',
                            },
                            name: {
                                default: 'Bela B',
                                type: ['string', 'null'],
                            },
                            number: {
                                default: '34534535435353',
                                type: 'integer',
                            },
                            role: {
                                default: 'USER',
                                enum: ['USER', 'ADMIN'],
                                type: 'string',
                            },
                            weight: {
                                default: 333.33,
                                type: ['number', 'null'],
                            },
                        },
                        type: 'object',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: {
                                type: 'integer',
                            },
                        },
                        type: 'object',
                    },
                ],
            ])
        })

        it('skip relation fields and keep relation scalar fields if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelPostGresQL })
            expect(
                transformDMMF(dmmf, {
                    keepRelationFields: 'false',
                    keepRelationScalarFields: 'true',
                }),
            ).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            biography: {
                                type: [
                                    'number',
                                    'string',
                                    'boolean',
                                    'object',
                                    'array',
                                    'null',
                                ],
                            },
                            bytes: {
                                description:
                                    'Triple Slash Inline Comment: Will show up in JSON schema [BYTES]',
                                type: 'string',
                            },
                            createdAt: { format: 'date-time', type: 'string' },
                            email: {
                                description:
                                    'Triple Slash Comment: Will show up in JSON schema [EMAIL]',
                                type: 'string',
                            },
                            favouriteDecimal: {
                                default: 22.222222,
                                type: 'number',
                            },
                            id: { type: 'integer' },
                            is18: { default: false, type: ['boolean', 'null'] },
                            keywords: {
                                items: { type: 'string' },
                                type: 'array',
                            },
                            name: {
                                default: 'Bela B',
                                type: ['string', 'null'],
                            },
                            number: {
                                default: '34534535435353',
                                type: 'integer',
                            },
                            role: {
                                default: 'USER',
                                enum: ['USER', 'ADMIN'],
                                type: 'string',
                            },
                            successorId: {
                                default: 123,
                                type: ['integer', 'null'],
                            },
                            weight: {
                                default: 333.33,
                                type: ['number', 'null'],
                            },
                        },
                        type: 'object',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: { type: 'integer' },
                            userId: { type: ['integer', 'null'] },
                        },
                        type: 'object',
                    },
                ],
            ])
        })

        it('adds required field if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelPostGresQL })
            expect(
                transformDMMF(dmmf, { includeRequiredFields: 'true' }),
            ).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            biography: {
                                type: [
                                    'number',
                                    'string',
                                    'boolean',
                                    'object',
                                    'array',
                                    'null',
                                ],
                            },
                            bytes: {
                                description:
                                    'Triple Slash Inline Comment: Will show up in JSON schema [BYTES]',
                                type: 'string',
                            },
                            createdAt: { format: 'date-time', type: 'string' },
                            email: {
                                description:
                                    'Triple Slash Comment: Will show up in JSON schema [EMAIL]',
                                type: 'string',
                            },
                            favouriteDecimal: {
                                default: 22.222222,
                                type: 'number',
                            },
                            id: { type: 'integer' },
                            is18: { default: false, type: ['boolean', 'null'] },
                            keywords: {
                                items: { type: 'string' },
                                type: 'array',
                            },
                            name: {
                                default: 'Bela B',
                                type: ['string', 'null'],
                            },
                            number: {
                                default: '34534535435353',
                                type: 'integer',
                            },
                            posts: { items: { $ref: 'Post' }, type: 'array' },
                            predecessor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            role: {
                                default: 'USER',
                                enum: ['USER', 'ADMIN'],
                                type: 'string',
                            },
                            successor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            weight: {
                                default: 333.33,
                                type: ['number', 'null'],
                            },
                        },
                        required: ['email', 'bytes', 'keywords', 'biography'],
                        type: 'object',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: { type: 'integer' },
                            user: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                        },
                        required: [],
                        type: 'object',
                    },
                ],
            ])
        })

        it('adds original type if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelPostGresQL })
            expect(
                transformDMMF(dmmf, { persistOriginalType: 'true' }),
            ).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            biography: {
                                originalType: 'Json',
                                type: [
                                    'number',
                                    'string',
                                    'boolean',
                                    'object',
                                    'array',
                                    'null',
                                ],
                            },
                            bytes: {
                                description:
                                    'Triple Slash Inline Comment: Will show up in JSON schema [BYTES]',
                                originalType: 'Bytes',
                                type: 'string',
                            },
                            createdAt: {
                                format: 'date-time',
                                originalType: 'DateTime',
                                type: 'string',
                            },
                            email: {
                                description:
                                    'Triple Slash Comment: Will show up in JSON schema [EMAIL]',
                                originalType: 'String',
                                type: 'string',
                            },
                            favouriteDecimal: {
                                default: 22.222222,
                                originalType: 'Decimal',
                                type: 'number',
                            },
                            id: { originalType: 'Int', type: 'integer' },
                            is18: {
                                default: false,
                                originalType: 'Boolean',
                                type: ['boolean', 'null'],
                            },
                            keywords: {
                                items: { type: 'string' },
                                originalType: 'String',
                                type: 'array',
                            },
                            name: {
                                default: 'Bela B',
                                originalType: 'String',
                                type: ['string', 'null'],
                            },
                            number: {
                                default: '34534535435353',
                                originalType: 'BigInt',
                                type: 'integer',
                            },
                            posts: {
                                items: { $ref: 'Post' },
                                originalType: 'Post',
                                type: 'array',
                            },
                            predecessor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                                originalType: 'User',
                            },
                            role: {
                                default: 'USER',
                                enum: ['USER', 'ADMIN'],
                                originalType: 'Role',
                                type: 'string',
                            },
                            successor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                                originalType: 'User',
                            },
                            weight: {
                                default: 333.33,
                                originalType: 'Float',
                                type: ['number', 'null'],
                            },
                        },
                        type: 'object',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: { originalType: 'Int', type: 'integer' },
                            user: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                                originalType: 'User',
                            },
                        },
                        type: 'object',
                    },
                ],
            ])
        })

        it('force use anyOf for union types if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelPostGresQL })
            expect(transformDMMF(dmmf, { forceAnyOf: 'true' })).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            biography: {
                                anyOf: [
                                    { type: 'number' },
                                    { type: 'string' },
                                    { type: 'boolean' },
                                    { type: 'object' },
                                    { type: 'array' },
                                    { type: 'null' },
                                ],
                            },
                            bytes: {
                                description:
                                    'Triple Slash Inline Comment: Will show up in JSON schema [BYTES]',
                                type: 'string',
                            },
                            createdAt: { format: 'date-time', type: 'string' },
                            email: {
                                description:
                                    'Triple Slash Comment: Will show up in JSON schema [EMAIL]',
                                type: 'string',
                            },
                            favouriteDecimal: {
                                default: 22.222222,
                                type: 'number',
                            },
                            id: { type: 'integer' },
                            is18: {
                                anyOf: [{ type: 'boolean' }, { type: 'null' }],
                                default: false,
                            },
                            keywords: {
                                items: { type: 'string' },
                                type: 'array',
                            },
                            name: {
                                anyOf: [{ type: 'string' }, { type: 'null' }],
                                default: 'Bela B',
                            },
                            number: {
                                default: '34534535435353',
                                type: 'integer',
                            },
                            posts: { items: { $ref: 'Post' }, type: 'array' },
                            predecessor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            role: {
                                default: 'USER',
                                enum: ['USER', 'ADMIN'],
                                type: 'string',
                            },
                            successor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            weight: {
                                anyOf: [{ type: 'number' }, { type: 'null' }],
                                default: 333.33,
                            },
                        },
                        type: 'object',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: { type: 'integer' },
                            user: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                        },
                        type: 'object',
                    },
                ],
            ])
        })

        it('force not using anyOf for union types if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelPostGresQL })
            expect(transformDMMF(dmmf, { forceAnyOf: 'false' })).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            biography: {
                                type: [
                                    'number',
                                    'string',
                                    'boolean',
                                    'object',
                                    'array',
                                    'null',
                                ],
                            },
                            bytes: {
                                description:
                                    'Triple Slash Inline Comment: Will show up in JSON schema [BYTES]',
                                type: 'string',
                            },
                            createdAt: { format: 'date-time', type: 'string' },
                            email: {
                                description:
                                    'Triple Slash Comment: Will show up in JSON schema [EMAIL]',
                                type: 'string',
                            },
                            favouriteDecimal: {
                                default: 22.222222,
                                type: 'number',
                            },
                            id: { type: 'integer' },
                            is18: { default: false, type: ['boolean', 'null'] },
                            keywords: {
                                items: { type: 'string' },
                                type: 'array',
                            },
                            name: {
                                default: 'Bela B',
                                type: ['string', 'null'],
                            },
                            number: {
                                default: '34534535435353',
                                type: 'integer',
                            },
                            posts: { items: { $ref: 'Post' }, type: 'array' },
                            predecessor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            role: {
                                default: 'USER',
                                enum: ['USER', 'ADMIN'],
                                type: 'string',
                            },
                            successor: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                            weight: {
                                default: 333.33,
                                type: ['number', 'null'],
                            },
                        },
                        type: 'object',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: { type: 'integer' },
                            user: {
                                anyOf: [{ $ref: 'User' }, { type: 'null' }],
                            },
                        },
                        type: 'object',
                    },
                ],
            ])
        })
    })

    describe('db mongodb', () => {
        it('returns JSON schema for given models', async () => {
            const dmmf = await getDMMF({ datamodel: datamodelMongoDB })
            expect(transformDMMF(dmmf)).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            id: { type: 'string' },
                            photos: { items: { $ref: 'Photo' }, type: 'array' },
                        },
                        type: 'object',
                    },
                ],
                [
                    'Photo',
                    {
                        $id: 'Photo',
                        $schema: 'http://json-schema.org/draft-07/schema#',
                        properties: {
                            height: { default: 200, type: 'integer' },
                            url: { type: 'string' },
                            width: { default: 100, type: 'integer' },
                        },
                        type: 'object',
                    },
                ],
            ])
        })
    })
})

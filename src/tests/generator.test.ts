import { getDMMF } from '@prisma/internals'
import { transformDMMF } from '../generator/transformDMMF'

const datamodel = /* Prisma */ `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  email       String   @unique
  weight      Float?
  is18        Boolean?
  name        String?
  successorId Int?     @unique
  successor   User?    @relation("BlogOwnerHistory", fields: [successorId], references: [id])
  predecessor User?    @relation("BlogOwnerHistory")
  role        Role     @default(USER)
  posts       Post[]
  keywords    String[]
  biography   Json
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

describe('JSON Schema Generator', () => {
    describe('db postgresql', () => {
        it('returns JSON Schema for given models', async () => {
            const dmmf = await getDMMF({ datamodel: datamodel })
            expect(transformDMMF(dmmf)).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                },
                                weight: {
                                    type: ['number', 'null'],
                                },
                                is18: {
                                    type: ['boolean', 'null'],
                                },
                                name: {
                                    type: ['string', 'null'],
                                },
                                role: {
                                    type: 'string',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
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
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                },
                                weight: {
                                    type: ['number', 'null'],
                                },
                                is18: {
                                    type: ['boolean', 'null'],
                                },
                                name: {
                                    type: ['string', 'null'],
                                },
                                role: {
                                    type: 'string',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
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
                                required: ['email', 'keywords', 'biography'],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    createdAt: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    email: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    weight: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    is18: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    name: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    role: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    keywords: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    biography: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                    createdAt: {
                                        type: 'boolean',
                                    },
                                    email: {
                                        type: 'boolean',
                                    },
                                    weight: {
                                        type: 'boolean',
                                    },
                                    is18: {
                                        type: 'boolean',
                                    },
                                    name: {
                                        type: 'boolean',
                                    },
                                    role: {
                                        type: 'boolean',
                                    },
                                    keywords: {
                                        type: 'boolean',
                                    },
                                    biography: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                        createdAt: {
                                            type: 'boolean',
                                        },
                                        email: {
                                            type: 'boolean',
                                        },
                                        weight: {
                                            type: 'boolean',
                                        },
                                        is18: {
                                            type: 'boolean',
                                        },
                                        name: {
                                            type: 'boolean',
                                        },
                                        role: {
                                            type: 'boolean',
                                        },
                                        keywords: {
                                            type: 'boolean',
                                        },
                                        biography: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                },
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                },
                                required: [],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
            ])
        })

        it('keeps relation scalar fields if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodel })
            expect(
                transformDMMF(dmmf, { keepRelationScalarFields: 'true' }),
            ).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                },
                                weight: {
                                    type: ['number', 'null'],
                                },
                                is18: {
                                    type: ['boolean', 'null'],
                                },
                                name: {
                                    type: ['string', 'null'],
                                },
                                successorId: {
                                    type: ['integer', 'null'],
                                },
                                role: {
                                    type: 'string',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
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
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                },
                                weight: {
                                    type: ['number', 'null'],
                                },
                                is18: {
                                    type: ['boolean', 'null'],
                                },
                                name: {
                                    type: ['string', 'null'],
                                },
                                successorId: {
                                    type: ['integer', 'null'],
                                },
                                role: {
                                    type: 'string',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
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
                                required: ['email', 'keywords', 'biography'],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    createdAt: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    email: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    weight: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    is18: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    name: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    successorId: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    role: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    keywords: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    biography: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                    createdAt: {
                                        type: 'boolean',
                                    },
                                    email: {
                                        type: 'boolean',
                                    },
                                    weight: {
                                        type: 'boolean',
                                    },
                                    is18: {
                                        type: 'boolean',
                                    },
                                    name: {
                                        type: 'boolean',
                                    },
                                    successorId: {
                                        type: 'boolean',
                                    },
                                    role: {
                                        type: 'boolean',
                                    },
                                    keywords: {
                                        type: 'boolean',
                                    },
                                    biography: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                        createdAt: {
                                            type: 'boolean',
                                        },
                                        email: {
                                            type: 'boolean',
                                        },
                                        weight: {
                                            type: 'boolean',
                                        },
                                        is18: {
                                            type: 'boolean',
                                        },
                                        name: {
                                            type: 'boolean',
                                        },
                                        successorId: {
                                            type: 'boolean',
                                        },
                                        role: {
                                            type: 'boolean',
                                        },
                                        keywords: {
                                            type: 'boolean',
                                        },
                                        biography: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                },
                                userId: {
                                    type: ['integer', 'null'],
                                },
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                },
                                userId: {
                                    type: ['integer', 'null'],
                                },
                                required: [],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    userId: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                    userId: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                        userId: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
            ])
        })

        it('adds original type if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodel })
            expect(
                transformDMMF(dmmf, { persistOriginalType: 'true' }),
            ).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                    originalType: 'Int',
                                },
                                createdAt: {
                                    type: 'string',
                                    originalType: 'DateTime',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                    originalType: 'String',
                                },
                                weight: {
                                    type: ['number', 'null'],
                                    originalType: 'Float',
                                },
                                is18: {
                                    type: ['boolean', 'null'],
                                    originalType: 'Boolean',
                                },
                                name: {
                                    type: ['string', 'null'],
                                    originalType: 'String',
                                },
                                role: {
                                    type: 'string',
                                    originalType: 'Role',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    originalType: 'String',
                                    items: {
                                        type: 'string',
                                    },
                                },
                                biography: {
                                    type: [
                                        'number',
                                        'string',
                                        'boolean',
                                        'object',
                                        'array',
                                        'null',
                                    ],
                                    originalType: 'Json',
                                },
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                    originalType: 'Int',
                                },
                                createdAt: {
                                    type: 'string',
                                    originalType: 'DateTime',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                    originalType: 'String',
                                },
                                weight: {
                                    type: ['number', 'null'],
                                    originalType: 'Float',
                                },
                                is18: {
                                    type: ['boolean', 'null'],
                                    originalType: 'Boolean',
                                },
                                name: {
                                    type: ['string', 'null'],
                                    originalType: 'String',
                                },
                                role: {
                                    type: 'string',
                                    originalType: 'Role',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    originalType: 'String',
                                    items: {
                                        type: 'string',
                                    },
                                },
                                biography: {
                                    type: [
                                        'number',
                                        'string',
                                        'boolean',
                                        'object',
                                        'array',
                                        'null',
                                    ],
                                    originalType: 'Json',
                                },
                                required: ['email', 'keywords', 'biography'],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    createdAt: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    email: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    weight: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    is18: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    name: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    role: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    keywords: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    biography: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                    createdAt: {
                                        type: 'boolean',
                                    },
                                    email: {
                                        type: 'boolean',
                                    },
                                    weight: {
                                        type: 'boolean',
                                    },
                                    is18: {
                                        type: 'boolean',
                                    },
                                    name: {
                                        type: 'boolean',
                                    },
                                    role: {
                                        type: 'boolean',
                                    },
                                    keywords: {
                                        type: 'boolean',
                                    },
                                    biography: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                        createdAt: {
                                            type: 'boolean',
                                        },
                                        email: {
                                            type: 'boolean',
                                        },
                                        weight: {
                                            type: 'boolean',
                                        },
                                        is18: {
                                            type: 'boolean',
                                        },
                                        name: {
                                            type: 'boolean',
                                        },
                                        role: {
                                            type: 'boolean',
                                        },
                                        keywords: {
                                            type: 'boolean',
                                        },
                                        biography: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                    originalType: 'Int',
                                },
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                    originalType: 'Int',
                                },
                                required: [],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
            ])
        })

        it('force use anyOf for union types if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodel })
            expect(transformDMMF(dmmf, { forceAnyOf: 'true' })).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                },
                                weight: {
                                    anyOf: [
                                        {
                                            type: 'number',
                                        },
                                        {
                                            type: 'null',
                                        },
                                    ],
                                },
                                is18: {
                                    anyOf: [
                                        {
                                            type: 'boolean',
                                        },
                                        {
                                            type: 'null',
                                        },
                                    ],
                                },
                                name: {
                                    anyOf: [
                                        {
                                            type: 'string',
                                        },
                                        {
                                            type: 'null',
                                        },
                                    ],
                                },
                                role: {
                                    type: 'string',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
                                biography: {
                                    anyOf: [
                                        {
                                            type: 'number',
                                        },
                                        {
                                            type: 'string',
                                        },
                                        {
                                            type: 'boolean',
                                        },
                                        {
                                            type: 'object',
                                        },
                                        {
                                            type: 'array',
                                        },
                                        {
                                            type: 'null',
                                        },
                                    ],
                                },
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                },
                                weight: {
                                    anyOf: [
                                        {
                                            type: 'number',
                                        },
                                        {
                                            type: 'null',
                                        },
                                    ],
                                },
                                is18: {
                                    anyOf: [
                                        {
                                            type: 'boolean',
                                        },
                                        {
                                            type: 'null',
                                        },
                                    ],
                                },
                                name: {
                                    anyOf: [
                                        {
                                            type: 'string',
                                        },
                                        {
                                            type: 'null',
                                        },
                                    ],
                                },
                                role: {
                                    type: 'string',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
                                biography: {
                                    anyOf: [
                                        {
                                            type: 'number',
                                        },
                                        {
                                            type: 'string',
                                        },
                                        {
                                            type: 'boolean',
                                        },
                                        {
                                            type: 'object',
                                        },
                                        {
                                            type: 'array',
                                        },
                                        {
                                            type: 'null',
                                        },
                                    ],
                                },
                                required: ['email', 'keywords', 'biography'],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    createdAt: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    email: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    weight: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    is18: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    name: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    role: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    keywords: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    biography: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                    createdAt: {
                                        type: 'boolean',
                                    },
                                    email: {
                                        type: 'boolean',
                                    },
                                    weight: {
                                        type: 'boolean',
                                    },
                                    is18: {
                                        type: 'boolean',
                                    },
                                    name: {
                                        type: 'boolean',
                                    },
                                    role: {
                                        type: 'boolean',
                                    },
                                    keywords: {
                                        type: 'boolean',
                                    },
                                    biography: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                        createdAt: {
                                            type: 'boolean',
                                        },
                                        email: {
                                            type: 'boolean',
                                        },
                                        weight: {
                                            type: 'boolean',
                                        },
                                        is18: {
                                            type: 'boolean',
                                        },
                                        name: {
                                            type: 'boolean',
                                        },
                                        role: {
                                            type: 'boolean',
                                        },
                                        keywords: {
                                            type: 'boolean',
                                        },
                                        biography: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                },
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                },
                                required: [],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
            ])
        })

        it('force not using anyOf for union types if requested', async () => {
            const dmmf = await getDMMF({ datamodel: datamodel })
            expect(transformDMMF(dmmf, { forceAnyOf: 'false' })).toEqual([
                [
                    'User',
                    {
                        $id: 'User',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                },
                                weight: {
                                    type: ['number', 'null'],
                                },
                                is18: {
                                    type: ['boolean', 'null'],
                                },
                                name: {
                                    type: ['string', 'null'],
                                },
                                role: {
                                    type: 'string',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
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
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                },
                                email: {
                                    type: 'string',
                                },
                                weight: {
                                    type: ['number', 'null'],
                                },
                                is18: {
                                    type: ['boolean', 'null'],
                                },
                                name: {
                                    type: ['string', 'null'],
                                },
                                role: {
                                    type: 'string',
                                    default: 'USER',
                                    enum: ['USER', 'ADMIN'],
                                },
                                keywords: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                    },
                                },
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
                                required: ['email', 'keywords', 'biography'],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    createdAt: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    email: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    weight: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    is18: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    name: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    role: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    keywords: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                    biography: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                    createdAt: {
                                        type: 'boolean',
                                    },
                                    email: {
                                        type: 'boolean',
                                    },
                                    weight: {
                                        type: 'boolean',
                                    },
                                    is18: {
                                        type: 'boolean',
                                    },
                                    name: {
                                        type: 'boolean',
                                    },
                                    role: {
                                        type: 'boolean',
                                    },
                                    keywords: {
                                        type: 'boolean',
                                    },
                                    biography: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                        createdAt: {
                                            type: 'boolean',
                                        },
                                        email: {
                                            type: 'boolean',
                                        },
                                        weight: {
                                            type: 'boolean',
                                        },
                                        is18: {
                                            type: 'boolean',
                                        },
                                        name: {
                                            type: 'boolean',
                                        },
                                        role: {
                                            type: 'boolean',
                                        },
                                        keywords: {
                                            type: 'boolean',
                                        },
                                        biography: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
                [
                    'Post',
                    {
                        $id: 'Post',
                        type: 'object',
                        properties: {
                            withoutRequired: {
                                id: {
                                    type: 'integer',
                                },
                            },
                            withRequired: {
                                id: {
                                    type: 'integer',
                                },
                                required: [],
                            },
                            where: {
                                type: 'object',
                                properties: {
                                    id: {
                                        allOf: [
                                            {
                                                $ref: '#/definitions/comparisonOperators',
                                            },
                                            {
                                                $ref: '#/definitions/logicalOperators',
                                            },
                                        ],
                                    },
                                },
                            },
                            select: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'boolean',
                                    },
                                },
                            },
                            forInclude: {
                                type: 'object',
                                properties: {
                                    select: {
                                        id: {
                                            type: 'boolean',
                                        },
                                    },
                                    where: {
                                        $ref: '#/properties/where',
                                    },
                                },
                            },
                        },
                        definitions: {
                            comparisonOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                                        {
                                            anyOf: [
                                                {
                                                    type: 'string',
                                                },
                                                {
                                                    type: 'number',
                                                },
                                                {
                                                    type: 'null',
                                                },
                                            ],
                                        },
                                },
                                properties: {
                                    mode: {
                                        anyOf: [
                                            {
                                                type: 'string',
                                                enum: ['insensitive'],
                                            },
                                            {
                                                type: 'null',
                                            },
                                        ],
                                    },
                                },
                            },
                            logicalOperators: {
                                type: 'object',
                                patternProperties: {
                                    '^(AND|OR|NOT)$': {
                                        type: 'array',
                                        items: {
                                            $ref: '#/properties/where',
                                        },
                                    },
                                },
                            },
                        },
                        $schema: 'http://json-schema.org/draft-07/schema#',
                    },
                ],
            ])
        })
    })
})

import { DMMF } from '@prisma/generator-helper'
import { JSONSchema7Definition } from 'json-schema'
import { getJSONSchemaProperty } from './properties'
import { DefinitionMap, ModelMetaData, TransformOptions } from './types'

function getRelationScalarFields(model: DMMF.Model): string[] {
    return model.fields.flatMap((field) => field.relationFromFields || [])
}

const getRelationFieldNames = (model: DMMF.Model): string[] => {
    return model.fields
        .filter((field) => field.relationFromFields || field.relationToFields)
        .map((field) => field.name)
}

export function getJSONSchemaModel(
    modelMetaData: ModelMetaData,
    transformOptions: TransformOptions,
) {
    return (model: DMMF.Model): DefinitionMap => {
        const definitionPropsMap = model.fields.map(
            getJSONSchemaProperty(modelMetaData, transformOptions),
        )

        const propertiesMap = definitionPropsMap.map(
            ([name, definition]) => [name, definition] as DefinitionMap,
        )
        const relationScalarFields = getRelationScalarFields(model)
        const relationFieldNames = getRelationFieldNames(model)
        const propertiesWithoutRelationScalars = propertiesMap.filter(
            (prop) => !relationScalarFields.includes(prop[0]),
        )
        let builtProperties: JSONSchema7Definition = {}

        const definition: JSONSchema7Definition = {}
        definition.type = 'object'
        definition.properties = {}

        if (transformOptions.keepRelationScalarFields === 'true') {
            builtProperties = Object.fromEntries(
                propertiesMap.filter(
                    (prop) => !relationFieldNames.includes(prop[0]),
                ),
            )
        } else {
            builtProperties = Object.fromEntries(
                propertiesWithoutRelationScalars.filter(
                    (prop) => !relationFieldNames.includes(prop[0]),
                ),
            )
        }

        const required = definitionPropsMap.reduce(
            (filtered: string[], [name, , fieldMetaData]) => {
                if (
                    fieldMetaData.required &&
                    fieldMetaData.isScalar &&
                    !fieldMetaData.hasDefaultValue
                ) {
                    filtered.push(name)
                }
                return filtered
            },
            [],
        )

        definition.properties.withoutRequired = {
            ...builtProperties,
        }
        definition.properties.withRequired = {
            ...builtProperties,
            required,
        }
        definition.properties.where = {
            type: 'object',
            properties: Object.keys(builtProperties).reduce(
                (acc: Record<string, JSONSchema7Definition>, key) => {
                    acc[key] = {
                        allOf: [
                            {
                                $ref: `#/definitions/comparisonOperators`,
                            },
                            {
                                $ref: `#/definitions/logicalOperators`,
                            },
                        ],
                    }
                    return acc
                },
                {},
            ),
        }
        definition.properties.select = {
            type: 'object',
            properties: Object.keys(builtProperties).reduce(
                (acc: Record<string, JSONSchema7Definition>, key) => {
                    acc[key] = {
                        type: 'boolean',
                    }
                    return acc
                },
                {},
            ),
        }
        definition.properties.forInclude = {
            type: 'object',
            properties: {
                select: Object.keys(builtProperties).reduce(
                    (acc: Record<string, JSONSchema7Definition>, key) => {
                        acc[key] = {
                            type: 'boolean',
                        }
                        return acc
                    },
                    {},
                ),
                where: { $ref: `#/properties/where` },
            },
        }

        definition.definitions = {
            comparisonOperators: {
                type: 'object',
                patternProperties: {
                    '^(equals|not|in|notIn|lt|gt|lte|gte|contains|search|mode|startsWith|endsWith)$':
                        {
                            anyOf: [
                                { type: 'string' },
                                { type: 'number' },
                                { type: 'null' },
                            ],
                        },
                },
                properties: {
                    mode: {
                        anyOf: [
                            { type: 'string', enum: ['insensitive'] },
                            { type: 'null' },
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
        }

        return [model.name, definition]
    }
}

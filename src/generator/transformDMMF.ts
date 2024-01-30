import type { DMMF } from '@prisma/generator-helper'
import type { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { DefinitionMap, TransformOptions } from './types'

import { getInitialJSON } from './jsonSchema'
import { getJSONSchemaModel } from './model'

export function transformDMMF(
    dmmf: DMMF.Document,
    transformOptions: TransformOptions = {},
): Array<[string, JSONSchema7]> {
    // TODO: Remove default values as soon as prisma version < 3.10.0 doesn't have to be supported anymore
    const { models = [], enums = [], types = [] } = dmmf.datamodel
    const initialJSON = getInitialJSON()

    const modelDefinitionsMap: DefinitionMap[] = []
    const typeDefinitionsMap: DefinitionMap[] = []

    const requiredSchemaGetter = getJSONSchemaModel(
        { enums },
        { ...transformOptions, includeRequiredFields: 'true' },
    )
    const notRequiredSchemaGetter = getJSONSchemaModel(
        { enums },
        { ...transformOptions, includeRequiredFields: 'false' },
    )

    for (const model of models) {
        let withRequired: JSONSchema7Definition = {}
        let withoutRequired: JSONSchema7Definition = {}
        if (!(transformOptions.onlyWithoutRequired === 'true')) {
            ;[, withRequired] = requiredSchemaGetter(model)
        }
        if (!(transformOptions.onlyWithRequired === 'true')) {
            ;[, withoutRequired] = notRequiredSchemaGetter(model)
        }
        if (
            !(transformOptions.onlyWithRequired === 'true') &&
            !(transformOptions.onlyWithoutRequired === 'true')
        ) {
            modelDefinitionsMap.push([
                model.name,
                {
                    type: 'object',
                    properties: {
                        withRequired: withRequired,
                        withoutRequired: withoutRequired,
                    },
                },
            ])
        } else {
            modelDefinitionsMap.push([
                model.name,
                transformOptions.onlyWithRequired === 'true'
                    ? withRequired
                    : withoutRequired,
            ])
        }
    }
    for (const type of types) {
        let withRequired: JSONSchema7Definition = {}
        let withoutRequired: JSONSchema7Definition = {}
        if (!(transformOptions.onlyWithoutRequired === 'true')) {
            ;[, withRequired] = requiredSchemaGetter(type)
        }
        if (!(transformOptions.onlyWithRequired === 'true')) {
            ;[, withoutRequired] = notRequiredSchemaGetter(type)
        }
        if (
            !(transformOptions.onlyWithRequired === 'true') &&
            !(transformOptions.onlyWithoutRequired === 'true')
        ) {
            typeDefinitionsMap.push([
                type.name,
                {
                    type: 'object',
                    properties: {
                        withRequired: withRequired,
                        withoutRequired: withoutRequired,
                    },
                },
            ])
        } else {
            typeDefinitionsMap.push([
                type.name,
                transformOptions.onlyWithRequired === 'true'
                    ? withRequired
                    : withoutRequired,
            ])
        }
    }

    const definitions: DefinitionMap[] = [
        ...modelDefinitionsMap,
        ...typeDefinitionsMap,
    ]

    return definitions
        .map(([name, value]): [string, JSONSchema7] | undefined => {
            if (typeof value === 'object') {
                return [
                    name,
                    {
                        $id: `${name}`,
                        ...value,
                        ...initialJSON,
                    },
                ]
            }
        })
        .filter((el): el is [string, JSONSchema7] => Boolean(el))
}

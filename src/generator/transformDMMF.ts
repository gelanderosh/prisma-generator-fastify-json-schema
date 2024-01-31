import type { DMMF } from '@prisma/generator-helper'
import type { JSONSchema7 } from 'json-schema'
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

    const modelDefinitionsMap: DefinitionMap[] = models.map(
        getJSONSchemaModel({ enums }, transformOptions),
    )
    const typeDefinitionsMap: DefinitionMap[] = types.map(
        getJSONSchemaModel({ enums }, transformOptions),
    )

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

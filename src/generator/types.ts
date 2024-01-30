import { DMMF } from '@prisma/generator-helper'
import { JSONSchema7Definition } from 'json-schema'

export interface PropertyMetaData {
    required: boolean
    hasDefaultValue: boolean
    isScalar: boolean
}

export interface ModelMetaData {
    enums: DMMF.DatamodelEnum[]
}

export type DefinitionMap = [name: string, definition: JSONSchema7Definition]
export type PropertyMap = [...DefinitionMap, PropertyMetaData]

export interface TransformOptions {
    onlyWithoutRequired?: 'true' | 'false'
    onlyWithRequired?: 'true' | 'false'
    includeRequiredFields?: 'true' | 'false'
    keepRelationScalarFields?: 'true' | 'false'
    keepRelationFields?: 'true' | 'false'
    schemaId?: string
    persistOriginalType?: 'true' | 'false'
    forceAnyOf?: 'true' | 'false'
    ignoreDefaults?: 'true' | 'false'
    generateExportFile?: 'true' | 'false'
    exportFileName?: string
    exportAsEsModule?: 'true' | 'false'
    useAssert?: 'true' | 'false'
}

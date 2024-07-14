export type CRUDEngineHttpMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type CRUDSupportedVariablesTypes =
  | 'ObjectId'
  | 'System'
  | 'Request'
  | 'Steps';

export const CRUDSupportedVariablesInfo: Record<
  CRUDSupportedVariablesTypes,
  { prefix: string; suffix: string }
> = {
  ObjectId: {
    prefix: 'ObjectId(',
    suffix: ')',
  },
  System: {
    prefix: '${System.var.',
    suffix: '}',
  },
  Request: {
    prefix: '${request.body',
    suffix: '}',
  },
  Steps: {
    prefix: '${steps',
    suffix: '}',
  },
};

export enum CRUDSystemVariables {
  UTCDateTime = 'UTCDateTime',
}

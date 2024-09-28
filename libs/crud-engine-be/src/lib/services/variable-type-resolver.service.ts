import { CoreEngineUnSupportedVariableTypeException, CRUDSupportedVariablesInfo, CRUDSupportedVariablesTypes } from "@api-assistant/crud-engine-core";

export class VariableTypeResolverService {

    private isRequestVariable(value: string) {
        return (
          value.startsWith(CRUDSupportedVariablesInfo.RequestBody.prefix) &&
          value.endsWith(CRUDSupportedVariablesInfo.RequestBody.suffix)
        );
    }
      
    private isSystemVariable(value: string) {
        return (
          value.startsWith(CRUDSupportedVariablesInfo.System.prefix) &&
          value.endsWith(CRUDSupportedVariablesInfo.System.suffix)
        );
      }
      
    private isObjectIdVariable(value: string) {
    return (
        value.startsWith(CRUDSupportedVariablesInfo.ObjectId.prefix) &&
        value.endsWith(CRUDSupportedVariablesInfo.ObjectId.suffix)
    );
    }
      
    private isStepVariable(value: string) {
        return (
            value.startsWith(CRUDSupportedVariablesInfo.Steps.prefix) &&
            value.endsWith(CRUDSupportedVariablesInfo.Steps.suffix)
        );
    }
      
    public resolve(
        value: string,
    ): CRUDSupportedVariablesTypes {
        if (this.isRequestVariable(value)) {
          return 'RequestBody';
        } else if (this.isSystemVariable(value)) {
          return 'System';
        } else if (this.isObjectIdVariable(value)) {
          return 'ObjectId';
        } else if (this.isStepVariable(value)) {
          return 'Steps';
        }
        throw new CoreEngineUnSupportedVariableTypeException(value);
      }
}
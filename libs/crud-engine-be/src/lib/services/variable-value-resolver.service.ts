import { Document, ObjectId } from 'mongodb';
import { Logger } from '@nestjs/common';
import { VariableTypeResolverService } from './variable-type-resolver.service';
import {
  CoreEngineInvalidVariablePathException,
  CoreEngineUnSupportedVariableTypeException,
  CRUDSupportedVariablesInfo,
  CRUDSystemVariables,
  PlaceholderDataSource,
} from '@api-assistant/crud-engine-core';

export class VariableValueResolver {
  private readonly logger = new Logger(VariableValueResolver.name);
  private readonly variableTypeResolverService: VariableTypeResolverService =
    new VariableTypeResolverService();

  private resolveRequestBodyVariable(value: string, inputBody: Document) {
    this.logger.log(`processing body placeholder ${value}`);
    const variableBodyPrefixLen =
      CRUDSupportedVariablesInfo.RequestBody.prefix.length;
    const valueKey: string = value.slice(
      variableBodyPrefixLen,
      value.length - 1
    );
    const valuePathSeperatedByPeriods = valueKey.split('.').slice(1);
    let valueObject = { ...inputBody };
    for (const key of valuePathSeperatedByPeriods) {
      if (!valueObject[key]) {
        throw new CoreEngineInvalidVariablePathException(value);
      }
      valueObject = valueObject[key];
    }
    this.logger.log(`processed body placeholder ${valueObject}`);
    return valueObject;
  }

  private resolveRequestParamsVariable(value: string, inputParams: Document) {
    this.logger.log(`processing param placeholder ${value}`);
    const variableParamPrefixLen =
      CRUDSupportedVariablesInfo.RequestPathParams.prefix.length;
    const valueKey: string = value.slice(
      variableParamPrefixLen,
      value.length - 1
    );
    this.logger.log(`processed param placeholder ${inputParams[valueKey]}`);
    return inputParams[valueKey];
  }

  private resolveRequestQueryVariable(value: string, inputParams: Document) {
    this.logger.log(`processing query placeholder ${value}`);
    const variableParamPrefixLen =
      CRUDSupportedVariablesInfo.RequestQueryParams.prefix.length;
    const valueKey: string = value.slice(
      variableParamPrefixLen,
      value.length - 1
    );
    this.logger.log(`processed query placeholder ${inputParams[valueKey]}`);
    return inputParams[valueKey];
  }

  private resolveSystemVariable(value: string) {
    this.logger.log(`processing system var placeholder ${value}`);
    const systemVariablePrefixLen =
      CRUDSupportedVariablesInfo.System.prefix.length;
    const systemVariableName: string = value.slice(
      systemVariablePrefixLen,
      value.length - 1
    );
    if (systemVariableName === CRUDSystemVariables.UTCDateTime) {
      return new Date();
    } else {
      throw new CoreEngineUnSupportedVariableTypeException(systemVariableName);
    }
  }

  private resolveObjectIdVariable(value: string) {
    this.logger.log(`processing object id placeholder ${value}`);
    const objectIdPrefixLen = CRUDSupportedVariablesInfo.ObjectId.prefix.length;
    const valueKey: string = value.slice(objectIdPrefixLen, value.length - 1);
    return new ObjectId(valueKey);
  }

  private resolveStepVariable(value: string, stepsInput: Array<Document>) {
    this.logger.log(`processing steps placeholder ${value}`);
    const stepVariablePrefixLen =
      CRUDSupportedVariablesInfo.Steps.prefix.length;
    const valueKey: string = value.slice(
      stepVariablePrefixLen,
      value.length - 1
    );
    const valuePathSeperatedByPeriods = valueKey.split('.').slice(1);
    let stepsInputObject: Document = stepsInput.slice();
    for (const key of valuePathSeperatedByPeriods) {
      if (!stepsInputObject[key as unknown as number]) {
        throw new CoreEngineInvalidVariablePathException(value);
      }
      stepsInputObject = stepsInputObject[key as unknown as number];
    }
    this.logger.log(`processed step placeholder ${stepsInputObject}`);
    return stepsInputObject as unknown;
  }

  public resolve(value: string, inputData: PlaceholderDataSource) {
    this.logger.log(
      `Resolving variable value ${value} with input data`,
      inputData
    );
    const type = this.variableTypeResolverService.resolve(value);
    this.logger.log(`Resolved variable ${value} type to ${type}`);
    switch (type) {
      case 'RequestBody': {
        const result = this.resolveRequestBodyVariable(
          value,
          inputData.requestBody
        );
        if (
          this.variableTypeResolverService.resolve(
            result as unknown as string
          ) === 'ObjectId'
        ) {
          return this.resolveObjectIdVariable(result as unknown as string);
        }
        return result;
      }
      case 'ObjectId': {
        return this.resolveObjectIdVariable(value);
      }
      case 'Steps': {
        return this.resolveStepVariable(value, inputData.crudSteps);
      }
      case 'System': {
        return this.resolveSystemVariable(value);
      }
      case 'RequestPathParams': {
        return this.resolveRequestParamsVariable(value, inputData.pathParams);
      }
      case 'RequestQueryParams': {
        return this.resolveRequestQueryVariable(value, inputData.queryParams);
      }
      default: {
        return value;
      }
    }
  }
}

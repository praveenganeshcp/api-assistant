import { Logger } from "@nestjs/common";
import { VariableValueResolver } from "./variable-value-resolver.service";
import { PlaceholderDataSource } from "@api-assistant/crud-engine-core";

export class VariableValuePopulaterService {

  private readonly logger = new Logger(VariableValuePopulaterService.name);
  private readonly variableValueResolver: VariableValueResolver = new VariableValueResolver();

    public replaceVariables(
        payloadWithPlaceHolderOrResolverValue: unknown,
        input: PlaceholderDataSource
      ): unknown {
        // handle array
        if (Array.isArray(payloadWithPlaceHolderOrResolverValue)) {
          this.logger.log(`found array type`, payloadWithPlaceHolderOrResolverValue)
          const replacedVariablesInArr: unknown[] = [];
          payloadWithPlaceHolderOrResolverValue.forEach((payloadArrayElement) => {
            const processedArrayEle = this.replaceVariables(
                payloadArrayElement,
                input
            );
            replacedVariablesInArr.push(processedArrayEle);
          });
          return replacedVariablesInArr;
        } 
        // handle object
        else if (typeof payloadWithPlaceHolderOrResolverValue === 'object') {
          this.logger.log(`found object type`, payloadWithPlaceHolderOrResolverValue)
          const replacedVariablesInObject: Record<string, unknown> = {};
          Object.keys(payloadWithPlaceHolderOrResolverValue ?? {}).forEach((key) => {
            const valueAtObjectKey = (payloadWithPlaceHolderOrResolverValue as any)?.[key]
            replacedVariablesInObject[key] = this.replaceVariables(valueAtObjectKey, input);
            this.logger.log(`processed ${key} value to`, replacedVariablesInObject[key]);
          });
          this.logger.log(`processed entire object`, replacedVariablesInObject)
          return replacedVariablesInObject;
        }
    
        const primitiveValue = payloadWithPlaceHolderOrResolverValue;
        if (typeof primitiveValue === 'string' && primitiveValue.startsWith('${') && primitiveValue.endsWith('}')) {
          this.logger.log(`found placeholder: ${payloadWithPlaceHolderOrResolverValue}`)
          const replacedValue = this.variableValueResolver.resolve(primitiveValue, input);
          this.logger.log(`resolved placeholder value: ${replacedValue}`)
          return replacedValue;
        }
        this.logger.log(`found primitive value ${primitiveValue} with type ${typeof primitiveValue}`);
        return primitiveValue;
      }
}
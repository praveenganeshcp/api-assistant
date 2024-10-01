import { ParamDataTypes } from "@api-assistant/crud-engine-core";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Injectable()
export class ParamsParserService {

    private readonly logger = new Logger(ParamsParserService.name);

    parse(input: Record<string, string>): Record<string, unknown> {
        const keys = Object.keys(input);
        this.logger.log('object to be parsed', input);
        const parsedResult: Record<string, unknown> = {}
        for(let key of keys) {
            const paramValue = input[key];
            key = key.substring(0, key.length);
            const [type, paramKey] = key.split('::')
            parsedResult[paramKey] = this.parseType(type as ParamDataTypes, paramValue)
        }
        this.logger.log('parsed object', parsedResult)
        return parsedResult;
    }

    private parseType(type: ParamDataTypes, value: unknown) {
        this.logger.log(`parsing type:${type} for value`, value);
        if(type === 'string') {
            return value;
        }
        else if(type === 'number') {
            try {
                return parseInt(value as string, 10);
            }
            catch(err) {
                throw new HttpException('cannot parse params to number', 400);
            }
        }
        else if(type === 'boolean') {
            try {
                if(value === 'true') {
                    return true;
                }
                else if(value === 'false') {
                    return false;
                }
                throw 'err';
            }
            catch(err) {
                throw new HttpException('cannot parse params to boolean', 400);
            }
        }
        else if(type === 'ObjectId') {
            try {
                return new ObjectId(value as string);

            }
            catch(err) {
                throw new HttpException('cannot parse params to ObjectId', 400);
            }
        }
        return value;
    }
}
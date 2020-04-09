import { TestServiceRequestType } from "./TestServiceEnum";

export interface ITestServiceRequest {
    Type: TestServiceRequestType
}

export interface ITestServiceResponse {
    Success: string;
    LanguageCode: string;
}

export interface ITestExternalServiceResponse {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ITestServices {
    serviceResponse1?: ITestServiceResponse;
    SampleService_1: () => void;
    serviceResponse2?: ITestServiceResponse;
    isLoading2: boolean;
    SampleService_2: () => void;
    serviceResponse3?: ITestServiceResponse;
    SampleService_3: () => void;
    AbortSample: () => void;
    AbortSampleLoading: boolean;
    ExternalService?: ITestExternalServiceResponse;
    CallExternalService: () => void;
    ExternalLoading: boolean;
}
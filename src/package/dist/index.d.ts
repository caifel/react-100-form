import { TResponse, TValidate } from './type';
declare module 'react-100-form' {
    function useForm(initialValues: any, validate?: TValidate<any>): TResponse<any>;
    function useForm<S = any>(initialValues: S, validate?: TValidate<S>): TResponse<S>;
}

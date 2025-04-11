export type TErrorSources = {
    path: string | number;
    message: string[];
};

export type TGenericErrorResponse = {
    status: number;
    message: string;
    error: TErrorSources;
};
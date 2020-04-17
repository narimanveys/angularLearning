export const constants = {
    API: {
        Transaction : '/api/protected/transactions',
        UsersList : '/api/protected/users/list',
        Login : '/sessions/create',
        Register : '/users',
        UserInfo : '/api/protected/user-info'
    },
    config: {
        baseUrl: 'http://193.124.114.46:3001'
    }
};

const resolvePathParams = ( apiEndpoint, pathParams ) => {
    if (pathParams && typeof pathParams === 'object' ) {
        Object.keys(pathParams).map((key, index) => {
            const pattern = ':' + key;
            apiEndpoint = apiEndpoint.replace(pattern, pathParams[key]);
            return apiEndpoint;
        });
    }
    return apiEndpoint;
};

const resource = {};
const init = () => {
    Object.keys(constants.API).map((key, index) =>
        resource[key] = (params) => {
            return constants.config.baseUrl + resolvePathParams(constants.API[key], params);
        }
    );
};

init();
// console.log(resource)
export const $resource = resource;

import ApiMethods from './ApiMethods';
import ENDPOINTS from './EndPoints';

class ApiManager
{
    //users
    static userLogin = (body) => {
        const url = ENDPOINTS.USER_LOGIN();
        return ApiMethods.post(url, body);
    };

    //assets
    static assetTagGroup = () => {
        const url = ENDPOINTS.ASSET_TAG_GROUP();
        return ApiMethods.get(url);
    };
    static assetTagList = () => {
        const url = ENDPOINTS.ASSET_TAG_LIST();
        return ApiMethods.get(url);
    };
    static assetCategory = () => {
        const url = ENDPOINTS.ASSET_CATEGORY();
        return ApiMethods.get(url);
    };
}

export default ApiManager;
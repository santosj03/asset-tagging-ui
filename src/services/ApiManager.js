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
    static assetList = () => {
        const url = ENDPOINTS.ASSET_LIST();
        return ApiMethods.get(url);
    };
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
    static assetGroup = (categoryName) => {
        const url = ENDPOINTS.ASSET_GROUP(categoryName);
        return ApiMethods.get(url);
    };

    static insertAssets = (payload) => {
        const url = ENDPOINTS.ASSET_INSERT();
        return ApiMethods.post(url, payload);
    };
}

export default ApiManager;
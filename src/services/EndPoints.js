const ENDPOINTS = {
    USER_LOGIN: () => 'api/login',
    ASSET_TAG_GROUP: () => 'api/asset/asset-group',
    ASSET_CATEGORY: () => 'api/asset/category',
    ASSET_GROUP: (categoryName) => `api/asset/group?category=${categoryName}`,

    ASSET_LIST: () => 'api/asset/assets',
    ASSET_TAG_LIST: () => 'api/asset/asset-tagging',
    ASSET_INSERT: () => 'api/asset/create-asset',
    UPDATE_COMMENT: (userid, postid, commentid) => `/users/${userid}/posts/${postid}/comments/${commentid}`
};

export default ENDPOINTS;

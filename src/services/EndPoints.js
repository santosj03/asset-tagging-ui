const ENDPOINTS = {
    USER_LOGIN: () => 'api/login',
    ASSET_TAG_GROUP: () => 'api/asset/asset-group',
    ASSET_CATEGORY: () => 'api/asset/asset-category',

    ASSET_TAG_LIST: () => 'api/asset/asset-tagging',
    UPDATE_COMMENT: (userid, postid, commentid) => `/users/${userid}/posts/${postid}/comments/${commentid}'`
};

export default ENDPOINTS;

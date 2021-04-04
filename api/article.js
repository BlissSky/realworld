import { instance } from '@/plugins/request'
console.log(this)
// 获取文章列表
export const articleList = params => {
    return instance({
        method: 'GET',
        url: '/api/articles',
        params
    });
}

// 获取作者关注的文章列表
export const articleFeedList = params => {
    return instance({
        method: 'GET',
        url: '/api/articles/feed',
        params
    });
}

export const getTags = () => {
    return instance({
        method: 'get',
        url: '/api/tags'
    });
}

export const createArticle = data => {

    return instance({
        method: 'post',
        url: '/api/articles',
        data
    });
}

export const addFavorite = slug => {
    return instance({
        method: 'post',
        url: `/api/articles/${slug}/favorite`,
    });
}

export const deleteFavorite = slug => {
    return instance({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`,
    });
}

export const getProfile = username => {
    return instance({
        method:"GET",
        url:`/api/profiles/${username}`
    })
}

export const getArticle = slug => {
    return instance({
        method:"GET",
        url:`/api/articles/${slug}`
    })
}

export const updateArticle = slug => {
    return instance({
        method:"PUT",
        url:`/api/articles/${slug}`
    })
}

export const deleteArticle = slug => {
    return instance({
        method:"DELETE",
        url:`/api/articles/${slug}`
    })
}

export const addComment = (slug,data) => {
    return instance({
        method:"POST",
        url:`/api/articles/${slug}/comments`,
        data
    })
}

export const getComment = slug => {
    return instance({
        method:"GET",
        url:`/api/articles/${slug}/comments`
    })
}


<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <button
              v-if="!isUser"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="followToggleUser(profile)"
              :disabled="profile.followDisabled"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? "Unfollow" : "Follow" }} Eric Simons
            </button>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              v-show="isUser"
              to="/setting"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: paramName === 'author' }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      paramName: 'author',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: paramName === 'favorited' }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      paramName: 'favorited',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="(article, index) in articles"
            :key="index"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img
                  :src="article.author.image"
                  onerror="this.src= 'imgError';this.onerror=null"
                />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.body }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page,
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'profile',
                    query: {
                      page: item,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getProfile,
  articleList,
  addFavorite,
  deleteFavorite,
} from "@/api/article.js";
import { followUser, unFollowUser } from "@/api/user.js";
import { mapState } from "vuex";
var dayjs = require("dayjs");

export default {
  middleware: "authenticated",
  computed: {
    ...mapState(["user"]),
    totalPage() {
      console.log(this.articlesCount,this.limit)
      return Math.ceil(this.articlesCount / this.limit);
    },
    isUser() {
      return this.user.username === this.profile.username;
    },
  },
  filters: {
    date(value) {
      return dayjs(value).format("MMM DD,YYYY");
    },
  },
  watchQuery: ["paramName","page"],
  async asyncData({ params, query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 5;
    const paramName = query.paramName || "favorited";

    const [articleListRes, profileRes] = await Promise.all([
      articleList({
        limit,
        offset: (page - 1) * limit,
        [paramName]: params.username,
      }),
      getProfile(params.username),
    ]);

    const { articles, articlesCount } = articleListRes.data;
    const { profile } = profileRes.data;

    profile.followDisabled = false;
    articles.forEach((article) => (article.favoriteDisabled = false));
    return {
      articles,
      articlesCount,
      profile,
      paramName,
      limit,
      page
    };
  },
  methods: {
    async followToggleUser(profile) {
      profile.followDisabled = true;
      if (profile.following) {
        await unFollowUser(profile.username);
        profile.following = false;
      } else {
        await followUser(profile.username);
        profile.following = true;
      }
      profile.followDisabled = false;
    },
    async onFavorite(article) {
      console.log(article)
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>

<style>
</style>
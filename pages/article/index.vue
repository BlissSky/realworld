<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: article.author.username,
              },
            }"
            ><img :src="article.author.image" />
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
              >{{ article.author.username }}</nuxt-link
            >
            <span class="date">{{
              article.createdAt | date("MMM DD, YYYY")
            }}</span>
          </div>
          <template v-if="isSelf">
            <span ng-show="$ctrl.canModify" class="ng-scope">
              <nuxt-link
                class="btn btn-outline-secondary btn-sm"
                :to="{
                  name: 'editor',
                  params: {
                    slug: article.slug,
                  },
                }"
              ><i class="ion-edit"></i> Edit Article</nuxt-link>

              <button
                class="btn btn-outline-danger btn-sm"
                ng-class="{disabled: $ctrl.isDeleting}"
                @click="deleteCurArticle(article.slug)"
              >
                <i class="ion-trash-a"></i> Delete Article
              </button>
            </span>
          </template>
          <template v-else>
            <button
              class="btn btn-sm btn-outline-secondary"
              v-if="!article.following"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ article.following ? "Unfollow" : "Follow" }}
              {{ article.author.username }}
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; {{ article.favorited ? "Unfavorite" : "favorite" }} Post
              <span class="counter">({{ article.favoritesCount }})</span>
            </button>
          </template>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
          <ul class="tag-list">
            <li
              class="tag-default tag-pill tag-outline"
              v-for="(key, i) in article.tagList"
              :key="i"
            >
              {{ key }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: article.author.username,
              },
            }"
            ><img :src="article.author.image" />
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
              >{{ article.author.username }}</nuxt-link
            >
            <span class="date">{{
              article.createdAt | date("MMM DD, YYYY")
            }}</span>
          </div>
          <button
            class="btn btn-sm btn-outline-secondary"
            v-if="!article.following"
          >
            <i class="ion-plus-round"></i>
            &nbsp; {{ article.following ? "Unfollow" : "Follow" }}
            {{ article.author.username }}
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; {{ article.favorited ? "Unfavorite" : "favorite" }} Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form
            class="card comment-form"
            @submit.prevent="submitComment(article.slug)"
          >
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                v-model="commentBody"
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>
          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text">
                {{ comment.body }}
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: comment.author.username,
                    },
                  }"
                  ><img
                    class="comment-author-img"
                    :src="comment.author.image"
                  />
                </nuxt-link>
              </a>
              &nbsp;
              <nuxt-link
                class="author"
                :to="{
                  name: 'profile',
                  params: {
                    username: comment.author.username,
                  },
                }"
                >{{ comment.author.username }}</nuxt-link
              >
              <span class="date-posted">{{
                comment.createdAt | date("MMM DD, YYYY")
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, getComment, addComment,deleteArticle } from "@/api/article.js";
import { mapState } from "vuex";
var dayjs = require("dayjs");

export default {
  data() {
    return {
      commentBody: "",
    };
  },
  computed: {
    ...mapState(["user"]),
    isSelf() {
      if(this.user){
      return this.user.username === this.article.author.username;
      }
      return false
    },
  },
  filters: {
    date(value) {
      return dayjs(value).format("MMM DD,YYYY");
    },
  },
  async asyncData({ params }) {
    const [articleData, commentData] = await Promise.all([
      getArticle(params.slug),
      getComment(params.slug),
    ]);
    return {
      article: articleData.data.article,
      comments: commentData.data.comments,
    };
  },
  methods: {
    async submitComment(slug) {
      console.log("评论");
      let comment = {
        comment: {
          body: this.commentBody,
        },
      };
      await addComment(slug, comment);
      getComment(slug);
    },
    async deleteCurArticle(slug){
      await deleteArticle(slug)
      this.$router.push("/");
    }
  },
};
</script>

<style>
</style>
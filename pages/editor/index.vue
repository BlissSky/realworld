<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(messages, field) in err">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keyup.enter="addTags"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, i) in article.tagList"
                    :key="i"
                  >
                    <i class="ion-close-round" @click="removeTag(i)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="createArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from "@/api/article.js";

export default {
  middleware: 'authenticated',
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      tag: "",
      err: "",
    };
  },
  async asyncData({ params }) {
    if (params.slug) {
      const { data } = await getArticle(params.slug);
      
      return {
        article: data.article,
      };
    }

    // updateArticle
  },
  methods: {
    addTags() {
      this.article.tagList.push(this.tag);
      this.tag = "";
    },
    removeTag(index) {
      this.article.tagList.splice(index, 1);
    },
    async createArticle() {
      try {
        await createArticle({ article: this.article });
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.err = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>
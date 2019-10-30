<template>
  <div>
    <section class="section">
      <h1 class="title is-4 text-center">
        # このサイトについて
      </h1>
      <p class="content">
        食物アレルギーをお持ちの方が、安心して回転寿司で食事をすることをサポートする検索サイトです。<br />
        除去したいアレルゲンを指定して検索することで、食べられるネタのみを一覧表示することができます。一覧のネタを選択すると、そのネタに含まれるアレルゲンを確認することができます。<br />
        また、ネタの名前の一部を入力して検索することもできます。
      </p>
      <h1 class="title is-4 text-center">
        # 免責事項
      </h1>
      <p class="content">
        当サイトのネタ情報は、以下の各回転寿司チェーンのアレルギー表から取得しています。
      </p>
      <div class="content">
        <ul>
          <li v-for="sushiChain in sushiChains" :key="sushiChain.id">
            {{ sushiChain.name }} (
            <a :href="sushiChain.document_url" target="_blank" rel="noopener">{{
              sushiChain.document_url
            }}</a>
            )
          </li>
        </ul>
      </div>
      <p class="content">
        当サイトは上記の正確性を保証しません。また、内容には十分に注意を払っていますが、当サイトの情報を利用した事によるあらゆる損害についても一切責任を負いません。
      </p>
      <h1 class="title is-4 text-center">
        # お問い合わせ
      </h1>
      <p class="content">
        フィードバックはTwitter(<a
          href="https://twitter.com/t3yamoto"
          target="_blank"
          rel="noopener"
          >@t3yamoto</a
        >)までお願いします。
      </p>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          © 2019 t3yamoto
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'About',
  computed: {
    ...mapGetters(['sushiChains'])
  }
}
</script>

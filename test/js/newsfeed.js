/**
 * トップにnews記事を表示
 */
 var IndexNewsFeed = function() {
   var parent = new BaseSectionAnimationClass("#top.page .news.section");

   parent.onCreate = function() {
     parent.inheritance.onCreate();
     onNewsFeed();
   }

   parent.onActive = function(){
       parent.inheritance.onActive();
   }

   function onNewsFeed(){
     new Vue({
       el: '#newsFeed',
       data: {
         items: []
       },
       created: function created() {
         this.query(1);
       },
       methods: {
         query: function query(paged) {
           var _this = this;

           var url = '/wp-json/wp/v1/news';
           axios.get(url).then(function (response) {
             _this.items = response.data.items;
           });
         }
       }
     });
   }

   return parent;
 }

 var NewsPageClass = function(){
     var parent = new PjaxPageClass();

     parent.parts = {
       sort: new IndexNewsFeed()
     };

     return parent;
 }

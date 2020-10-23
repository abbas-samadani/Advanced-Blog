
const dateService = require('../services/dataService');

class PostPresenter {

    constructor(post) {
        this.post = post;
    }
    jalaliCreatedAt() {
        return dateService.toPersian(this.post.create_at);
    }
    
    excerpt(words_limit = 20) {
        const words = this.post.content.split(' ');
        return words.slice(0, words_limit - 1).join(' ') + ' ...';
    }

}
module.exports = PostPresenter;

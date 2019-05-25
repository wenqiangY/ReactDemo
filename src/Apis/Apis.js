import axios from 'axios';

class Apis {
    async sendGetRequest (url) {
        return await axios.get(`http://localhost:8888?${url}`);
    }

    // 热点 news_hot
    getTagData(url) {
        return this.sendGetRequest(`category=${url}`);
    }
}

window.Apis = new Apis();
export default window.Apis;
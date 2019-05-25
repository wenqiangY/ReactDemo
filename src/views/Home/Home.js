import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Home.less';
import Hender from 'components/Hender/Hender';
import HomeMain from 'components/HomeMain/HomeMain';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            tag: 'news_hot'
        }
    }

    // 点击tag切换标签时触发更新数据
    newTag(tag) {
        // console.log(tag);
        this.setState({
            tag: tag
        })
    }

    render() {
        return (
            <div className="home">
                <Hender newTag={(this.newTag).bind(this)}/>
                <HomeMain/>
            </div>
        )
    }

    getChildContext() {
        return {
            tag: this.state.tag
        }
    }
}

// Home.childContextTypes = {
//     tag: PropTypes.string.isRequired
// }


export default Home;
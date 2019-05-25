import React, {Component} from 'react';

import {connect} from 'react-redux';
import Apis from "../../Apis/Apis";
import './HomeMain.less'


// 把大组件拆分小的无状态组件
function HomeContent(props) {
   return <div className="home_main">
        {
            props.list.map((value, index) => {
                // console.log(JSON.parse(value.content));
                var obj = JSON.parse(value.content);
                var item_key = (obj.item_id || index) * Math.random();
                return <div className="home_main_item" onClick={() => this.handleClick(obj.url)} key={item_key}>
                    <div className="item_left">
                        <div className="title">{obj.title}</div>
                        <div className="item_left_bottom">
                            <span>{obj.media_name}</span>
                            <span>{obj.filter_words.length}评论</span>
                            <span>{props.setTime(obj.behot_time, obj.publish_time)}</span>
                        </div>
                    </div>
                    <div className={obj.middle_image ? "home_main_item_img" : 'item_img_dis'}>
                        <img src={obj.middle_image ? obj.middle_image.url : ''} alt=""/>
                    </div>
                </div>
            })
        }
    </div>
}



// 通过redux 更新数据
class HomeMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagObj: {},
            tagName: 'news_hot',
            haveData: false,
            ajaxData: true
        }
    }

    // react 生命周期挂载完成之后执行
    componentDidMount() {
        this.getData();
        window.addEventListener('scroll', this.scrollListener.bind(this));
    }

    // react 生命周期组件更新后执行
    componentDidUpdate() {
        console.log(this.props);
        this.setUpDate(this.props.tag)
    }

    // react 生命周期组件销毁前执行
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollListener.bind(this));
    }

    // 获取数据
    getData() {
        Apis.getTagData(this.state.tag)
            .then((msg) => {

                this.setState({
                    tagObj: msg.data,
                    haveData: true
                })
                console.log(this.state.tagObj.data);
                // this.state.tagObj.data.map(value => {
                //     console.log(JSON.parse(value.content));
                // })
            })
            .catch((msg) => {
                console.log(msg);
            })
    }

    // 监听页面滚动事件
    scrollListener() {
        let pageScorllTop = document.documentElement.scrollTop || document.body.scrollTop;
        let pageOffsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
        let pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if ((pageOffsetHeight - pageScorllTop < pageHeight + 200) && this.state.ajaxData) {
            console.log(123);
            this.setState({ajaxData: false});
            Apis.getTagData(this.state.tag)
                .then(msg => {
                    console.log(msg);
                    this.setState({
                        ajaxData: true,
                        tagObj: {
                            data: this.state.tagObj.data.concat(msg.data.data)
                        }
                    });
                    console.log(this.state.tagObj)
                })
                .catch(msg => {
                    console.log(msg);
                    this.setState({ajaxData: true});
                })
        }
    }

    // 点击事件
    handleClick(url) {
        location.href = url
    }

    // 文章发布时间
    setTime(t1, t2) {
        var t3 = t1 - t2;
        if (t3 >= 1440*180*2*2) {
            return '2年前'
        } else if (t3 >= 1440*180*2) {
            return '1年前'
        } else if (t3 >= 1440*90*2) {
            return '半年前'
        } else if (t3 >= 1460*90) {
            return '3个月前'
        } else if (t3 >= 1440*60) {
            return '2个月前'
        } else if (t3 >= 1440*30) {
            return '1个月前'
        } else if (t3 >= 1440*7) {
            return '1个星期前'
        } else if (t3 >= 1440*3) {
            return '3天前'
        } else if (t3 >= 1440*2) {
            return '2天前'
        } else if (t3 >= 1440) {
            return '1天前'
        } else if (t3 >= 60*3) {
            return '3个小时前'
        } else if (t3 >= 60*2) {
            return '2个小时前'
        }else if (t3 >= 60) {
            return '1个小时前'
        }else if (t3 <= 60) {
            return t3 + '分钟前'
        }
    }

    // 监测tag是否改变,如果改变重新获取数据
    setUpDate(tag) {
        console.log(tag)
        if (tag && tag !== this.state.tagName) {
            this.setState({
                tagName: tag
            })
            Apis.getTagData(tag)
                .then((msg) => {
                    console.log(msg.data);
                    this.setState({
                        tagObj: msg.data
                    })
                })
                .catch((msg) => {
                    console.log(msg);
                })
        }
    }

    render () {
        // this.setUpDate(this.props.tag)
        return (
            !this.state.haveData ? 'Loading': (<HomeContent list={this.state.tagObj.data} setTime={this.setTime}/>)
        )
    }
}



export default connect((state) => ({
    tag: state.tagData.tag,
    store: state
}), {})(HomeMain);


// 通过context上下文获取数据并更新视图
/*
class HomeMain extends Component {
    constructor(props, context) {
        super(props, context);
        console.log(context);
        this.state = {
            tagObj: {},
            tagName: this.context.tag,
            haveData: false,
            ajaxData: true
        }
    }

    componentDidMount() {
        this.getData();
        window.addEventListener('scroll', this.scrollListener.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollListener.bind(this));
    }

    // 获取数据
    getData() {
        if (this.context.tag) {
            Apis.getTagData(this.context.tag)
                .then((msg) => {

                    this.setState({
                        tagObj: msg.data,
                        haveData: true
                    })
                    console.log(this.state.tagObj.data);
                    // this.state.tagObj.data.map(value => {
                    //     console.log(JSON.parse(value.content));
                    // })
                })
                .catch((msg) => {
                    console.log(msg);
                })
        }
    }

    // 监听页面滚动事件
    scrollListener() {
        let pageScorllTop = document.documentElement.scrollTop || document.body.scrollTop;
        let pageOffsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
        let pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if ((pageOffsetHeight - pageScorllTop < pageHeight + 200) && this.state.ajaxData) {
            console.log(123)
        }
    }

    // 点击事件
    handleClick(url) {
        location.href = url
    }

    // 文章发布时间
    setTime(t1, t2) {
        var t3 = t1 - t2;
        if (t3 >= 1440*180*2*2) {
            return '2年前'
        } else if (t3 >= 1440*180*2) {
            return '1年前'
        } else if (t3 >= 1440*90*2) {
            return '半年前'
        } else if (t3 >= 1460*90) {
            return '3个月前'
        } else if (t3 >= 1440*60) {
            return '2个月前'
        } else if (t3 >= 1440*30) {
            return '1个月前'
        } else if (t3 >= 1440*7) {
            return '1个星期前'
        } else if (t3 >= 1440*3) {
            return '3天前'
        } else if (t3 >= 1440*2) {
            return '2天前'
        } else if (t3 >= 1440) {
            return '1天前'
        } else if (t3 >= 60*3) {
            return '3个小时前'
        } else if (t3 >= 60*2) {
            return '2个小时前'
        }else if (t3 >= 60) {
            return '1个小时前'
        }else if (t3 <= 60) {
            return t3 + '分钟前'
        }
    }

    // 监测tag是否改变,如果改变重新获取数据
    setUpDate() {
        if (this.context.tag && this.context.tag !== this.state.tagName) {
            this.setState({
                tagName: this.context.tag
            })
            Apis.getTagData(this.context.tag)
                .then((msg) => {
                    console.log(msg.data);
                    this.setState({
                        tagObj: msg.data
                    })
                })
                .catch((msg) => {
                    console.log(msg);
                })
        }
    }

    render () {
        this.setUpDate();
        return (
            !this.state.haveData ? 'Loading': (
                <div className="home_main">
                    {
                        this.state.tagObj.data.map(value => {
                            // console.log(JSON.parse(value.content));
                            var obj = JSON.parse(value.content);
                            return <div className="home_main_item" onClick={() => this.handleClick(obj.url)} ken={obj.item_id}>
                                <div className="item_left">
                                    <div className="title">{obj.title}</div>
                                    <div className="item_left_bottom">
                                        <span>{obj.media_name}</span>
                                        <span>{obj.filter_words.length}评论</span>
                                        <span>{this.setTime(obj.behot_time, obj.publish_time)}</span>
                                    </div>
                                </div>
                                <div className={obj.middle_image ? "home_main_item_img" : 'item_img_dis'}>
                                    <img src={obj.middle_image ? obj.middle_image.url : ''} alt=""/>
                                </div>
                            </div>
                        })
                    }
                </div>
            )
        )
    }
}

HomeMain.contextTypes = {
    tag: PropTypes.string
}

export default HomeMain;*/

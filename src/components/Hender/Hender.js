import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {tagData} from "actions/tagData";
import './Hender.less'

let tagList = [
    {name: '热点', id: 'news_hot'},
    {name: '视频', id: 'video'},
    {name: '社会', id: 'news_society'},
    {name: '娱乐', id: 'news_entertainment'},
    {name: '问答', id: 'question_and_answer'},
    {name: '图片', id: '组图'},
    {name: '科技', id: 'news_tech'},
    {name: '汽车', id: 'news_car'},
    {name: '体育', id: 'news_sport'},
    {name: '财经', id: 'news_finance'},
    {name: '军事', id: 'news_military'},
    {name: '国际', id: 'news_world'},
    {name: '段子', id: 'essay_joke'},
    {name: '趣图', id: 'image_funny'},
]

class Hender extends Component {
    constructor(props,context) {
        super(props);
        this.state = {
            tagId: 'news_hot'
        }
    }

    newTag(tag) {
        // this.props.newTag(tag);
        this.setState({
            tagId: tag
        })
        this.props.tagData(tag);
        // console.log(this.props.tagData(tag));
    }

    render() {
        return (
            <div className="hender">
                <div className="hender_title">今日头条</div>
                <div className="top_menu_bar">
                    {/*<div className="top_menu_more"></div>*/}
                    <div className="top_menu_list">
                        {
                            tagList.map(value => {
                                return <span className={value.id === this.state.tagId ? 'action' : ''} onClick={ () => this.newTag(value.id) } key={value.id}>{value.name}</span>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({tag: state.tagData.tag}), {tagData})(Hender);
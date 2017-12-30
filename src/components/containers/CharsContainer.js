import React, {Component} from 'react';
import { connect } from 'react-redux';
import ShortChars from '../Character/ShortChars';
import InfiniteScroll from 'react-infinite-scroller';
import * as charsApi from '../../api/chars-api';
import './Loader.css';
import {Divider} from "material-ui";

class CharsListContainer extends Component {
    constructor(){
        super();
        this.state ={
            items: [],
            hasMore: true
        };
    }

    componentDidMount(){
        this.setState({items:[]})
    }

    loadNews (page){
        charsApi.getCharsWithOffsetPages(page).then(data=>{
            if(!(data.length)){
                this.setState({hasMore: false});
            }
        })

    }

    render() {
        let key = this.state.items.length;
        this.state.items.push(<ShortChars link={'/chars/'} charsList={this.props.charsList} key={key}/>);
        return (
            <div>
                <div className="title"><h1>Персонажи сериала</h1></div>
                <Divider/>
                <br/>
                <InfiniteScroll
                    pageStart={-1}
                    loadMore={this.loadNews.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader">
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                    </div>}
                >
                    <div className="ITEMS">
                        {this.state.items}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        charsList: store.charsState.charsList
    };
};

export default connect(mapStateToProps)(CharsListContainer);
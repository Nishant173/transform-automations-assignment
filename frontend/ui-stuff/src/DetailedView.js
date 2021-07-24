import React, { Component } from 'react'
import axios from 'axios';
import {
    Link,
} from 'react-router-dom';
import { capitalizeWordsInSentence } from './ListView'


export default class DetailedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            uniqueId: null,
        };
    }
    
    getUniqueIdFromProps() {
        const urlToPage = this.props.match.url === undefined ? "" : this.props.match.url
        const urlComponents = urlToPage.split('/')
        const uniqueId = urlComponents[urlComponents.length - 1]
        return uniqueId
    }

    getDataFromApi() {
        const { uniqueId } = this.state
        const url = `https://reqres.in/api/unknown/${uniqueId}`;
        axios.get(url).then((response) => {
            if (response) {
                const dataIsAvailable = Object.keys(response.data).includes('data');
                if (dataIsAvailable) {
                    this.setState({
                        data: response.data,
                    });
                }
            }
        }).catch((error) => {
            console.log(`Error in getting data from API. ErrorMsg: ${error}`);
        });
    }
    
    componentDidMount() {
        this.setState({
            uniqueId: this.getUniqueIdFromProps(),
        }, this.getDataFromApi)
    }

    render() {
        const { data, uniqueId } = this.state
        const dataObj = data['data'] === undefined ? {} : data['data']
        const dataIsAvailable = (Object.keys(dataObj).length > 0)

        return (
            <div>
                <Link to='/resources'>
                    <h3>Back to Resources</h3>
                </Link>
                {
                    dataIsAvailable ?
                    <h3>
                        Detailed view here!
                        ID: {uniqueId === null ? "Unavailable" : uniqueId}
                        <div
                            style={
                                {
                                    height: '150px',
                                    width: '150px',
                                    backgroundColor: dataObj['color'],
                                }
                            }
                        >
                            <h5>{capitalizeWordsInSentence(dataObj['name'])}</h5>
                            <h5>{dataObj['year']}</h5>
                            <h5>{dataObj['pantone_value']}</h5>
                        </div>
                    </h3>
                    : null
                }
            </div>
        )
    }
}
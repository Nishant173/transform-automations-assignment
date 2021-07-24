import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col } from 'antd';
import styled from 'styled-components';


export function getValueByKeyIfExists(obj, key) {
    if (obj[key] !== undefined) {
        return obj[key];
    }
    return undefined;
}


export function capitalizeWord(word) {
    return word[0].toLocaleUpperCase() + word.slice(1);
}


export function capitalizeWordsInSentence(sentence) {
    return sentence.split(' ').map(capitalizeWord).join(' ');
}


export function groupByNumItems(arrayOfItems, numItemsPerGroup) {
    let arrayGrouped = []
    let itemsInSingleGroup = []
    for (let item of arrayOfItems) {
      itemsInSingleGroup.push(item)
      if (itemsInSingleGroup.length === numItemsPerGroup) {
        arrayGrouped.push(itemsInSingleGroup)
        itemsInSingleGroup = []
      }
    }
    if (itemsInSingleGroup.length > 0) {
      arrayGrouped.push(itemsInSingleGroup)
    }
    return arrayGrouped
}


export default class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    getDataFromApi() {
        const url = "https://reqres.in/api/unknown/";
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
        this.getDataFromApi();
    }

    render() {
        const arrayOfObjects = this.state.data.data === undefined ? [] : this.state.data.data;
        const numColumnsPerRow = 3
        const arrayGrouped = groupByNumItems(arrayOfObjects, numColumnsPerRow)

        const StyledLink = styled(Link)`
            text-decoration: none;
            
            &:focus, &:hover, &:visited, &:link, &:active {
                text-decoration: none;
            }
        `;

        return (
            <div>
                <Link to='/'>
                    <h3>Back to Home</h3>
                </Link>
                <Card>
                    {
                        arrayGrouped.map(array => (
                            <Row>
                                {
                                    array.map(obj => (
                                        <Col>
                                            <div
                                                style={
                                                    {
                                                        height: '90px',
                                                        width: '150px',
                                                        backgroundColor: obj['color'],
                                                    }
                                                }
                                            >
                                                <StyledLink to={`/resources/${obj['id']}`}>
                                                    <h4>{capitalizeWordsInSentence(obj['name'])}</h4>
                                                    <h4>{obj['year']}</h4>
                                                </StyledLink>
                                            </div>
                                        </Col>
                                    ))
                                }
                            </Row>
                        ))
                    }
                </Card>
            </div>
        )
    }
}
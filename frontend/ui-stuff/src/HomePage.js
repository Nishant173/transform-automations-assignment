import React from 'react'
import {
    Link,
} from 'react-router-dom';


export default function HomePage() {
    return (
        <div>
            <h2>
                This is the Home page. &nbsp;
                <Link to='/resources'>Go to resources</Link>
            </h2>
        </div>
    )
}
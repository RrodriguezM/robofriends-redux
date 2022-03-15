import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import './App.css'
import CardList from "../components/CardList"
import SearchBox from "../components/SearchBox"
import Scroll from "../components/Scroll"
import ErrorBoundy from "../components/ErrorBoundry"

import { setSearchfield } from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value))
    }
}

const App = (props) => {

    const [robots, setRobots] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(users => {
                setRobots(users)
            })

    }, [])

    return (
        <>
            {
                robots.length === 0
                    ? <h1>Loading</h1>
                    : <div className='tc' >
                        <h1 className='courier'>RoboFriends</h1>
                        <SearchBox searchChange={props.onSearchChange} />
                        <Scroll>
                            <ErrorBoundy>
                                <CardList robots={robots.filter(robot => robot.name.toLowerCase().includes(props.searchField.toLowerCase()))} />
                            </ErrorBoundy>
                        </Scroll>
                    </div>
            }
        </>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(App);



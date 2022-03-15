import React, { useEffect } from 'react';
import { connect } from "react-redux"
import './App.css'
import CardList from "../components/CardList"
import SearchBox from "../components/SearchBox"
import Scroll from "../components/Scroll"
import ErrorBoundy from "../components/ErrorBoundry"

import { setSearchfield, requestRobots } from '../actions'


const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

const App = (props) => {

    // const [robots, setRobots] = useState([]);

    useEffect(() => {
        props.onRequestRobots()
    }, [])

    return (
        <>
            {
                props.isPending
                    ? <h1>Loading</h1>
                    : <div className='tc' >
                        <h1 className='courier'>RoboFriends</h1>
                        <SearchBox searchChange={props.onSearchChange} />
                        <Scroll>
                            <ErrorBoundy>
                                <CardList robots={props.robots.filter(robot => robot.name.toLowerCase().includes(props.searchField.toLowerCase()))} />
                            </ErrorBoundy>
                        </Scroll>
                    </div>
            }
        </>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(App);



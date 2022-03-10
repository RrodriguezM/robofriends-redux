import React, { useState, useEffect } from 'react';
import './App.css'
import CardList from "../components/CardList"
import SearchBox from "../components/SearchBox"
import Scroll from "../components/Scroll"
import ErrorBoundy from "../components/ErrorBoundry"

const App = () => {

    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(users => {
                setRobots(users)
            })
        console.log("Initial Effect")
    }, [])

    useEffect(() => {
        console.log(count)
    }, [count])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
        // console.log("OnSearch")
    }

    return (
        <>
            {
                robots.length === 0
                    ? <h1>Loading</h1>
                    : <div className='tc' >
                        <h1 className='courier'>RoboFriends</h1>
                        <SearchBox searchChange={onSearchChange} />
                        <button onClick={() => setCount(count + 1)} >Click Me</button>
                        <Scroll>
                            <ErrorBoundy>
                                <CardList robots={robots.filter(robot => robot.name.toLowerCase().includes(searchfield.toLowerCase()))} />
                            </ErrorBoundy>
                        </Scroll>
                    </div>
            }
        </>
    );

}

export default App;



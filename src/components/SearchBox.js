import './SearchBox.css'

const SearchBox = ({ searchChange }) => {
    return (
        <div className='pa2'>
            <input
                className='b pa2 ba bg-transparent'
                type='search'
                onChange={searchChange}
                placeholder='search robots'
            />
        </div>

    );
}

export default SearchBox;

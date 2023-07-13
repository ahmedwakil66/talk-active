import './Loader.css';

const Loader = ({text}) => {
    return (
        <div className='loader'> {text || 'Loading...'} </div>
    );
};

export default Loader;
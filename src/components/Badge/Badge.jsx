import './Badge.css'

const Badge = ({ text, type }) => {
    const bg = type === 'success' ? 'rgb(97, 174, 98)' : 'gray'

    return (
        <p
            className='my_badge'
            style={{ backgroundColor: bg }}
        >
            {text}
        </p>
    );
};

export default Badge;
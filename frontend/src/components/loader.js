import Loader from 'react-loader-spinner';
export default function ReactLoader() {
    return (
        <Loader
            type="Oval"
            color="#00000059"
            height={200}
            width={200}
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20vh'}}
            />
    )
}

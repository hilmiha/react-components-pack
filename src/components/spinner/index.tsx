import './styles.scss'

type SpinnerProps = {
    size?:'small' | 'medium' | 'large'
    theme?:'dark' | 'light' | 'default'
}
const Spinner = ({
    size = 'medium',
    theme = 'default'
}:SpinnerProps) =>{

    return(
        <div className={`loader ${size} ${theme}`} />
    )
}

export default Spinner
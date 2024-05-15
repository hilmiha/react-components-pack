import './styles.scss'

type SpinnerProps = {
    type?:'small' | 'medium' | 'large'
    theme?:'dark' | 'light' | 'default'
}
const Spinner = ({
    type = 'medium',
    theme = 'default'
}:SpinnerProps) =>{

    return(
        <div className={`loader ${type} ${theme}`} />
    )
}

export default Spinner
import { COLORS } from '../../constant/theme'
import './styles.css'

const Spinner = () =>{
    return (
        <div 
            className="spinner"
            style={{
                borderTopColor:COLORS.primary400
            }}
        />
    )
}

export default Spinner
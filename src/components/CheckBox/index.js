import './styles.css'
import { COLORS } from '../../constant/theme'
import Icons from '../Icons'
import Text from '../Text'
import { Fragment } from 'react'

const CheckBox = ({
    //props
    className,
    value,

    //function
    onSelectOption,

    label,
    isDisabled,
    isDash,
    isEllipsistatic
}) =>{

    const onChange = () =>{
        if(onSelectOption && !isDisabled){
            onSelectOption((value)?(''):(true))
        }
    }
    return(
        <button 
            className={`input-checkbox-item ${(value)?('item-selected'):('')} ${(className)?(className):('')}`}
            style={{
                padding:(label)?('4px'):('2px')
            }}
            onClick={(isDisabled)?(undefined):(()=>{onChange()})}
            disabled={isDisabled}
        >
            <div 
                className='input-checkbox-item-check-box'
                style={{
                    borderColor:COLORS.gray400,
                    backgroundColor:(
                        (value && !isDisabled)?('white'):(isDisabled)?(COLORS.gray100):('white')
                    )
                }}
            >
                <Icons 
                    iconName={isDash?('minus'):('checked')} 
                    color={(value && !isDisabled)?('primary500'):(value && isDisabled)?('primary300'):('transparent')}
                />
            </div>
            {
                (label)&&(
                    <Text
                        textLabel={label}
                        color={(
                            (value && !isDisabled)?('gray900'):(value && isDisabled)?('gray400'):(isDisabled)?('gray400'):('gray900')
                        )}
                        isEllipsistatic={isEllipsistatic}
                    />
                )
            }
        </button>
    )
}

export default CheckBox
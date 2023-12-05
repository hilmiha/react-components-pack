import './styles.css'
import Icons from '../Icons'
import Text from '../Text'
import { Fragment, useRef } from 'react'

const InputCheckbox = ({
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
    const checboxRef = useRef(null)
    const onChange = () =>{
        if(onSelectOption && !isDisabled){
            onSelectOption((value)?(''):(true))
        }
    }
    return(
        <button 
            ref={checboxRef}
            className={`input-checkbox-item ${(value)?('item-selected'):('')} ${(className)?(className):('')}`}
            style={{
                padding:(label)?('6px'):('2px')
            }}
            onClick={(isDisabled)?(undefined):(()=>{onChange()})}
            disabled={isDisabled}
        >
            <div 
                className='input-checkbox-item-check-box'
                style={{
                    borderColor:'var(--neutral400)',
                    backgroundColor:(
                        (value && !isDisabled)?('var(--neutral0)'):(isDisabled)?('var(--neutral100)'):('var(--neutral0)')
                    )
                }}
            >
                <Icons 
                    iconName={isDash?('minus'):('checked')} 
                    color={(value && !isDisabled)?('var(--brand700)'):(value && isDisabled)?('var(--brand300)'):('transparent')}
                />
            </div>
            {
                (label)&&(
                    <div onClick={()=>{checboxRef.current?.focus()}}>
                        <Text
                            textLabel={label}
                            color={(
                                (value && !isDisabled)?('var(--neutral900)'):(value && isDisabled)?('var(--neutral400)'):(isDisabled)?('var(--neutral400)'):('var(--neutral900)')
                            )}
                            isEllipsistatic={isEllipsistatic}
                        />
                    </div>
                )
            }
        </button>
    )
}

export default InputCheckbox
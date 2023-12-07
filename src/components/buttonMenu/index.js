import { useRef } from 'react'
import Icons from '../Icons'
import Text from '../Text'
import './styles.css'

const ButtonMenu = ({
    className,
    isActive,
    isActiveSub,
    isDisabled,
    label,
    iconRightName,
    iconLeftName,
    subLabel,
    onClick,
    onClickRightIcon,
    level
}) =>{
    const refButton = useRef(null)
    return(
        <div style={{position:'relative'}}>
            <button 
                ref={refButton} 
                className={`button-menu-wrapper ${isActive?('button-menu-active'):('')} ${isDisabled?('button-menu-disabled'):('')} ${(className)?(className):('')}`} 
                disabled={isDisabled}
                onClick={onClick}
            >
                <div className='button-menu-indicator'/>
                <div 
                    className='button-menu-label-wrapper' 
                    onClick={()=>{refButton.current?.focus()}}
                    style={{
                        paddingLeft:(level?(`${level*30 + 24}px`):('16px'))

                    }}
                >
                    <Text 
                        textLabel={(label)?(label):('.')} 
                        color={(label)?((isDisabled)?('var(--neutral400)'):((isActiveSub || isActive)?('var(--brand600)'):(''))):('transparent')} 
                        isEllipsistatic={true}
                        iconLeftName={iconLeftName?(iconLeftName):(undefined)}
                        isBold={isActiveSub || isActive}
                    />
                    {
                        (subLabel)&&(
                            <Text 
                                className={'button-menu-subLabel'} 
                                textLabel={subLabel} 
                                color={isDisabled?('var(--neutral400)'):('var(--neutral500)')} 
                                isEllipsistatic={true}
                            />
                        )
                    }
                </div>
            </button>
            {
                (iconRightName)&&(
                    <button className={`button-menu-icon`} onClick={(onClickRightIcon)?(onClickRightIcon):(undefined)}>
                        {
                            (iconRightName)&&(
                                <Icons iconName={iconRightName}/>
                            )
                        }
                    </button>
                )
            }
        </div>
    )
}

export default ButtonMenu
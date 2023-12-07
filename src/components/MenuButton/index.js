import { useRef } from 'react'
import Icons from '../Icons'
import Text from '../Text'
import './styles.css'

const MenuButton = ({
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
                className={`menu-button-wrapper ${isActive?('menu-button-active'):('')} ${isDisabled?('menu-button-disabled'):('')} ${(className)?(className):('')}`} 
                style={{
                    paddingRight:(iconRightName)?('40px'):('0px')
                }}
                disabled={isDisabled}
                onClick={onClick}
            >
                <div className='menu-button-indicator'/>
                <div 
                    className='menu-button-label-wrapper' 
                    onClick={()=>{refButton.current?.focus()}}
                    style={{
                        paddingLeft:(level?(`${level*30 + 24}px`):('16px'))

                    }}
                >
                    <Text 
                        textLabel={(label)?(label):('.')} 
                        color={(label)?((isDisabled)?('var(--neutral400)'):((isActiveSub || isActive)?('var(--brand700)'):(''))):('transparent')} 
                        isEllipsistatic={true}
                        iconLeftName={iconLeftName?(iconLeftName):(undefined)}
                        isBold={isActiveSub}
                    />
                    {
                        (subLabel)&&(
                            <Text 
                                className={'menu-button-subLabel'} 
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
                    <button className={`menu-button-icon`} onClick={(onClickRightIcon)?(onClickRightIcon):(undefined)}>
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

export default MenuButton
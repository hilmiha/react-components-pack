import React, { useEffect, useState } from 'react'
import './styles.scss'
import { GlobalContext, GlobalContextType } from '../../context/globalcontext'

type objectFitType = 'fill' | 'contain' | 'cover' | 'scale-down'
type Props = {
    className?: string
    srcImage: string
    srcImageDark?: string
    height?: string
    width?: string
    radius?: string
    objectFit?: objectFitType
    alt?: string
}
const Image = ({
    className,
    srcImage,
    srcImageDark,
    height,
    width,
    radius,
    objectFit,
    alt
}:Props) =>{
    const {
        isDarkmode
    } = React.useContext(GlobalContext) as GlobalContextType;

    return(
        <img 
            src={(isDarkmode&&srcImageDark)?(srcImageDark):(srcImage)} 
            style={{
                height:height,
                width:width,
                borderRadius:radius,
                objectFit:objectFit
            }}
            alt={alt}
        />
    )
}

export default Image
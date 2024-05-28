import { processClassname } from '../../helper'
import './styles.scss'

type SkeletonProps = {
    className?: string,
    width?:string | number
    height?:string | number
    radius?:string | number
}
const Skeleton = ({
    className,
    width,
    height,
    radius
}:SkeletonProps) =>{
    return(
        <div
            className={
                processClassname(`skeleton
                ${className?(className):('')}`)
            }
            style={{
                width:(typeof width === 'number')?(`${width}px`):(width),
                height:(typeof height === 'number')?(`${height}px`):(height),
                borderRadius:(typeof radius === 'number')?(`${radius}px`):(radius),
            }}
        >
        </div>
    )
}

export default Skeleton
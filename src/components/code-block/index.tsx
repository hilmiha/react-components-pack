import { useContext } from 'react';
import './styles.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { GlobalContext, GlobalContextType } from '../../context/globalcontext';

type CodeBlockProps = {
    type?:'sippet' | 'block'
    code:string
    isShowNumber?:boolean
    language?:string
}
const CodeBlock = ({
    code
}:CodeBlockProps) =>{

    const {
        isDarkmode
    } = useContext(GlobalContext) as GlobalContextType
    return(
        <div className='code-block'>
            <SyntaxHighlighter 
                language="tsx" 
                style={isDarkmode?(oneDark):(oneLight)}
                wrapLines
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeBlock
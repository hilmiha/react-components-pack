import './styles.scss'
import CodeBlock from "components/code-block"
import Tabs, { tabListType } from "components/tabs"
import { useState } from "react"

type PreviewNCodeProps = {
    code:string
    language:string
    children:JSX.Element | JSX.Element[]
}
const PreviewNCode = ({
    code,
    language,
    children
}:PreviewNCodeProps) =>{

    const [tabOpen, setTabOpen] = useState<string>('preview')
    const tabList:tabListType = [
        {
            id:'preview',
            txtLabel:'Preview'
        },
        {
            id:'code',
            txtLabel:'Code'
        }
    ]
    return(
        <div className="preview-n-code">
            <Tabs
                selected={tabOpen}
                setSelected={setTabOpen}
                tabList={tabList}
            />
            {
                (tabOpen==='preview')&&(
                    <div className="preview-tab-content">
                        {
                            children
                        }
                    </div>
                )
            }
            {
                (tabOpen==='code')&&(
                    <div className="code-tab-content">
                        <CodeBlock
                            code={code}
                            language={language}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default PreviewNCode
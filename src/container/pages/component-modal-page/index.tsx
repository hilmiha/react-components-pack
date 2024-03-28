import { useContext, useEffect, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import Button from "../../../components/button";
import Modal from "../../../components/modal";

const ComponentModalPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const [isModalShow, setIsModalShow] = useState(false)
    const [isModalShowSuccess, setIsModalShowSuccess] = useState(false)
    const [isModalShowInfo, setIsModalShowInfo] = useState(false)
    const [isModalShowWarning, setIsModalShowWarning] = useState(false)
    const [isModalShowDanger, setIsModalShowDanger] = useState(false)
    const [isModalShowContent, setIsModalShowContent] = useState(false)



    useEffect(()=>{
        setSidebarMenuListSelected('modal')
    },[])
    
    return(
        <DetailTemplate 
            title="Modal" 
            subTitle="A modal displays content that requires user interaction, in a layer above the page."
        >
            <div className="component-section">
                <span className="font-title">Drawer Right</span>
                <div className="preview-box">
                    <Button txtLabel='Open Modal' onClick={()=>{setIsModalShow(!isModalShow)}}/>
                    <Modal
                        isOpen={isModalShow}
                        setIsOpen={setIsModalShow}
                        txtTitle="Default Modal!"
                        txtContent="This modal is basic. No type yet aplied to this modal."
                        buttonList={[
                            {id:'close', txtLabel:'Close'}
                        ]}
                        onClickButton={(idButton:string)=>{
                            if(idButton==='close'){
                                setIsModalShow(!isModalShow)
                            }
                        }}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Type Variant</span>
                <div className="preview-box">
                    <Button txtLabel='Open Modal Info' onClick={()=>{setIsModalShowInfo(!isModalShowInfo)}}/>
                    <Modal
                        type="info"
                        isOpen={isModalShowInfo}
                        setIsOpen={setIsModalShowInfo}
                        txtTitle="Info Modal!"
                        txtContent="Just for information."
                        buttonList={[
                            {id:'close', txtLabel:'Close'}
                        ]}
                        onClickButton={(idButton:string)=>{
                            if(idButton==='close'){
                                setIsModalShowInfo(!isModalShowInfo)
                            }
                        }}
                    />

                    <Button txtLabel='Open Modal Success' onClick={()=>{setIsModalShowSuccess(!isModalShowSuccess)}}/>
                    <Modal
                        type="success"
                        isOpen={isModalShowSuccess}
                        setIsOpen={setIsModalShowSuccess}
                        txtTitle="Success Modal!"
                        txtContent="Did something. Good job."
                        buttonList={[
                            {id:'close', txtLabel:'Close'}
                        ]}
                        onClickButton={(idButton:string)=>{
                            if(idButton==='close'){
                                setIsModalShowSuccess(!isModalShowSuccess)
                            }
                        }}
                    />

                    <Button txtLabel='Open Modal Warning' onClick={()=>{setIsModalShowWarning(!isModalShowWarning)}}/>
                    <Modal
                        type="warning"
                        isOpen={isModalShowWarning}
                        setIsOpen={setIsModalShowWarning}
                        txtTitle="Warning Modal!"
                        txtContent="Caution. Things might get high wire if mistake were made."
                        buttonList={[
                            {id:'close', txtLabel:'Close'}
                        ]}
                        onClickButton={(idButton:string)=>{
                            if(idButton==='close'){
                                setIsModalShowWarning(!isModalShowWarning)
                            }
                        }}
                    />

                    <Button txtLabel='Open Modal Danger' onClick={()=>{setIsModalShowDanger(!isModalShowDanger)}}/>
                    <Modal
                        type="danger"
                        isOpen={isModalShowDanger}
                        setIsOpen={setIsModalShowDanger}
                        txtTitle="Danger Modal!"
                        txtContent="Things are in danger. Something is in trouble."
                        buttonList={[
                            {id:'close', txtLabel:'Close'}
                        ]}
                        onClickButton={(idButton:string)=>{
                            if(idButton==='close'){
                                setIsModalShowDanger(!isModalShowDanger)
                            }
                        }}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Modal Page Content</span>
                <div className="preview-box">
                    <Button txtLabel='Open Modal' onClick={()=>{setIsModalShowContent(!isModalShowContent)}}/>
                    <Modal
                        isOpen={isModalShowContent}
                        setIsOpen={setIsModalShowContent}
                        txtTitle="Page In Modal"
                        txtContent="This modal has a page as its content."
                        contentPage={
                            <div style={{maxHeight:'200px', overflow:'auto'}}>
                                <p className="font-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quidem, porro ex nam libero repudiandae temporibus obcaecati laborum cumque at blanditiis officia nemo quibusdam cupiditate, sequi quaerat maiores rerum ipsa!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quo consequatur dolor excepturi deserunt saepe labore beatae quod? Beatae autem quidem fugit quae culpa blanditiis qui iste maxime earum nemo?
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, vero nobis debitis sequi nam minus in sint magnam quam placeat. Tempore natus sunt modi culpa nihil magni sed perferendis rem.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia perferendis ratione necessitatibus officiis! Quam consectetur dignissimos doloremque, animi obcaecati quis, optio ut, reiciendis maiores corporis eaque quidem libero necessitatibus nesciunt.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam saepe id facere. Nemo tempore iure amet consectetur quod. Debitis praesentium libero nam, enim reiciendis dolores rem eligendi soluta fugit voluptatibus?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt amet consectetur voluptas, ullam earum ex beatae deserunt excepturi rerum dolorum saepe, recusandae nihil fugit atque error quia quisquam minima architecto.
                                </p>
                            </div>
                        }
                        buttonList={[
                            {id:'close', txtLabel:'Close'}
                        ]}
                        onClickButton={(idButton:string)=>{
                            if(idButton==='close'){
                                setIsModalShowContent(!isModalShowContent)
                            }
                        }}
                    />
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentModalPage
import './styles.css'
import { useEffect, useState } from 'react';
import Text from '../../components/Text';
import FormField from '../../components/FormField';
import { getInitialFormStatus } from '../../untils/formUtils';
import * as controller from './controller/controller'
import { cityList } from './data/dropDownData';
import { listCheckboxes } from './data/listData';
import Button from '../../components/button';
import ButtonMenu from '../../components/buttonMenu';

const Playground = () =>{

    const [form, setForm] = useState({
		email:'',
		number:'',
		money:'',
		name:'',
		account:'',
		numberString:'',
		selection:'',
		selectionCity:'',
		checkboxe:'',
		checkboxes:'',
		leaveDate:''
	})
	const [formErrorStatus, setFormErrorStatus] = useState(getInitialFormStatus({...form}))

	const [colorList, setColorList] = useState([])
	const [colorListReady, setColorListReady] = useState(false)
	const [colorListPaginationConfig, setColorListPaginationConfig] = useState({
		searchKey:'',
		page: 0,
		maxPage: 0
	})
    const [doGetColorList, setDoGetColorList] = useState(true)

    const getState = () =>{
        return{
            form,
            setForm,
            formErrorStatus,
            setFormErrorStatus,

            colorList, 
            setColorList,
            colorListReady, 
            setColorListReady,
            colorListPaginationConfig, 
            setColorListPaginationConfig,
            doGetColorList, 
            setDoGetColorList,
        }
    }
	
	useEffect(()=>{
		if(doGetColorList){
			controller.getColorList(getState())
			setDoGetColorList(false)
		}
	},[doGetColorList])

	useEffect(()=>{
		console.log(form)
	},[form])

	return (
		<div style={{padding:'30px 30px 500px 30px'}} className='body'>
			<input id='isDarkMode' type='checkbox'/>
			<Text 
				textLabel={"Hello World asdlasjdskasd askjdhasjda aksjdhasjdhasjd asjkdhasjkdhasjkdha askjdha"}
				isBold={false}
				iconLeftName={'blank'} 
				iconRightName={'blank'}
				isEllipsistatic={true}
			/>
			<FormField
				config={{
					type:'text-no-space',//mandatory
					formLabel:'Email',
					formTooltip:'this is a email asdjasd asjdkashdjash asjh',
					isDisabled:false,
					placeholder:'Enter email',
					prefix:'',
					prefixIconName:'',
					sufix:'',
					sufixIconName:'',
					maxLength:'',
					isShowCounter:true,
					isRounded:false,
					isFullWidth:false,
					validationList:['mandatory']
				}}
				value={form['email']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('email', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('email', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['email']}
			/>
			<FormField
				config={{
					type:'text',//mandatory
					formLabel:'Name',
					formTooltip:'',
					isDisabled:false,
					placeholder:'Enter name',
					prefix:'',
					prefixIconName:'',
					sufix:'',
					sufixIconName:'',
					maxLength:40,
					isShowCounter:true,
					isRounded:false,
					isFullWidth:false,
					validationList:['mandatory']
				}}
				value={form['name']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('name', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('name', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['name']}
			/>
			<FormField
				config={{
					type:'text-number',//mandatory
					formLabel:'Number',
					formTooltip:'',
					isMinNumberZero:false,
					maxNumber:12,
					isShowCounter:true,
					isDisabled:false,
					placeholder:'Enter name',
					prefix:'',
					prefixIconName:'',
					sufix:'',
					sufixIconName:'',
					isRounded:false,
					isFullWidth:false,
					validationList:['mandatory']
				}}
				value={form['number']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('number', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('number', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['number']}
			/>
			<FormField
				config={{
					type:'text-money',//mandatory
					formLabel:'Money',
					formTooltip:'',
					isMinNumberZero:false,
					maxNumber:1000000,
					isShowCounter:true,
					isDisabled:false,
					placeholder:'Enter money',
					prefix:'',
					prefixIconName:'',
					sufix:'',
					sufixIconName:'',
					isRounded:false,
					isFullWidth:false,
					validationList:['mandatory']
				}}
				value={form['money']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('money', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('money', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['money']}
			/>
			<FormField
				config={{
					type:'text-number-dashed',//mandatory
					formLabel:'Account',
					formTooltip:'',
					isDisabled:false,
					placeholder:'Enter account number',
					prefix:'',
					prefixIconName:'',
					sufix:'',
					sufixIconName:'',
					maxLength:'',
					isRounded:false,
					isFullWidth:false,
					validationList:['mandatory']
				}}
				value={form['account']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('account', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('account', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['account']}
			/>
			<FormField
				config={{
					type:'text-number-string',//mandatory
					formLabel:'Number String',
					formTooltip:'',
					isDisabled:false,
					placeholder:'Enter account number',
					prefix:'',
					prefixIconName:'',
					sufix:'',
					sufixIconName:'',
					maxLength:'',
					isShowCounter:false,
					isRounded:false,
					isFullWidth:false,
					validationList:['mandatory']
				}}
				value={form['numberString']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('numberString', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('numberString', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['numberString']}
			/>
			<FormField
				config={{
					type:'select',//mandatory
					formLabel:'Color',
					formTooltip:'',
					selectionList:colorList,
					isDisabled:false,
					placeholder:'Select color',
					prefix:'',
					prefixIconName:'',
					isRounded:false,
					isFullWidth:false,
					isOptionReady:colorListReady,
					isAllOptionNotLoaded:colorListPaginationConfig.page!==colorListPaginationConfig.maxPage,
					validationList:['mandatory']
				}}
				value={form['selection']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('selection', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('selection', newValue, validationList, getState())}}
				onLoadMoreOption={()=>{controller.loadMoreColorList(getState())}}
				onSearchOption = {(searchKey)=>{controller.searchColorList(searchKey, getState())}}
				formErrorStatus={formErrorStatus['selection']}
			/>
			<FormField
				config={{
					type:'select-multi',//mandatory
					formLabel:'Color',
					formTooltip:'',
					selectionList:cityList,
					maxSelect:3,
					isDisabled:false,
					placeholder:'Select city',
					prefix:'',
					prefixIconName:'',
					isRounded:false,
					isFullWidth:false,
					isOptionReady:true,
					isAllOptionNotLoaded:false,
					validationList:['mandatory']
				}}
				value={form['selectionCity']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('selectionCity', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('selectionCity', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['selectionCity']}
			/>
			<FormField
				config={{
					type:'date-picker',//mandatory
					typeDatepicker:'date-range', // 'date-range' or ''
					formLabel:'Tanggal Berangkat',
					maxSelect:7,
					dayOpenBeforeToday:'',
					dayOpenAfterToday:'',
					isDisabled:false,
					placeholder:'Select Date',
					isFullWidth:false,
					isRounded:false,
					validationList:['mandatory']
				}}
				value={form['leaveDate']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('leaveDate', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('leaveDate', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['leaveDate']}
			/>
			<FormField
				config={{
					type:'check-box',//mandatory
					formLabel:'',
					label:'I accep the agreement askjads asjkdasjkd asjdhasjkda askjdhasjkd asjkdhasj askjdhasjdhsakj',
					isEllipsistatic:false,
					validationList:['mandatory']
				}}
				value={form['checkboxe']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('checkboxe', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('checkboxe', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['checkboxe']}
			/>
			<FormField
				config={{
					type:'check-box-group',//mandatory
					formLabel:'',
					listCheckbox:listCheckboxes,
					isEllipsistatic:false,
					validationList:['mandatory']
				}}
				value={form['checkboxes']}
				onChangeField={(newValue)=>{controller.onChangeFieldValue('checkboxes', newValue, getState())}}
				onValidateFileld={(newValue, validationList)=>{controller.onValidateFileldValue('checkboxes', newValue, validationList, getState())}}
				formErrorStatus={formErrorStatus['checkboxes']}
			/>
			<div style={{display:'flex', flexDirection:'column', width:'max-content', gap:'8px', margin:'10px 0px'}}>
				<Button label={'Hello'} size='small' iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} size='medium' iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} size='large' iconLeftName={''} isDisabled={true}/>
				<Button size='' iconLeftName={'info'} isDisabled={true}/>
				<Button size='small' iconLeftName={'info'} isDisabled={true}/>
				<Button size='medium' iconLeftName={'info'} isDisabled={true}/>
				<Button size='large' iconLeftName={'info'} isDisabled={true}/>
			</div>
			<div style={{display:'flex', flexDirection:'column', width:'max-content', gap:'8px', margin:'10px 0px'}}>
				<Button label={'Hello'} size='small' iconLeftName={''} isDisabled={false}/>
				<Button label={'Hello'} iconLeftName={''} isDisabled={false}/>
				<Button label={'Hello'} size='medium' iconLeftName={''} isDisabled={false}/>
				<Button label={'Hello'} size='large' iconLeftName={''} isDisabled={false}/>
				<Button size='' iconLeftName={'info'} isDisabled={false}/>
				<Button size='small' iconLeftName={'info'} isDisabled={false}/>
				<Button size='medium' iconLeftName={'info'} isDisabled={false}/>
				<Button size='large' iconLeftName={'info'} isDisabled={false}/>
			</div>


			<div style={{display:'flex', flexDirection:'column', width:'max-content', gap:'8px', margin:'10px 0px'}}>
				<Button label={'Hello'} type={'primary'} size='small' iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} type={'primary'} iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} type={'primary'} size='medium' iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} type={'primary'} size='large' iconLeftName={''} isDisabled={true}/>
				<Button size='' type={'primary'} iconLeftName={'info'} isDisabled={true}/>
				<Button size='small' type={'primary'} iconLeftName={'info'} isDisabled={true}/>
				<Button size='medium' type={'primary'} iconLeftName={'info'} isDisabled={true}/>
				<Button size='large' type={'primary'} iconLeftName={'info'} isDisabled={true}/>
			</div>
			<div style={{display:'flex', flexDirection:'column', width:'max-content', gap:'8px', margin:'10px 0px'}}>
				<Button label={'Hello asdasda asdasdas asdas'} type={'primary'} size='small' iconLeftName={''}/>
				<Button label={'Hello'} type={'primary'} iconLeftName={''}/>
				<Button label={'Hello'} type={'primary'} iconLeftName={''} color={'danger'}/>
				<Button label={'Hello'} type={'primary'} iconLeftName={''} color={'warning'}/>
				<Button label={'Hello'} type={'primary'} size='medium' iconLeftName={''} color={'success'}/>
				<Button label={'Hello'} type={'primary'} size='large' iconLeftName={''}/>
				<Button size='' type={'primary'} iconLeftName={'info'} />
				<Button size='small' type={'primary'} iconLeftName={'info'} />
				<Button size='medium' type={'primary'} iconLeftName={'info'} />
				<Button size='large' type={'primary'} iconLeftName={'info'} />
			</div>

			<div style={{display:'flex', flexDirection:'column', width:'max-content', gap:'8px', margin:'10px 0px'}}>
				<Button label={'Hello'} type={'secondary'} size='small' iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} type={'secondary'} iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} type={'secondary'} size='medium' iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} type={'secondary'} size='large' iconLeftName={''} isDisabled={true}/>
				<Button size='' type={'secondary'} iconLeftName={'info'} isDisabled={true}/>
				<Button size='small' type={'secondary'} iconLeftName={'info'} isDisabled={true}/>
				<Button size='medium' type={'secondary'} iconLeftName={'info'} isDisabled={true}/>
				<Button size='large' type={'secondary'} iconLeftName={'info'} isDisabled={true}/>
			</div>
			<div style={{display:'flex', flexDirection:'column', width:'max-content', gap:'8px', margin:'10px 0px'}}>
				<Button label={'Hello'} type={'secondary'} size='small' iconLeftName={''} isDisabled={false}/>
				<Button label={'Hello'} type={'secondary'} iconLeftName={''} isDisabled={false} color={'danger'}/>
				<Button label={'Hello'} type={'secondary'} iconLeftName={''} isDisabled={false} color={'warning'}/>
				<Button label={'Hello'} type={'secondary'} size='medium' iconLeftName={''} isDisabled={false} color={'success'}/>
				<Button label={'Hello'} type={'secondary'} size='large' iconLeftName={''} isDisabled={false}/>
				<Button size='' type={'secondary'} iconLeftName={'info'} isDisabled={false}/>
				<Button size='small' type={'secondary'} iconLeftName={'info'} isDisabled={false}/>
				<Button size='medium' type={'secondary'} iconLeftName={'info'} isDisabled={false}/>
				<Button size='large' type={'secondary'} iconLeftName={'info'} isDisabled={false}/>
			</div>

			<div style={{display:'flex', flexDirection:'column', width:'max-content', gap:'8px', margin:'10px 0px'}}>
				<Button label={'Hello'} type={'text'} size='small' iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} type={'text'} iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} type={'text'} size='medium' iconLeftName={''} isDisabled={true}/>
				<Button label={'Hello'} type={'text'} size='large' iconLeftName={''} isDisabled={true}/>
				<Button size='' type={'text'} iconLeftName={'info'} isDisabled={true}/>
				<Button size='small' type={'text'} iconLeftName={'info'} isDisabled={true}/>
				<Button size='medium' type={'text'} iconLeftName={'info'} isDisabled={true}/>
				<Button size='large' type={'text'} iconLeftName={'info'} isDisabled={true}/>
			</div>
			<div style={{display:'flex', flexDirection:'column', width:'max-content', gap:'8px', margin:'10px 0px'}}>
				<Button label={'Hello'} type={'text'} size='small' iconLeftName={''} isDisabled={false}/>
				<Button label={'Hello'} type={'text'} iconLeftName={''} isDisabled={false}/>
				<Button label={'Hello'} type={'text'} size='medium' iconLeftName={''} isDisabled={false}/>
				<Button label={'Hello'} type={'text'} size='large' iconLeftName={''} isDisabled={false}/>
				<Button size='' type={'text'} iconLeftName={'info'} isDisabled={false}/>
				<Button size='small' type={'text'} iconLeftName={'info'} isDisabled={false}/>
				<Button size='medium' type={'text'} iconLeftName={'info'} isDisabled={false}/>
				<Button size='large' type={'text'} iconLeftName={'info'} isDisabled={false}/>
			</div>

			<ButtonMenu/>
			<ButtonMenu isActive={true}/>

			




		</div>
	);
}

export default Playground
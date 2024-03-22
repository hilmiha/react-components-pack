import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { PiAppWindow, PiDotsThreeOutlineVerticalFill, PiPencilSimpleLine, PiStarFourFill } from "react-icons/pi";
import Button from '../components/button';
import IconButton from '../components/icon-button';
import DropdownMenu from '../components/dropdown-menu';
import SplitButton from '../components/split-button';
import ButtonGroup from '../components/button-group';
import TextField from '../components/text-field';
import { generateErrorState } from '../helper';
import SelectionField, { selectionValueType } from '../components/selection-field';
import { datePickerValueType } from '../components/date-picker';
import DatePickerField from '../components/date-picker-field';
import Image from '../components/image';
import Modal from '../components/modal';
import Drawer from '../components/drawer';
import { GlobalContext, GlobalContextType } from '../context/globalcontext';
import { useNavigate } from 'react-router-dom';

function Playground() {
    const {
        changeTheme,
		globalModal, 
        setGlobalModal,
		setIsShowGlobalModal
    } = React.useContext(GlobalContext) as GlobalContextType;
    
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [isDrawerOpenTwo, setIsDrawerOpenTwo] = useState(false)

	const navigate = useNavigate()

	type test = {
		name?: string,
		email?: string
		kode?: string
		harga?: string
		kota?: selectionValueType[],
		kelas?: selectionValueType[],
		jadwal?: datePickerValueType
	}
	type errorTest = Record<keyof test, {isError:boolean, errorMessage:string}>
	
	const [form, setForm] = useState<test>({
		name:'',
		email:'',
		kode:'',
		harga:'',
		kota:[],
		kelas:[],
		jadwal:undefined
	})

	const [formError, setFormError] = useState<errorTest>(generateErrorState(form))
	
	const onChangeForm = (key:keyof test, newValue:any) =>{
		const formTamp = {...form}
		formTamp[key] = newValue
		setForm(formTamp)

		const formErrorTamp = {...formError}
		formErrorTamp[key] = {isError:false, errorMessage:''}
		setFormError(formErrorTamp)
	}

	const onValidateForm = (key:keyof test, errorResult: any) =>{
		const formErrorTamp = {...formError}
		formErrorTamp[key] = errorResult
		setFormError(formErrorTamp)
	}

	// useEffect(()=>{
	// 	console.log(form)
	// },[form])

	return (
		<div>
			<div style={{minHeight:'100vh', padding:'20px 20px', display:'flex', justifyContent:'center', alignItems:'start', flexDirection:'column', gap:'6px'}}>
				<div style={{display:'flex'}}>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-0))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-100))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-200))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-300))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-400))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-500))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-600))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-700))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-800))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-900))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-1000))'}}></div>
					<div style={{width:'24px', height:'24px', backgroundColor:'hsl(var(--color-neutral-1100))'}}></div>
				</div>
				{/* <TextField
					txtLabel='Name'
					type='text'
					value={form['name']}
					onChange={(newValue)=>{onChangeForm('name', newValue)}}
					onValidate={(errorResult, newValue)=>{onValidateForm('name', errorResult)}}
					config={{
						placeholder:'Isi Nama...',
						isMandatory:true,
						maxLength:undefined,
						prefix:undefined,
						sufix:undefined,
					}}
					error={formError['name']}
				/>
				<SelectionField
					txtLabel='Sleectiom'
					type='multi-selection'
					value={form['kota']}
					onChange={(newValue)=>{onChangeForm('kota', newValue)}}
					valueList={[
						{
							id:'group=1',
							menu:[
								{id:'1', txtLabel:'Jakarta', value:'jakarta'},
								{id:'2', txtLabel:'Medan', value:'medan'},
								{id:'3', txtLabel:'Surabaya', value:'surabaya'},
								{id:'4', txtLabel:'Makasar', value:'makasar'},
								{id:'5', txtLabel:'Bali', value:'bali'},
							]
						}
					]}
					config={{
						placeholder:'Select Kota...',
						isWithSearch:true,
						isMandatory:true,
						prefix:undefined,
						sufix:undefined,
					}}
				/>
				<SelectionField
					txtLabel='Sleectiom'
					type='selection'
					value={form['kelas']}
					onChange={(newValue)=>{onChangeForm('kelas', newValue)}}
					valueList={[
						{
							id:'group=1',
							menu:[
								{id:'1', txtLabel:'Small', value:'small'},
								{id:'2', txtLabel:'Medium', value:'medium'},
								{id:'3', txtLabel:'Big', value:'Big'},
								{id:'4', txtLabel:'Ektsra Big', value:'eks-big'}
							]
						}
					]}
					config={{
						placeholder:'Select Kota...',
						isMandatory:true,
						prefix:undefined,
						sufix:undefined,
					}}
				/>
				<DatePickerField
					type='range'
					txtLabel='Jadwal'
					value={form['jadwal']}
					onChange={(newValue)=>{onChangeForm('jadwal', newValue)}}
					config={{
						placeholder:'Select date',
						isMandatory:true,
						daysAfterToday:30,
						daysBeforeToday:30,
						maxSelection:4
					}}
				/>
				<TextField
					txtLabel='Email'
					type='text-no-space'
					value={form['email']}
					onChange={(newValue)=>{onChangeForm('email', newValue)}}
					onValidate={(errorResult, newValue)=>{onValidateForm('email', errorResult)}}
					config={{
						placeholder:'Isi Nama...',
						isMandatory:true,
						maxLength:undefined,
						prefix:undefined,
						sufix:undefined,
						regex:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Email please!']
					}}
					error={formError['email']}
				/>

				<TextField
					txtLabel='Number Code'
					type='text-only-number'
					value={form['kode']}
					onChange={(newValue)=>{onChangeForm('kode', newValue)}}
					onValidate={(errorResult, newValue)=>{onValidateForm('kode', errorResult)}}
					config={{
						isMandatory:true,
						maxLength:undefined,
						prefix:undefined,
						sufix:undefined
					}}
					error={formError['kode']}
				/>	

				<TextField
					txtLabel='Harga'
					type='text-number'
					value={form['harga']}
					onChange={(newValue)=>{onChangeForm('harga', newValue)}}
					onValidate={(errorResult, newValue)=>{onValidateForm('harga', errorResult)}}
					config={{
						isMandatory:true,
						minValue:undefined,
						maxValue:undefined,
						maxLength:undefined,
						prefix:undefined,
						sufix:undefined
					}}
					error={formError['harga']}
				/>	 */}

				<div
					style={{
						width:'200px',
						height:'200px'
					}}
				>
					<Image 
						srcImage='https://atlassian.design/static/cat-3c9ab2a38b89e9a0529da153b46fbfa58701738356a8e2fede5336d676acd3fb.png'
						srcImageDark='https://atlassian.design/static/dark-mode-cat-a6a9dfa18e99154d13c99c4f37840669dbf5f7aca819a0ff28afc72f9dfa6c31.png'
						alt='cat image'
						height={'100%'}
						width={'100%'}
						radius={'4'}
						objectFit='cover'
					/>
				</div>
				<span style={{fontSize:'var(--font-size-small)', color:'hsl(var(--color-neutral-1100))'}}>The quick brown fox jumps over the lazy dog</span>
				<span style={{fontSize:'var(--font-size-regular)', color:'hsl(var(--color-neutral-1100))'}}>The quick brown fox jumps over the lazy dog</span>
				<span style={{fontSize:'var(--font-size-large)', color:'hsl(var(--color-neutral-1100))'}}>The quick brown fox jumps over the lazy dog</span>
				<span style={{fontSize:'var(--font-size-larger)', color:'hsl(var(--color-neutral-1100))'}}>The quick brown fox jumps over the lazy dog</span>
				<span style={{fontSize:'var(--font-size-largest)', color:'hsl(var(--color-neutral-1100))'}}>The quick brown fox jumps over the lazy dog</span>
				
				<Button 
					txtLabel='Go to /TablePage'
					onClick={()=>{navigate('/table')}}
				/>

				<Button 
					IconBefore={PiPencilSimpleLine}
					txtLabel='Open Modal'
					onClick={()=>{
						setIsShowGlobalModal(true)
						setGlobalModal({
							type:'warning',
							txtTitle:'Delete Item Confirmation',
							txtContent:'Are you sure want to delete',
							buttonList:[
								{id:'confirm', txtLabel:'Comfirm', appearance:'primary'},
								{id:'cancel', txtLabel:'Cancel', appearance:'subtle'}
							],
							onClickButton:(idButton:string)=>{
								switch (idButton) {
									default:
										console.log(idButton)
										break;
								}
							}
						})
					}}
				/>
				<Button 
					IconBefore={PiPencilSimpleLine}
					txtLabel='Open Drawer'
					onClick={()=>{setIsDrawerOpen(true)}}
				/>
				<Drawer
					id='one'
					drawerSize='small'
					drawerSide='left'
					txtTitle='Filter by'
					isOpen={isDrawerOpen}
					setIsOpen={setIsDrawerOpen}
					onClickButton={(idButton:string)=>{
						switch (idButton) {
							case 'cancel':
								setIsDrawerOpen(false)
								break;
							
							case 'aply':
								setIsDrawerOpenTwo(true)
								break;
						
							default:
								setIsDrawerOpen(false)
								break;
						}
					}}
					buttonList={[
						{id:'aply', txtLabel:'Apply Filter', appearance:'primary'},
						{id:'clear', txtLabel:'Clear Filter', appearance:'subtle'}
					]}
					contentPage={
						<div style={{display:'grid', gridTemplateColumns:'1fr', gap:'24px'}}>
							<TextField
								txtLabel='Name'
								type='text'
								value={form['name']}
								onChange={(newValue)=>{onChangeForm('name', newValue)}}
								onValidate={(errorResult, newValue)=>{onValidateForm('name', errorResult)}}
								config={{
									placeholder:'Isi Nama...',
									// isMandatory:true,
									maxLength:undefined,
									prefix:undefined,
									sufix:undefined,
								}}
								error={formError['name']}
							/>
							<SelectionField
								txtLabel='Selectiom'
								type='multi-selection'
								value={form['kota']}
								onChange={(newValue)=>{onChangeForm('kota', newValue)}}
								valueList={[
									{
										id:'group=1',
										menu:[
											{id:'1', txtLabel:'Jakarta', value:'jakarta'},
											{id:'2', txtLabel:'Medan', value:'medan'},
											{id:'3', txtLabel:'Surabaya', value:'surabaya'},
											{id:'4', txtLabel:'Makasar', value:'makasar'},
											{id:'5', txtLabel:'Bali', value:'bali'},
											{id:'6', txtLabel:'Banjarmasin', value:'banjarmasin'},
											{id:'7', txtLabel:'Pekanbaru', value:'pekanbaru'},
											{id:'8', txtLabel:'Padang', value:'padang'},
											{id:'9', txtLabel:'Pontianak', value:'pontianak'},
											{id:'10', txtLabel:'Merauke', value:'merauke'},
											{id:'11', txtLabel:'Aceh', value:'aceh'},
											{id:'12', txtLabel:'Balikpapan', value:'balikpapan'},
										]
									}
								]}
								config={{
									placeholder:'Select Kota...',
									isWithSearch:true,
									// isMandatory:true,
									prefix:undefined,
									sufix:undefined,
								}}
							/>
							<SelectionField
								txtLabel='Sleectiom'
								type='selection'
								value={form['kelas']}
								onChange={(newValue)=>{onChangeForm('kelas', newValue)}}
								valueList={[
									{
										id:'group=1',
										menu:[
											{id:'1', txtLabel:'Small', value:'small'},
											{id:'2', txtLabel:'Medium', value:'medium'},
											{id:'3', txtLabel:'Big', value:'Big'},
											{id:'4', txtLabel:'Ektsra Big', value:'eks-big'}
										]
									}
								]}
								config={{
									placeholder:'Select Kota...',
									// isMandatory:true,
									prefix:undefined,
									sufix:undefined,
								}}
							/>
							<DatePickerField
								type='range'
								txtLabel='Jadwal'
								value={form['jadwal']}
								onChange={(newValue)=>{onChangeForm('jadwal', newValue)}}
								config={{
									placeholder:'Select date',
									// isMandatory:true,
									// daysAfterToday:0,
									daysBeforeToday:30,
									maxSelection:4
								}}
							/>
						</div>
					}
				/>
				<Drawer
					id='two'
					drawerSize='small'
					drawerSide='right'
					txtTitle='Filter by'
					isOpen={isDrawerOpenTwo}
					setIsOpen={setIsDrawerOpenTwo}
					onClickButton={(idButton:string)=>{
						switch (idButton) {
							
							default:
								setIsDrawerOpenTwo(false)
								break;
						}
					}}
					buttonList={[
						{id:'close', txtLabel:'Close', appearance:'subtle'}
					]}
					contentPage={
						<div style={{display:'grid', gridTemplateColumns:'1fr', gap:'24px'}}>
							apoen1
						</div>
					}
				/>
				<IconButton
					Icon={PiStarFourFill}
				/>
				<Button 
					txtLabel='Hello World'
					onClick={()=>{changeTheme()}}
				/>
				<Button 
					txtLabel='Hello World'
					spacing='compact'
					onClick={()=>{console.log('hello')}}
				/>

				<IconButton
					Icon={PiStarFourFill}
					appearance='primary'
				/>
				<Button 
					txtLabel='Hello World'
					appearance='primary'
					onClick={()=>{changeTheme()}}
				/>
				<Button 
					txtLabel='Hello World'
					appearance='primary'
					spacing='compact'
					onClick={()=>{console.log('hello')}}
				/>

				<IconButton
					Icon={PiStarFourFill}
					appearance='subtle'
				/>
				<Button 
					txtLabel='Hello World'
					appearance='subtle'
					onClick={()=>{changeTheme()}}
				/>
				<Button 
					txtLabel='Hello World'
					appearance='subtle'
					spacing='compact'
					onClick={()=>{console.log('hello')}}
				/>

				<Button 
					txtLabel='Hello World'
					appearance='link'
					onClick={()=>{changeTheme()}}
				/>
				<Button 
					txtLabel='Hello World'
					appearance='link'
					spacing='compact'
					onClick={()=>{console.log('hello')}}
				/>

				<Button 
					txtLabel='Hello World'
					appearance='subtle-link'
					onClick={()=>{changeTheme()}}
				/>
				<Button 
					txtLabel='Hello World'
					appearance='subtle-link'
					spacing='compact'
					onClick={()=>{console.log('hello')}}
				/>

				<DropdownMenu 
					IconLabel={PiDotsThreeOutlineVerticalFill}
					onClickItem={(buttonId)=>{console.log(buttonId)}}
					txtLabel='More'
					menuList={[
						{
							id:'menu-1',
							menu:[
								{id:'edit', txtLabel:'Edit'}
							]
						},
						{
							id:'menu-2',
							menu:[
								{id:'delete', txtLabel:'Delete'},
								{id:'report', txtLabel:'Report'}
							]
						}
					]}
				/>

				<SplitButton
					onClick={()=>{console.log('Main Button')}}
					onClickItem={(idButton)=>{console.log(idButton)}}
					txtLabel='Hellow'
					menuList={
						[
							{
								id:'menu-1',
								menu:[
									{id:'create', txtLabel:'Create'},
									{id:'filter', txtLabel:'Filter'},
									{id:'edit', txtLabel:'Edit'}
								]
							},
							{
								id:'menu-2',
								menu:[
									{id:'delete', txtLabel:'Delete'},
									{id:'report', txtLabel:'Report'}
								]
							}
						]
					}
				/>

				<ButtonGroup>
					<IconButton
						Icon={PiStarFourFill}
						appearance='warning'
					/>
					<Button 
						txtLabel='Hello World'
						appearance='warning'
						onClick={()=>{changeTheme()}}
					/>
					<SplitButton
						appearance='warning'
						onClick={()=>{console.log('Main Button')}}
						onClickItem={(idButton)=>{console.log(idButton)}}
						txtLabel='Hellow'
						menuList={[
							{
								id:'menu-1',
								menu:[
									{id:'edit', txtLabel:'Edit', isDisabled:true}
								]
							},
							{
								id:'menu-2',
								menu:[
									{id:'delete', txtLabel:'Delete'},
									{id:'report', txtLabel:'Report'}
								]
							}
						]}
					/>
				</ButtonGroup>

				<ButtonGroup>
					<IconButton
						Icon={PiStarFourFill}
						appearance='warning'
						spacing='compact'
					/>
					<Button 
						txtLabel='Hello World'
						appearance='warning'
						spacing='compact'
						onClick={()=>{changeTheme()}}
					/>
					<SplitButton
						appearance='warning'
						spacing='compact'
						onClick={()=>{console.log('Main Button')}}
						onClickItem={(idButton)=>{console.log(idButton)}}
						txtLabel='Hellow'
						menuList={[
							{
								id:'menu-1',
								menu:[
									{id:'edit', txtLabel:'Edit', isDisabled:true}
								]
							},
							{
								id:'menu-2',
								menu:[
									{id:'delete', txtLabel:'Delete'},
									{id:'report', txtLabel:'Report'}
								]
							}
						]}
					/>
				</ButtonGroup>

				<ButtonGroup>
					<IconButton
						Icon={PiStarFourFill}
						appearance='danger'
					/>
					<Button 
						txtLabel='Hello World'
						appearance='danger'
						onClick={()=>{changeTheme()}}
					/>
					<SplitButton
						appearance='danger'
						onClick={()=>{console.log('Main Button')}}
						onClickItem={(idButton)=>{console.log(idButton)}}
						txtLabel='Hellow'
						menuList={[
							{
								id:'menu-1',
								menu:[
									{id:'edit', txtLabel:'Edit', isDisabled:true}
								]
							},
							{
								id:'menu-2',
								menu:[
									{id:'delete', txtLabel:'Delete'},
									{id:'report', txtLabel:'Report'}
								]
							}
						]}
					/>
				</ButtonGroup>

				<ButtonGroup>
					<IconButton
						Icon={PiStarFourFill}
						appearance='danger'
						spacing='compact'
					/>
					<Button 
						txtLabel='Hello World'
						appearance='danger'
						spacing='compact'
						onClick={()=>{changeTheme()}}
					/>
					<SplitButton
						appearance='danger'
						spacing='compact'
						onClick={()=>{console.log('Main Button')}}
						onClickItem={(idButton)=>{console.log(idButton)}}
						txtLabel='Hellow'
						menuList={[
							{
								id:'menu-1',
								menu:[
									{id:'edit', txtLabel:'Edit', isDisabled:true}
								]
							},
							{
								id:'menu-2',
								menu:[
									{id:'delete', txtLabel:'Delete'},
									{id:'report', txtLabel:'Report'}
								]
							}
						]}
					/>
				</ButtonGroup>

				<IconButton
					Icon={PiStarFourFill}
					isSelected
					appearance='danger'
				/>	
				<Button 
					txtLabel='Hello World'
					isSelected
					onClick={()=>{changeTheme()}}
				/>
				<Button 
					txtLabel='Hello World'
					isSelected
					spacing='compact'
				/>

				<IconButton
					Icon={PiStarFourFill}
					isDisabled={true}
				/>
				<Button 
					txtLabel='Hello World'
					isDisabled={true}
					onClick={()=>{changeTheme()}}
				/>
				<Button 
					txtLabel='Hello World'
					spacing='compact'
					isDisabled={true}
					onClick={()=>{console.log('hello')}}
				/>

			</div>
		</div>
	);
}

export default Playground;

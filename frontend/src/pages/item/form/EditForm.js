import React, { useState, useEffect } from 'react'
import { TextField, withStyles, Button, MenuItem, Paper, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import * as actions from "../../../actions/item";
import PageTitle from "../../../components/PageTitle/PageTitle";
import '../style.css';

const styles = theme => ({
	paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
		justifyContent: 'center',
    },
    postBtn: {
        width: "200px",
        marginTop: "30px",
        marginBottom: "20px"
    }
})

const initialFormState = { 
	id: null, 
	name: "",
	desc: "",
	price: "",
	quantity: "",
	quote: "",
}

const EditForm = ({ classes, ...props }) => {
	const [ item, setItem ] = useState(initialFormState)
	const [ errors, setErrors ] = useState({})
	
	useEffect(() => {
		const onSuccess = (item) => {
            setItem(item)
		}
		const id = props.match.params.id
		props.fetchById(id, onSuccess)
	}, [])

	const validate = () => {
        let tempErrors = {};
        let formIsValid = true;

        if(!item.name || item.name.trim() ===  ""){
			formIsValid = false;
			tempErrors["name"] = "Cannot be empty";
		}
		if(!item.desc || item.desc.trim() ===  ""){
			formIsValid = false;
			tempErrors["desc"] = "Cannot be empty";
		}
	
		if(!item.price ){
			formIsValid = false;
			tempErrors["price"] = "Cannot be empty";
		}

		if(!item.quantity ){
			formIsValid = false;
			tempErrors["quantity"] = "Cannot be empty";
		}

      
		if(!item.quote){
			formIsValid = false;
			tempErrors["quote"] = "Cannot be empty";
		}

		setErrors(tempErrors);
		return formIsValid;
    }

	const handleInputChange = event => {
		const { name,value } = event.target
		   setItem({ ...item, [ name ]: value })
	}
	
	const handleSubmit = (e) => {
		const onSuccess = () => {
			props.history.push("/admin/item")
			toast.success('Data succesfully updated');
		}
        e.preventDefault();

		if(validate()){
			props.update(item.id, item, onSuccess)
        }

    }

	return (
		<React.Fragment>
            <PageTitle title="Add Item" />
            <Grid container spacing={4} >

				<Paper className={classes.paper}>

				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit} component={Paper} >
					<TextField
						name="name"
						variant="outlined"
						label="Name"
						fullWidth
						onChange={handleInputChange}
						value={item.name}
						{...(errors.name && { error: true, helperText: errors.name })}
					/>
				
					<TextField
						name="desc"
						variant="outlined"
						label="Description"
						fullWidth
						multiline
						rows={5}
						onChange={handleInputChange}
						value={item.desc}
						{...(errors.desc && { error: true, helperText: errors.desc })}
					/>
					<TextField
						name="price"
						variant="outlined"
						label="price"
						type="number"
						fullWidth
						onChange={handleInputChange}
						value={item.price}
						{...(errors.price && { error: true, helperText: errors.price })}
					/>
					<TextField
						name="quantity"
						variant="outlined"
						label="quantity"
						type="number"
						fullWidth
						onChange={handleInputChange}
						value={item.quantity}
						{...(errors.quantity && { error: true, helperText: errors.quantity })}
					/>

                   <TextField
						multiline
						rows={3}
						name="quote"
						variant="outlined"
						label="quote"
						onChange={handleInputChange}
						fullWidth
						value={item.quote}
						
						{...(errors.quote && { error: true, helperText: errors.quote })}
					/>
				
				<div className="form-button-container">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => props.history.push("/admin/item")}
						>Cancel</Button>

						<Button
							variant="contained"
							color="secondary"
							size="large"
							type="submit"
						>Save</Button>
					</div>
				
				</form>

				</Paper>
			</Grid>
		</React.Fragment>
    );
}

const itemStateToProps = state => ({
    itemList: state.item.list
})

const itemActionToProps = {
	fetchById: actions.fetchById,
	update: actions.update
}

export default connect(itemStateToProps, itemActionToProps)(withStyles(styles)(EditForm));

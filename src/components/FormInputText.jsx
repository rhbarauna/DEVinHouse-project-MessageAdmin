import { FormControl, TextField, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(
  (theme) => ({
    formControl: {
      marginBottom: '10px'
    }
  })
)

const FormInputText = ({name, id, error= false, label, value, onChange, errorMessage='', ...props}) => {
  const classes = useStyles();
  return (
    <>
    <FormControl fullWidth className={classes.formControl}>
      <TextField
        id={id}
        name={name}
        error={!!errorMessage || error}
        helperText={errorMessage}
        label={label}
        value={value}
        onChange={onChange}
        variant='outlined'
        {...props}
      />  
    </FormControl>
    </>
  )
}

export default FormInputText
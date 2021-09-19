import { FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, Select} from '@material-ui/core';

const useStyles = makeStyles(
  (theme) => ({
    formControl: {
      marginBottom: '10px'
    }
  })
)

const FormSelect = ({name, id, label, value, options, onChange, errorMessage=''}) => {
  const classes = useStyles();
  return (
    <>
    <FormControl fullWidth variant="outlined"
            error={!!errorMessage}
            className={classes.formControl}
          >
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
              label={label}
              value={value}
              onChange={onChange}
              inputProps={{
                name: {name},
                id: {id},
              }}
            >
              <MenuItem aria-label='None' value="" />
              {
                options.map((opt, idx) => (
                  <MenuItem key={idx} value={opt.name}>
                    {opt.name}
                  </MenuItem>
                ))
              }
            </Select>
            <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </>
  )
}

export default FormSelect
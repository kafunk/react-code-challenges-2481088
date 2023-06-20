import { useState } from 'react'

export default function FormValidator () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {

    // prevent the browser from reloading the page
    e.preventDefault();

    // validate email input: not blank, exactly one @ sign
    if (!email) {
      errors.email = "Email is required."
    } else if (!(/^[^@]+@[^@]+$/.test(email))) {
      errors.email = "Email address is invalid."
    } else {
      delete errors.email;
    }

    // validate password input: not blank, 8+ chars, confirmed password identical
    if (!password) {
      errors.password = "Password is required."
    } else if (password.length < 8) {
      errors.password = "Password must be a minimum of 8 characters."
    } else if (password !== passwordConfirm) {
      errors.password = "Passwords do not match."
    } else {
      delete errors.password;
    }

    // update validity state + error messages as applicable
    setErrors({...errors});
    (Object.entries(errors).length == 0) ? setFormIsValid(true) : setFormIsValid(false);

    // update submitted state to show result msg div
    setFormSubmitted(true)

    // actually do something with form data
    // ...

  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Sign Up!</h2>
      {formSubmitted && (
        formIsValid ?
          (<div className='successMsg'>User created!</div>)
        :
          (<div className='errorMsg'>
            <h4>Form has errors:</h4>
            <ul>
              {Object.entries(errors).map(([key, value]) => (<li key={key} className="errorMsg">{value}</li>))}
            </ul>
          </div>)
      )}
      <label htmlFor='email'>Email</label>
      <input
        type='email' name='email'
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password' name='password'
        onChange={e => setPassword(e.target.value)}
      />
      <label htmlFor='password-confirm'>Confirm Password</label>
      <input
        type='password' name='password-confirm'
        onChange={e => setPasswordConfirm(e.target.value)}
      />
      <input type='submit' value='Submit' />
    </form>
  )
}

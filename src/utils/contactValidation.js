const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9+\-\s]{7,15}$/

export const initialContactForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

export function validateContactForm(formData) {
  const errors = {}

  if (!formData.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!formData.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!emailPattern.test(formData.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Please enter your phone number.'
  } else if (!phonePattern.test(formData.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!formData.message.trim()) {
    errors.message = 'Please enter your message.'
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters long.'
  }

  return errors
}

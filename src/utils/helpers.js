export const bindNumberInput = (event) => {
    const allowedCharacters = /[0-9\.]|Backspace/;
  
    const key = String.fromCharCode(event.charCode);
  
    if (!allowedCharacters.test(key)) {
      event.preventDefault();
      return false;
    }
      if (key === '.' && event.target.value.includes('.')) {
      event.preventDefault();
      return false;
    }
      const valueParts = event.target.value.split('.');
    if (valueParts[0].length >= 2 && key !== '.' && event.selectionStart <= valueParts[0].length) {
      event.preventDefault();
      return false;
    }
      if (valueParts[1] && valueParts[1].length >= 1 && key !== '.' && event.selectionStart > valueParts[0].length) {
      event.preventDefault();
      return false;
    }
  };
  

  export function convertObjectToFormData(object, formDATA) {
    const formData = new FormData()
  
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key]
  
        if (value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formDATA ? formData.append(`${key}`, item) : formData.append(`${key}[${index}]`, item)
            })
          } else if (typeof value === 'object' && value !== null) {
            // Nested object
            const nestedFormData = convertObjectToFormData(value)
            for (const [nestedKey, nestedValue] of nestedFormData.entries()) {
              formData.append(`${key}[${nestedKey}]`, nestedValue)
            }
          } else {
            // Primitive value
            formData.append(key, String(value))
          }
        }
      }
    }
    if (object.hasOwnProperty('image')) {
      if (typeof object['image'] === 'object') {
        formData.append('image', object['image'] || '')
      }
    }
    if (object.hasOwnProperty('file')) {
      if (typeof object['file'] === 'object') {
        formData.append('file', object['file'] || '')
      }
    }
    if (object.hasOwnProperty('video')) {
      if (typeof object['video'] === 'object') {
        formData.append('video', object['video'] || '')
      }
    }
  
    return formData
  }
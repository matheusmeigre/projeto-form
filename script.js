let MeigreValidator = {
    handleSubmit:(event)=>{
        event.preventDefault()
        let send = true

        let inputs = form.querySelectorAll('input')

        MeigreValidator.clearErrors()

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i]
            let check = MeigreValidator.checkInput(input)
            if(check !== true) {
                send = false
                MeigreValidator.showError(input, check)
            }
        }

        if(send) {
            form.submit()
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules')
        if(rules !== null) {
            rules = rules.split('|')
            for(let k in rules) {
                let rulesDetails = rules[k].split('=')
                switch(rulesDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Este campo é obrigatório!'
                        }
                    break
                    case 'min':
                        if(input.value.length < rulesDetails[1]) {
                            return 'Este campo precisa de pelo menos '+rulesDetails[1]+' caracteres'
                        }
                    break
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Campo de email inválido'
                            }
                        }
                    break
                }
            }
        }
            return true
        
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000'

        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input')
        for(let i=0;i<inputs.length;i++) {
            inputs[i].style=''
        }
        let errorElements = document.querySelectorAll('.error')
        for(i=0;i<errorElements.length;i++) {
            errorElements[i].remove()
        }
    }
}

let form  = document.querySelector('.meigrevalidator')
form.addEventListener('submit', MeigreValidator.handleSubmit)
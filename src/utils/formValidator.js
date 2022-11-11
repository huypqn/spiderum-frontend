class FormValidator {
    constructor(data) {
        this.form = data.form
        this.rules = data.rules
        this.message = `.${data.message}`
        this.css = data.css
    }

    static validateTests = {
        require: (data) => {
            return data ? undefined : "Vui lòng hoàn thành trường bắt buộc này"
        },
        email: (data) => {
            const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b$/
            return regex.test(data) ? undefined : "Email phải được định dạng chính xác."
        },
        min: (min) => {
            return (data) => {
                if (isNaN(Number(min))) {
                    throw Error(`validate rule không hợp lệ! min = ${min}`)
                }
                return data.length >= Number(min)
                    ? undefined
                    : `Vui lòng nhập tối thiểu ${min} ký tự`
            }
        },
        confirm_password: (field) => {
            const input = this.form.querySelector(`input[name=${field}], input[id=${field}]`)
            return (data) => {
                return data === input.value ? undefined : `${field.name} đã nhập không trùng khớp`
            }
            
        }
    }

    validate() {
        for (const selector in this.rules) {
            this.rules[selector] = this.rules[selector].map(rule => {
                let test
                if (typeof rule === 'string' && rule.includes(':')) {
                    const ruleData = rule.split(':')
                    rule = ruleData[0]
                    test = FormValidator.validateTests[rule](ruleData[1])
                }
                else {
                    test = FormValidator.validateTests[rule]
                }
                return test
            })

            const input = this.form.querySelector(selector)
            const formGroup = input.parentElement
            
            input.onblur = (event) => {
                this.handleValidate(event.target.value, selector, formGroup)
            }

            input.oninput = () => {
                if (formGroup.classList.contains(this.css)) {
                    this.notify(formGroup, "remove")
                }
            }
        }
    }

    notify(formGroup, type, message="") {
        if (formGroup) {
            formGroup.classList[type](this.css)
            formGroup.querySelector(this.message).innerHTML = message
        }
    }

    handleValidate(value, selector, formGroup) {
        let message
        for (const test of this.rules[selector]) {
            message = test(value)
            if (message) {
                this.notify(formGroup, "add", message)
                break
            }
            else {
                this.notify(formGroup, "remove")
            }
        }
        return !message
    }

    validateAll() {
        const fields = this.form.querySelectorAll('[name]')
        let isPassed = true
        const submitData = {}
        for (const field of fields) {
            const formGroup = field.parentElement
            const selector = `#${field.id}`
            if (!this.handleValidate(field.value, selector, formGroup)) {
                isPassed = false
            }
            submitData[field.id] = field.value
        }
        
        return {
            isPassed,
            submitData
        }
    }
}

export default FormValidator
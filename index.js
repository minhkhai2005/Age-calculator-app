const userInput = document.querySelectorAll('input[type="number"]')

userInput.forEach(function(input){
    input.addEventListener('focus', function(){
        input.previousElementSibling.removeAttribute('style')
        input.removeAttribute('style')
        input.nextElementSibling.removeAttribute('style')
        input.nextElementSibling.textContent = ''
    })
})

document.documentElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        dateValidation()
    }
})


function dateValidation (){
    // check if the inputs are valid

    const dayInput = parseInt(userInput[0].value)
    const monthInput = parseInt(userInput[1].value)
    const yearInput = parseInt(userInput[2].value)

    let today = new Date()
    let useDateInput = new Date(yearInput, monthInput - 1, dayInput)
    let day = today.getDate()
    let month = today.getMonth() * 1 + 1
    let year = today.getFullYear()
    let dateInvalid = false

    let resultDay, resultMonth, resultYear

    if ((today - useDateInput) < 0){
        userInput.forEach(function(input, index){
            input.style.border = '1px solid var(--Light-red)'
            input.previousElementSibling.style.color = 'var(--Light-red)'
            input.nextElementSibling.textContent = 'Must be in the past'
            input.nextElementSibling.style.color = 'var(--Light-red)'
            dateInvalid = true
        })
    }

    userInput.forEach(function(input, index){
        if (!input.value){
            input.style.border = '1px solid var(--Light-red)'
            input.previousElementSibling.style.color = 'var(--Light-red)'
            input.nextElementSibling.textContent = 'This field is required'
            input.nextElementSibling.style.color = 'var(--Light-red)'
            dateInvalid = true
        }
    })

    if (dayInput > 31 || dayInput < 1 ){
        userInput[0].style.border = '1px solid var(--Light-red)'
        userInput[0].previousElementSibling.style.color = 'var(--Light-red)'
        userInput[0].nextElementSibling.textContent = 'Must be a valid day'
        userInput[0].nextElementSibling.style.color = 'var(--Light-red)'
        dateInvalid = true
    }

    if (monthInput > 12 || monthInput < 1){
        userInput[1].style.border = '1px solid var(--Light-red)'
        userInput[1].previousElementSibling.style.color = 'var(--Light-red)'
        userInput[1].nextElementSibling.textContent = 'Must be a valid month'
        userInput[1].nextElementSibling.style.color = 'var(--Light-red)'
        dateInvalid = true
    }

    if (yearInput > year){
        userInput[2].style.border = '1px solid var(--Light-red)'
        userInput[2].previousElementSibling.style.color = 'var(--Light-red)'
        userInput[2].nextElementSibling.textContent = 'Must be in the past'
        userInput[2].nextElementSibling.style.color = 'var(--Light-red)'
        dateInvalid = true
    }else if (yearInput < 1){
        userInput[2].style.border = '1px solid var(--Light-red)'
        userInput[2].previousElementSibling.style.color = 'var(--Light-red)'
        userInput[2].nextElementSibling.textContent = 'Must be a valid year'
        userInput[2].nextElementSibling.style.color = 'var(--Light-red)'
        dateInvalid = true
    }

    if (dayInput> new Date(yearInput, monthInput, 0).getDate()){
        userInput[0].style.border = '1px solid var(--Light-red)'
        userInput[0].previousElementSibling.style.color = 'var(--Light-red)'
        userInput[0].nextElementSibling.textContent = 'Must be a valid day'
        userInput[0].nextElementSibling.style.color = 'var(--Light-red)'
        dateInvalid = true
    }

    // print the result

    if (!dateInvalid) {
        resultDay = day - dayInput
        resultMonth = month - monthInput
        resultYear = year - yearInput

        if (resultDay < 0){
            theLastDayOfMonthInput =parseInt(new Date(yearInput, monthInput, 0).getDate())
            resultDay = theLastDayOfMonthInput - Math.abs(resultDay)
            resultMonth -= 1
            if (resultMonth < 0){
                resultMonth = 12 - Math.abs(resultMonth)
                resultYear -= 1
            }
        }

        if (resultMonth < 0){
            resultMonth = 12 - Math.abs(resultMonth)
            resultYear -= 1
        }

        document.querySelector('.result-day span').textContent = `${resultDay}`
        document.querySelector('.result-month span').textContent = `${resultMonth}`
        document.querySelector('.result-year span').textContent = `${resultYear}`
    }
    
}



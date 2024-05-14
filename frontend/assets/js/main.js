window.onload = () => {
    //form api
    let formApi = "http://localhost/envoieCourier/backend/api/sendForm.php";

    //vider les message d'erreur
    let errorBox = document.querySelectorAll(".error")
    for (let index = 0; index < errorBox.length; index++) {
        const element = errorBox[index];
        element.innerHTML = ""
    }

    //validateur
    let validator = {
        firstname: false,
        lastname: false,
        email: false,
        subjet: false,
        message: false
    }

    //firstname check
    const firstNameCheck = () => {
        let firstname = document.getElementById('firstname');
        firstname.onkeyup = (event) => {
            let firstnameValue = event.target.value.trim();
            let firstnameModel = /^[a-z- ]{2,}$/;
            let result = firstnameModel.test(firstnameValue);
            // console.log(result);

            //error message
            let errorMessage = document.querySelectorAll(".error-firstname")[0]
            // console.log(firstnameValue.length);
            if (!result) {
                if (firstnameValue.length == 1) {
                    errorMessage.innerHTML = "minimum 2 caracteres pour le nom"
                } else {
                    if (firstnameValue.length == 0) {
                        errorMessage.innerHTML = "veuillez entrer votre nom"
                    }
                }
            } else {
                errorMessage.innerHTML = ""
            }
            validator = { ...validator, firstname: result };
        }
    }
    //lastname check
    const lastNameCheck = () => {
        let laststname = document.getElementById('lastname');
        laststname.onkeyup = (event) => {
            let lastnameValue = event.target.value.trim();
            let lastnameModel = /^[a-z- ]{2,}$/;
            let result = lastnameModel.test(lastnameValue);
            // console.log(result);

            //error message
            let errorMessage = document.querySelectorAll(".error-lastname")[0]
            // console.log(lastnameValue.length);
            if (!result) {
                if (lastnameValue.length == 1) {
                    errorMessage.innerHTML = "minimum 2 caracteres pour le(s) prénom(s)"
                } else {
                    if (lastnameValue.length == 0) {
                        errorMessage.innerHTML = "veuillez entrer votre (vos) prénom(s)"
                    }
                }
            } else {
                errorMessage.innerHTML = ""
            }
            validator = { ...validator, lastname: result };
        }
    }

    //email check
    const emailCheck = () => {
        let email = document.getElementById('email');
        email.onkeyup = (event) => {
            let emailValue = event.target.value.trim();
            let emailModel = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
            let result = emailModel.test(emailValue);
            // console.log(result);

            //error message
            let errorMessage = document.querySelectorAll(".error-email")[0]
            // console.log(emailValue.length);
            if (!result) {
                errorMessage.innerHTML = "veullez entrer un email correct"

            } else {
                errorMessage.innerHTML = ""
            }
            validator = { ...validator, email: result };
        }
    }

    //subjet check
    const subjetCheck = () => {
        let subjet = document.getElementById('subjet');
        subjet.onkeyup = (event) => {
            let subjetValue = event.target.value.trim();
            let subjetModel = /^[a-z0-9 ]{5,}$/;
            let result = subjetModel.test(subjetValue);
            // console.log(result);

            //error message
            let errorMessage = document.querySelectorAll(".error-subjet")[0]
            // console.log(subjetValue.length);
            if (!result) {
                errorMessage.innerHTML = "saisissez un sujet correct d'au moins 5 carracteres"
            } else {
                errorMessage.innerHTML = ""
            }
            validator = { ...validator, subjet: result };
        }
    }

    //message check
    const messageCheck = () => {
        let message = document.getElementById('message');
        // console.log(message);
        message.onkeyup = (event) => {
            let messageValue = event.target.value.trim();
            // console.log(messageValue);
            let messageModel = /[a-zA-Z0-9 ]{10,}/;
            let result = messageModel.test(messageValue);
            // console.log(result);

            //error message
            let errorMessage = document.querySelectorAll(".error-message")[0]
            // console.log(messageValue.length);
            if (!result) {
                errorMessage.innerHTML = "saisissez un message d'au moins 10 carracteres"
            } else {
                errorMessage.innerHTML = ""
            }
            validator = { ...validator, message: result };
        }
    }

    firstNameCheck();
    lastNameCheck();
    emailCheck();
    subjetCheck();
    messageCheck();

    //validator final valor
    //switch submit bt
    let submitBt = document.querySelectorAll("form div.bt-submit input")[0];
    window.onkeyup = () => {
        // console.log(validator);
        for (const key in validator) {
            if (Object.hasOwnProperty.call(validator, key)) {
                const element = validator[key];
                if (!element) {
                    // console.log("no");
                    // console.log(element);
                    submitBt.classList.contains("none") ? null : submitBt.classList.add("none")
                    return
                } else {
                    // console.log("yes");
                    // console.log(element);
                    submitBt.classList.contains("none") ? submitBt.classList.remove("none") : null
                }
            }
        }
    }


    //verification si donnee exist avant soumission
    const submitVerify = async (event) => {
        event.preventDefault()
        let allInput = document.forms["formMessage"];

        //valeurs ne sont pas renseignees => affiche message error
        for (let index = 0; index < allInput.length - 1; index++) {
            const element = allInput[index];
            if (!element.value.length) {
                errorBox[index].innerHTML = "veuillez renseigner ce champs"
            }
        }

        for (let index = 0; index < allInput.length - 1; index++) {
            //valeur non renseignee : on stop avec return
            const element = allInput[index];
            if (!element.value.length) {
                return
            }
        }

        //toutes les valeurs existent => on stock les infos et envoie par fetch()

        // const formData = new FormData(allInput)
        // const data = {}
        const formData = new FormData()
        for (let index = 0; index < allInput.length - 1; index++) {
            const element = allInput[index];
            // data[element.name] = element.value
            formData.append([element.name], element.value)
        }
        console.log(formData);

        // const dataToSend = new FormData()
        // dataToSend.append('dataname', formData)

        // const response = await fetch(formApi, {
        //     method: "POST",
        //     bady: dataToSend
        // })

        // formData.append("dataname", data)

        const response = await window.fetch(formApi, {
            method: "POST",
            body: formData
        })



        const responseResult = await response
        console.log(responseResult);
        // console.log(responseResult.ok);

        //reset form function
        const resetForm = () => {
            document.querySelector('form').reset()
        }

        console.log(typeof (responseResult));
        let messageSucces = document.querySelector(".error-server")
        if (responseResult.ok) {
            resetForm()
            messageSucces.innerHTML = "message envoyé avec succes !"
            messageSucces.classList.remove("none")

            setTimeout(() => {
                messageSucces.classList.add("none")
                messageSucces.innerHTML = ""
            }, 2000);
        } else {
            messageSucces.classList.remove("none")
            messageSucces.innerHTML = "erreur lors de l'envoie"

            setTimeout(() => {
                messageSucces.classList.add("none")
                messageSucces.innerHTML = ""
            }, 2000);
        }

    }
    submitBt.onclick = submitVerify
}
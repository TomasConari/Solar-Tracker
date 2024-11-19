document.addEventListener("DOMContentLoaded", () => {

    const regexNombre = /^[A-Z~-ÿ]{1}[~-ÿ\s\w\.\'-]{1,}$/i;
    const regexApellido = /^[A-Z~-�]{1}[~-�\s\w\.\'-]{1,}$/i;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPais = /^[A-Za-zÀ-ÿ\s-]{2,50}$/;

    const wait = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    emailjs.init("CheDvvyarhhvgKfRt");

    const submitButton = document.getElementById("enviar");

    const sendEmail = async (e) => {
        const enableForms = () => {
            submitButton.disabled = false;
            name.disabled = false;
            lastname.disabled = false;
            country.disabled = false;
            email.disabled = false;
        }

        e.preventDefault();

        const name = document.getElementById("nombre");
        const lastname = document.getElementById("apellido");
        const country = document.getElementById("pais");
        const email = document.getElementById("email");
        const submitButton = document.getElementById("enviar");

        submitButton.disabled = true;
        name.disabled = true;
        lastname.disabled = true;
        country.disabled = true;
        email.disabled = true;

        const setInputColor = (input, isValid) => {
            if (isValid) {
                input.style.backgroundColor = "white";
            } else {
                input.style.backgroundColor = "red";
            }
        };

        let isValid = true;

        if ((regexNombre.test(name.value) == false) || (name.value.length == 0)) {
            setInputColor(name, false);
            isValid = false;
        } else {
            setInputColor(name, true);
        };
        if ((regexApellido.test(lastname.value) == false) || (lastname.value.length == 0)) {
            setInputColor(lastname, false);
            isValid = false;
        } else {
            setInputColor(lastname, true);
        };
        if ((regexEmail.test(email.value) == false) || (email.value.length == 0)) {
            setInputColor(email, false);
            isValid = false;
        } else {
            setInputColor(email, true);
        };
        if ((regexPais.test(country.value) == false) || (country.value.length == 0)) {
            setInputColor(country, false);
            isValid = false;
        } else {
            setInputColor(country, true);
        };
        if (!isValid) {
            enableForms();
            return;
        };

        const templateParams = {
            name: name.value,
            lastname: lastname.value,
            country: country.value,
            email: email.value,
        };

        try {
            const result = await emailjs.send('service_7j42v0n', 'template_cwbrvvn', templateParams);
            if (result.text === "OK") {
                name.value = "";
                lastname.value = "";
                country.value = "";
                email.value = "";
                submitButton.style.backgroundColor = "green";
                submitButton.textContent = "Enviado";
                submitButton.style.color = "white";
                await wait(5000);
                enableForms();
                submitButton.style.color = "";
                submitButton.style.backgroundColor = "";
                submitButton.textContent = "Enviar";
            } else {
                throw error;
            };
        } catch (error) {
            submitButton.style.backgroundColor = "red";
            submitButton.textContent = "Error";
            submitButton.style.color = "white";
            await wait(5000);
            enableForms();
            submitButton.style.color = "";
            submitButton.style.backgroundColor = "";
            submitButton.textContent = "Enviar";
        };
    };

    submitButton.addEventListener("click", sendEmail);
});
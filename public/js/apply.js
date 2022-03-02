
const schema=joi.object({
    username:joi.string().min(3).max(30).label("Name").required(),
});


function validate(dataObject) {
    const result=schema.validate(
        {
            ...dataObject,
        }, 
        { abortEarly: false}
    );
    return result;
}



//form

$(document).ready(function () {
    $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        const contactForm=this;
        const usernameField=$(contactForm).find("#username");

        const formErrors=validate({
            username:usernameField.val(),
        });

        const initialErrors={
            username:null
        };

        if(formErrors?.error){
            const {details}=formErrors.error;
            details.map((detail)=>{
                initialErrors[detail.context.key] = detail.message;
            });

        }
        Object.keys(initialErrors).map((errorName)=>{
            if(initialErrors[errorName] !== null){
                $(`#${errorName}`).removeClass('is-valid').addClass('is-invalid')
            }else{
                $(`#${errorName}`).removeClass('is-invalid').addClass('is-valid')
            }
        })
    });
});
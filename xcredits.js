function ready(callback){
    // in case the document is already rendered
    if (document.readyState!=='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
            if (document.readyState==='complete') callback();
        });
}

function checkEmptyOrNull(variable){
    //Noting
    return typeof variable === 'undefined' || variable === null;

}

function validate_organization(org){
    let selectElement = document.querySelectorAll('[id=customAttribute2]');
    let optionNames = [...selectElement[0].options].map(o => o.text)
    return optionNames.includes(org)
}

ready(function(){
    let titleClassName = 'col-md-12 custom-title';
    let signupPageTitle = document.getElementsByClassName(titleClassName);
    if(!checkEmptyOrNull(signupPageTitle)){
        $('#customAttribute1').datepicker({format: 'mm-dd-yyyy'}).on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });
        $('#customAttribute1').attr('placeholder','mm-dd-yyyy');
        $("#customAttribute2").parent().hide()
        if(!checkEmptyOrNull(signupPageTitle[0])){
            signupPageTitle[0].innerHTML= "Validate and earn credentials for skills gained through life and work experience. Create your account to get started with XCredit.";
            let search = new URLSearchParams(window.location.search)
            let org = search.get('org');
            if(validate_organization(org)){
                $("#customAttribute2").val(org).trigger('change');
            }
            else{
                $("#customAttribute2").val('hhjobseekers').trigger('change');
            }
        
        }
    }
    let classElement = document.getElementsByClassName('btn btn-link custom-small-text');
    let SpInitatedSsoUrl = 'https://xcredit.xecurify.com/';
    let ThankYouPageUrl = 'https://xcredit.xecurify.com/moas/idp/updateuserpassword';
    if(!checkEmptyOrNull(classElement) && !checkEmptyOrNull(classElement[0]) && !checkEmptyOrNull(classElement[0].baseURI) && classElement[0].baseURI === ThankYouPageUrl ){
        classElement[0].href = SpInitatedSsoUrl;
        classElement[0].innerText = 'Click here to go to XCredit';
    }
	   
});

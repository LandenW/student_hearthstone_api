/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 *
 * 1. When the page is loaded all form fields should be disabled except
 *    for the dropdown to select a student
 *
 * 2. Using the bootstrap-selct plugin render dropdown on the page
 *
 * 3. Use the live search functionality to make the dropdown searchable
 *
 * 4. Add the user glyphicons next to each student in the list
 *
 * 6. Add a menu header to the dropdown
 *
 * 7. Customize further with anything you find intersting
 *
 * 8. When an student is selected the form fields should be enabled
      and populated with the data for the selected student
 *
 * 9. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * 10. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data
 *
 */

 (function(){

   $(function(){

     $("#updateStudentForm :input").prop("disabled", true);

     $('.studentid').selectpicker({
        style: 'btn-info',
     });

     let currentStudent

    $("#student_id").change(function () {


          currentStudent = $(this).val()

           $.get("http://localhost:1337/student/" + currentStudent, function(student){


             $.each(student, function(key, val){

                 let el = $('[name="'+key+'"]');
                 let type = el.attr('type');

                 switch(type){
                     case 'checkbox':
                         el.attr('checked', 'checked');
                         break;
                     case 'radio':
                         el.filter('[value="'+val+'"]').attr('checked', 'checked');
                         break;
                     default:
                         el.val(val);
                 }
              });
           })
           $("#updateStudentForm :input").prop("disabled", false);
         })

         $("#updateStudent").click(function(e){

           e.preventDefault()

            $.ajax({
            url: "http://localhost:1337/student/" + currentStudent,
            data: $("#updateStudentForm").serialize(),
            type: 'PUT',
            success: function(result) {
                alert("Successfully Changed")
            }
          });
         })
         $("#updateStudentForm").validate({
         rules: {
           first_name: {
             required: true,
             minlength: 2
           },
           last_name: {
             required: true,
             minlength: 2
           },
           start_date: {
             date: true
           }
         },
         messages: {
           first_name: {
             required: "We require a first name",
             minlength: "Your first name must be longer than 2 characters",
           },
           last_name: {
             required: "We require a last name",
             minlength: "Your last name must be longer than 2 characters"
           },
           start_date: {
             date: "You must submit in a standard date format, e.g. yyyy-mm-dd"
           }
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        }
       });

   })
 })();

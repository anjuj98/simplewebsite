 
    document.addEventListener('DOMContentLoaded', function() {
        var form = document.querySelector('form');
        var inputs = form.querySelectorAll('input, textarea');

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('focus', function() {
                this.parentElement.querySelector('.error-message').classList.remove('error-message-visible');
            });
        }

        form.addEventListener('submit', function(event) {
            var valid = true;

            for (var i = 0; i < inputs.length; i++) {
                if (!inputs[i].value) {
                    inputs[i].parentElement.querySelector('.error-message').classList.add('error-message-visible');
                    valid = false;
                }
            }

            if (!valid) {
                event.preventDefault();
            }
            
        });
    });
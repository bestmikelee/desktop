var validators = {
  email: function(email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if(email) {
      return emailRegex.test(email);
    }

    return;
  },
  phone: function(phone) {
    var phoneRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if(phone) {
      return phoneRegex.test(phone);
    }
    // The below regex includes country code and extension, just sayin :)
    // /^(\+?\d{1,2})?(?:\D{1,2})?([2-9][0-8][0-9])(?:\D{1,2})?([2-9][0-9]{2})(?:\D)?([0-9]{4})([\sext]{0,4}\d{1,5})?$/

    return;
  }
};

module.exports = validators;

app.service('StripeSvc', function($http, AuthService) {
    //Gets user if they're logged in
    this.getCardDollas = function(cardInfo, cb) {
        cardInfo.user = AuthService.getLoggedInUser();
        $http.post('/card', cardInfo).then(function(response) {
            cb(response.data);
        }).then(null, console.log);
    };

    // this.getBankDollas = function(bankInfo) {
    //     $http.post('/bank', bankInfo).then(function(response) {
    //         console.log(response.data);
    //     });
    // };
});

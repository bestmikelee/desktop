app.directive('stripe', function() {
        //['$scope', 'StripeSvc', '$state',

        function stripeCtrl($scope, StripeSvc, AuthService, $state) {

            $scope.stripeCardCallback = function(code, result) {
                if (result.error) {
                    console.log('error', result);
                } else {
                    console.log(result.id);
                    console.log("scope.cardAmount is: ", $scope.cardAmount);
                    console.log(StripeSvc);
                    AuthService.getLoggedInUser().then(function(user) {
                        StripeSvc.getCardDollas({
                                campaignId: $scope.campaignId,
                                userId: user._id,
                                amount: $scope.cardAmount,
                                tokenID: result.id
                            },
                            function(response) {
                                console.log(response);
                            });
                    });
                }
            };

            // Stripe Bank Response Handler
            // $scope.stripeBankCallback = function(code, result) {
            //     if (result.error) {
            //         console.log(result.error.message);
            //     } else {
            //         console.log(result.id);
            //         Dollas.getBankDollas({
            //             amount: $scope.bankAmount,
            //             tokenID: result.id
            //         });
            //     }
            // };

        }

        function stripeLink(scope) {

            // scope.items = [
            //     { label: 'How It Works', state: 'home' },
            //     { label: 'About', state: 'about' },
            //     { label: 'Documentation', state: 'docs' },
            //     { label: 'Members Only', state: 'membersOnly', auth: true }
            // ];

            scope.formShowing = false;

            scope.toggleForm = function() {
                scope.formShowing = !scope.formShowing;
            };
        }

        return {
            restrict: 'E',
            scope: {
                campaignId: '='
            },
            templateUrl: 'app/common/directives/stripe/stripe.html',
            controller: stripeCtrl,
            link: stripeLink
        };
    }
    //]
);

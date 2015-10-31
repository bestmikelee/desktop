app.factory('fntStorage', ['$cacheFactory','$http',function($cacheFactory,$http) {
        var cache = $cacheFactory('fntStart')
        cache.put('startList',[]);
        cache.put('postponeList',[]);
        return {
            addStartList: function(apartment) {
                var startList = cache.get('startList');
                var postponeList = cache.get('postponeList');

                if(startList.length){
                    var startIndex = startList.indexOf(apartment)
                    if(startIndex > -1){
                        return
                    }
                }
                if(postponeList.length){
                    var index = postponeList.indexOf(apartment)
                    if (index > -1) {
                        console.log('hit',postponeList)
                        postponeList.splice(index,1)
                        console.log('hit2',postponeList)
                    }
                }
                startList.push(apartment)
                cache.put('startList',startList)
                cache.put('postponeList',postponeList)
            },
            addPostponeList: function(apartment){
                var startList = cache.get('startList');
                var postponeList = cache.get('postponeList');
                if(postponeList.length){
                    var postponeIndex = postponeList.indexOf(apartment)
                    if ( postponeIndex > -1){
                        return
                    }
                }

                if(startList.length){
                    var index = startList.indexOf(apartment)
                    if (index > -1) {  
                        startList.splice(index,1)
                    }
                }
                postponeList.push(apartment)
                cache.put('startList',startList)
                cache.put('postponeList',postponeList)
            },
            postponeListLength: function(){
                return cache.get('postponeList').length
            },
            startListLength:function(){
                return cache.get('startList').length
            },
            startList: function(){
                return cache.get('startList')
            },
            postponeList: function(){
                return cache.get('postponeList')
            },
            totalList:function(){
                return cache.get('postponeList').length + cache.get('startList').length
            },
            apartments75out:function(){
                return $http.get('api/landlord').then(function(data){
                    console.log(data.data)
                })

            }
        }
    
}])

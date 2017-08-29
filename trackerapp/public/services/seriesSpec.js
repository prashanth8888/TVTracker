describe('SeriesService', function () {
    var myserv, httpBackend;
    beforeEach(function () {
        module('MyApp');

        inject(function ($httpBackend, _Series_) {
            myserv = _Series_;
            httpBackend = $httpBackend;
            httpBackend.whenGET("/tv/shows?genreId=10759").respond(200, 1);
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('Get Series ServiceTestSpec', function () {
            
         var result;
        myserv.displaybyGenre(10759).then(function (response) {
            result = response.data;
        });;


        httpBackend.flush();
         
        expect(result).toEqual(1);
 
    });
 
 
});
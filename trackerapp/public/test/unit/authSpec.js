describe('Auth-service', function() {
  beforeEach(module('MyApp'));

  describe('Test the Authentication Service instantiation', function() {
    it('should return current version', inject(function(Auth) {
      expect(Auth).toBeDefined();
    }));
  });
});
describe('JSQL core tests', function () {

    describe('#JSQL', function () {

        it('should create JSQL instance with default parameteres', function () {

            let jsql = null;

            try {
                jsql = new JSQL();
            }catch (e){
                console.log(e);
                assert.isTrue(false);
            }

            assert.equal(jsql.url, 'https://provider.jsql.it/api/jsql/');
            assert.equal(jsql.hideErrors, false);
            assert.equal(jsql.rxjs, false);

        });

        it('should create JSQL instance with host', function () {

            let jsql = null;

            try {
                jsql = new JSQL({
                    host: 'https://localhost:9090'
                });
            }catch (e){
                assert.isTrue(false);
            }

            assert.equal(jsql.url, 'https://localhost:9090/api/jsql/');

        });

        it('should create JSQL instance with host', function () {

            let jsql = null;

            try {
                jsql = new JSQL({
                    host: 'https://localhost:9090/'
                });
            }catch (e){
                console.log(e);
                assert.isTrue(false);
            }

            
            assert.equal(jsql.url, 'https://localhost:9090/api/jsql/');

        });

        it('should create JSQL instance with host and path', function () {

            let jsql = null;

            try {
                jsql = new JSQL({
                    host: 'https://localhost:9090/',
                    path: '/api'
                });
            }catch (e){
                console.log(e);
                assert.isTrue(false);
            }

            
            assert.equal(jsql.url, 'https://localhost:9090/api/');

        });

        it('should create JSQL instance with host and path', function () {

            let jsql = null;

            try {
                jsql = new JSQL({
                    host: 'https://localhost:9090/',
                    path: 'api'
                });
            }catch (e){
                console.log(e);
                assert.isTrue(false);
            }

            
            assert.equal(jsql.url, 'https://localhost:9090/api/');

        });

        it('should create JSQL instance with host and path', function () {

            let jsql = null;

            try {
                jsql = new JSQL({
                    host: 'https://localhost:9090',
                    path: '/api'
                });
            }catch (e){
                console.log(e);
                assert.isTrue(false);
            }

            
            assert.equal(jsql.url, 'https://localhost:9090/api/');

        });

        it('should create JSQL instance with host and path', function () {

            let jsql = null;

            try {
                jsql = new JSQL({
                    host: 'https://localhost:9090',
                    path: 'api'
                });
            }catch (e){
                console.log(e);
                assert.isTrue(false);
            }

            
            assert.equal(jsql.url, 'https://localhost:9090/api/');

        });

        it('should create JSQL instance with all params', function () {

            let jsql = null;

            try {
                jsql = new JSQL({
                    host: 'https://localhost:9090',
                    path: 'api',
                    hideErrors: true,
                    rxjs: true
                });
            }catch (e){
                console.log(e);
                assert.isTrue(false);
            }

            assert.equal(jsql.url, 'https://localhost:9090/api/');
            assert.equal(jsql.hideErrors, true);
            assert.equal(jsql.rxjs, true);
            
        });
        
    });

});
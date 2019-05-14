describe('JSQL core utils tests', function () {

    describe('#isFunction(obj)', function () {

        it('should return true', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let fn = function(){
                return '';
            };

            assert.isTrue(jsql.isFunction(fn));

        });


        it('should return false', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let fn = 'OK';

            assert.isFalse(jsql.isFunction(fn));

        });

        it('should return false', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let fn = {
                prop: '1234'
            };

            assert.isFalse(jsql.isFunction(fn));

        });

    });

    describe('#each(obj, iterator)', function () {

        it('should equal object values and properties', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let obj = {
                prop1: 'x',
                prop2: 'y'
            };

            var c = 0;
            jsql.each(obj, function(prop, value){

                if(c === 0){
                    assert.equal(obj.prop1, value);
                    assert.equal('prop1', prop);
                }else{
                    assert.equal(obj.prop2, value);
                    assert.equal('prop2', prop);
                }

                c++;
            });


        });


    });

    describe('#isEmptyObject(obj)', function () {

        it('should return true', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let obj = {

            };

            assert.isTrue(jsql.isEmptyObject(obj));

        });

        it('should return false', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let obj = {
                prop1: 'x'
            };

            assert.isFalse(jsql.isEmptyObject(obj));

        });


    });

    describe('#isArray(obj)', function () {

        it('should return true', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let obj = [];

            assert.isTrue(jsql.isArray(obj));

        });

        it('should return true', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let obj = [1,2,3];

            assert.isTrue(jsql.isArray(obj));

        });

        it('should return true', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let obj = [{
                x: 1
            }];

            assert.isTrue(jsql.isArray(obj));

        });

        it('should return false', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let obj = '';

            assert.isFalse(jsql.isArray(obj));

        });

        it('should return false', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let obj = {};

            assert.isFalse(jsql.isArray(obj));

        });


    });

    describe('#txid()', function () {

        it('should generate transaction id', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let txid = jsql.txid();

            assert.isNotNull(txid);
            assert.isDefined(txid);

        });

        it('should generate only unique transaction id', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let txids = [];

            for(let i = 0; i < 1000; i++){
                let txid = jsql.txid();
                assert.isFalse(txids.indexOf(txid) > -1);
                txids.push(txid);
            }

        });

    });

    describe('#toArray()', function () {

        it('should create array', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let collection = document.getElementsByTagName('script');
            let arr = jsql.toArray(collection);

            assert.isNotNull(arr);
            assert.isDefined(arr);

            assert.equal(arr.length, collection.length);

        });


    });

});
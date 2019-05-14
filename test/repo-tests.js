describe('JSQL core repo tests', function () {

    describe('#querySet', function () {

        it('should exists', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            assert.exists(jsql.querySet);

        });


    });

    describe('#repoSet', function () {

        it('should exists', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            assert.exists(jsql.repoSet);

        });


    });

    describe('#set #get', function () {

        it('should add query', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let query = 'select * from person';
            let result = jsql.set('query1', query);

            assert.isNotNull(result);
            assert.isDefined(result);
            assert.equal(result, jsql);

        });

        it('should add and get query', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let query = 'select * from person';
            let result = jsql.set('query2', query);

            assert.isNotNull(result);
            assert.isDefined(result);
            assert.equal(result, jsql);

            let queryResult = jsql.get('query2');

            assert.equal(queryResult, query);


        });

        it('should add function query', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let result = jsql.set('query3', function () {

                let query = jsql.query("select * from person");

                query.append(' where id = :id');

                return query;

            });

            assert.isNotNull(result);
            assert.isDefined(result);
            assert.equal(result, jsql);

        });

        it('should add and get function query', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            jsql.set('query4', function (id, name) {

                let query = jsql.query("select * from person");

                query.append('where id = :id');
                query.append('and name = :name');

                assert.equal(id, 1);
                assert.equal(name, 'Dawid');

                return query;

            });

            let result = jsql.get('query4', 1, 'Dawid');

            assert.isNotNull(result);
            assert.isDefined(result);
            assert.isNotEmpty(result);

            assert.equal(result[0], "select * from person");
            assert.equal(result[1], " where id = :id ");
            assert.equal(result[2], " and name = :name ");

        });

    });

    describe('#repo', function () {

        it('should create repo', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let repo = jsql.repo('repo1');

            assert.isNotNull(repo);
            assert.isDefined(repo);
            assert.isDefined(repo.get);
            assert.isDefined(repo.set);
            assert.isDefined(repo.name);

        });

        it('should add query to repo', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let repo = jsql.repo('repo1');
            repo.set('query5', 'select * from person');

            assert.equal(jsql.querySet['repo1.query5'], 'select * from person');

        });

        it('should add and get query from repo', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let repo = jsql.repo('repo1');
            repo.set('query5', 'select * from person');

            let result = repo.get('query5');

            assert.equal(result, 'select * from person');

        });

        it('should add query function to repo', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let repo = jsql.repo('repo1');

            repo.set('query6', function (id, name) {

                let query = jsql.query("select * from person");

                query.append('where id = :id');
                query.append('and name = :name');

                assert.equal(id, 1);
                assert.equal(name, 'Dawid');

                return query;

            });

            let result = repo.get('query6', 1, 'Dawid');

            let nullResult = jsql.get('query6');

            assert.isNull(nullResult);
            assert.isNotNull(result);
            assert.isDefined(result);
            assert.isNotEmpty(result);

            assert.equal(result[0], "select * from person");
            assert.equal(result[1], " where id = :id ");
            assert.equal(result[2], " and name = :name ");

        });

    });

    describe('#query', function () {

        it('should create query', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let result = jsql.query('select * from person');

            console.log(result);

            assert.isNotNull(result);
            assert.isDefined(result);

            result = result.build();

            assert.equal(result[0], 'select * from person');


        });

        it('should append to query', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let result = jsql.query('select * from person');

            result.append('where id = :id');

            assert.isNotNull(result);
            assert.isDefined(result);

            result = result.build();

            assert.equal(result[0], 'select * from person');
            assert.equal(result[1], ' where id = :id ');

        });

        it('should provide query to set', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let result = jsql.query('select * from person');
            result.append('where id = :id');

            assert.isNotNull(result);
            assert.isDefined(result);

            jsql.set('query7', result);

            let query = jsql.get('query7');

            assert.isNotNull(query);
            assert.isDefined(query);
            assert.equal(query, result);

        });

        it('should provide query build to set', function () {

            let jsql = new JSQL({
                host: 'local'
            });

            let result = jsql.query('select * from person');
            result.append('where id = :id');

            assert.isNotNull(result);
            assert.isDefined(result);

            result = result.build();
            jsql.set('query7', result);

            let query = jsql.get('query7');

            assert.isNotNull(query);
            assert.isDefined(query);
            assert.equal(query, result);

        });


    });

});
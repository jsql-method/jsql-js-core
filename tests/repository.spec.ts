import {expect} from 'chai';
import {JscollatorQueryBuilder, QueryBuilderResult} from "../src/query-builder";
import {JscollatorRepository} from "../src/repository";

describe('Repository tests', () => {

    it('Adding SQL query into repository', () => {

        const sqlQuery: string = 'select * from person';
        let personRepository: JscollatorRepository = new JscollatorRepository();
        personRepository.set('findAll', sqlQuery);

        let queryResult: QueryBuilderResult = personRepository.get('findAll');

        expect(queryResult.queries).to.have.length(1);
        expect(queryResult.queries[0].trim()).to.be.equal(sqlQuery); //Needs to trim as builder adds spaces

    });

    it('Adding QueryBuilderResult query into repository', () => {

        const sqlQuery: string = 'select * from person';
        let personRepository: JscollatorRepository = new JscollatorRepository();
        personRepository.set('findAll', JscollatorQueryBuilder.of(sqlQuery));

        let queryResult: QueryBuilderResult = personRepository.get('findAll');

        expect(queryResult.queries).to.have.length(1);
        expect(queryResult.queries[0].trim()).to.be.equal(sqlQuery); //Needs to trim as builder adds spaces

    });

    it('Adding QueryBuilder query into repository', () => {

        const sqlQuery: string = 'select * from person';
        let personRepository: JscollatorRepository = new JscollatorRepository();
        personRepository.set('findAll', JscollatorQueryBuilder.query(sqlQuery));

        let queryResult: QueryBuilderResult = personRepository.get('findAll');

        expect(queryResult.queries).to.have.length(1);
        expect(queryResult.queries[0].trim()).to.be.equal(sqlQuery); //Needs to trim as builder adds spaces

    });

    it('Adding ParamsCallback query into repository', () => {

        const sqlQuery1: string = 'select * from person';
        const sqlQuery2: string = 'order by name';

        let personRepository: JscollatorRepository = new JscollatorRepository();
        personRepository.set('findAll', (params: Record<string, boolean>) => {

            let qb: JscollatorQueryBuilder = JscollatorQueryBuilder.query(sqlQuery1);

            if (params.order) {
                qb.append(sqlQuery2);
            }

            return qb.build();

        });


        let queryResult: QueryBuilderResult = personRepository.get('findAll', {
            order: true
        });

        expect(queryResult.queries).to.have.length(2);
        expect(queryResult.queries[0].trim()).to.be.equal(sqlQuery1); //Needs to trim as builder adds spaces
        expect(queryResult.queries[1].trim()).to.be.equal(sqlQuery2); //Needs to trim as builder adds spaces

    });


});

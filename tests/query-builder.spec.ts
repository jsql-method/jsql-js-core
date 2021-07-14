import {expect} from 'chai';
import {JscollatorQueryBuilder, QueryBuilderResult} from "../src/query-builder";

describe('QueryBuilder tests', () => {

    it('Creating single query', () => {

        const sqlQuery: string = 'select * from person';
        const query: QueryBuilderResult = JscollatorQueryBuilder.of(sqlQuery);

        expect(query.queries).to.have.length(1);
        expect(query.queries[0].trim()).to.be.equal(sqlQuery); //Needs to trim as builder adds spaces

    });

    it('Creating query using builder', () => {

        const sqlQuery1: string = 'select * from person';
        const sqlQuery2: string = 'where id = :id';
        const sqlQuery3: string = 'order by name';

        const query: QueryBuilderResult = JscollatorQueryBuilder.query(sqlQuery1)
            .append(sqlQuery2)
            .append(sqlQuery3)
            .build();

        expect(query.queries).to.have.length(3);
        expect(query.queries[0].trim()).to.be.equal(sqlQuery1); //Needs to trim as builder adds spaces
        expect(query.queries[1].trim()).to.be.equal(sqlQuery2); //Needs to trim as builder adds spaces
        expect(query.queries[2].trim()).to.be.equal(sqlQuery3); //Needs to trim as builder adds spaces

    });

    it('Creating query using builder using variables', () => {

        const sqlQuery1: string = 'select * from person';
        const sqlQuery2: string = 'where id = :id';
        const sqlQuery3: string = 'order by name';

        const queryBuilder: JscollatorQueryBuilder = JscollatorQueryBuilder.query(sqlQuery1);
        queryBuilder.append(sqlQuery2)
        queryBuilder.append(sqlQuery3)
        const query: QueryBuilderResult = queryBuilder.build();

        expect(query.queries).to.have.length(3);
        expect(query.queries[0].trim()).to.be.equal(sqlQuery1); //Needs to trim as builder adds spaces
        expect(query.queries[1].trim()).to.be.equal(sqlQuery2); //Needs to trim as builder adds spaces
        expect(query.queries[2].trim()).to.be.equal(sqlQuery3); //Needs to trim as builder adds spaces

    });

});

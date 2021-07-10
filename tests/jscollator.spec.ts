import {expect} from "chai";
import {Jscollator} from "../src/jscollator";
import {JscollatorError} from "../src/jscollator-error";
import {JscollateRequest} from "../src/jscollator-request";
import {QueryBuilder, QueryBuilderResult} from "../src/query-builder";
import {QueryType} from "../src/query-type";
import nock = require("nock");
import {JscollatorTransaction, JscollatorTransactionResponse} from "../src/jscollator-transaction";

interface Person {
    id: number;
    name: string;
}

describe('Jscollator tests', () => {

    const stubHost: string = 'https://jscollator.com';
    const stubUri: string = '/api/cloud';

    const jscollator: Jscollator = new Jscollator({
        url: `${stubHost}${stubUri}`,
        requestConfig: {
            timeout: 1000
        }
    });

    it('Performing single statement expecting timeout', async () => {

        const sqlQuery: string = 'select * from person';
        let result: Array<Person> | JscollatorError = await jscollator.select<Array<Person>>(sqlQuery).perform();

        expect((<JscollatorError>result)).to.be.not.null;
        expect((<JscollatorError>result)).to.have.property('axiosError');

    });

    it('Performing single statement', async () => {

        const sqlQuery: string = 'select * from person';
        const stubRequest: JscollateRequest = {
            queryType: QueryType.SELECT,
            transactionId: null,
            query: sqlQuery,
            params: {}
        };
        const stubResponse: Array<Person> = [
            {
                id: 1,
                name: 'person1'
            }, {
                id: 2,
                name: 'person2'
            }
        ];

        const scope = nock(stubHost)
            .post(stubUri, stubRequest)
            .reply(200, stubResponse);

        let result: Array<Person> | JscollatorError = await jscollator.select<Array<Person>>(sqlQuery).perform();

        scope.done();

        expect((<Array<Person>>result)).to.be.not.null;
        expect((<Array<Person>>result)).to.have.length(stubResponse.length);
        expect((<Array<Person>>result)).to.deep.equal(stubResponse);

    });

    it('Performing multiple statements', async () => {

        const sqlQuery1: string = 'select * from person';
        const sqlQuery2: string = 'order by id';
        const stubRequest: JscollateRequest = {
            queryType: QueryType.SELECT,
            transactionId: null,
            query: `${sqlQuery1}+${sqlQuery2}`,
            params: {}
        };
        const stubResponse: Array<Person> = [
            {
                id: 1,
                name: 'person1'
            },
            {
                id: 2,
                name: 'person2'
            }
        ];

        const scope = nock(stubHost)
            .post(stubUri, stubRequest)
            .reply(200, stubResponse);

        let qb: QueryBuilderResult = QueryBuilder.query(sqlQuery1).append(sqlQuery2).build();
        let result: Array<Person> | JscollatorError = await jscollator.select<Array<Person>>(qb).perform();

        scope.done();

        expect((<Array<Person>>result)).to.be.not.null;
        expect((<Array<Person>>result)).to.have.length(stubResponse.length);
        expect((<Array<Person>>result)).to.deep.equal(stubResponse);

    });

    it('Performing single statement with params', async () => {

        const params: Record<string, any> = {
            id: 1
        }
        const sqlQuery: string = 'select * from person where id = :id';
        const stubRequest: JscollateRequest = {
            queryType: QueryType.SELECT_ONE,
            transactionId: null,
            query: sqlQuery,
            params: params
        };
        const stubResponse: Person = {
            id: params.id,
            name: 'person1'
        };

        const scope = nock(stubHost)
            .post(stubUri, stubRequest)
            .reply(200, stubResponse);

        let result: Person | JscollatorError = await jscollator.selectOne<Person>(sqlQuery).param('id', params.id).perform();

        scope.done();

        expect((<Person>result)).to.be.not.null;
        expect((<Person>result)).to.deep.equal(stubResponse);

    });

    it('Performing single transactional statement with commit', async () => {

        const params: Record<string, any> = {
            id: 1,
            name: 'Mike'
        };
        const sqlQuery: string = 'update person set name = {name} where id = {id}';
        const stubRequestUpdate: JscollateRequest = {
            queryType: QueryType.UPDATE,
            // @ts-ignore
            transactionId: /.+/i,
            query: sqlQuery,
            params: params
        };
        const stubRequestCommit: JscollateRequest = {
            queryType: QueryType.COMMIT,
            // @ts-ignore
            transactionId: /.+/i,
            query: null,
            params: {}
        };
        const stubResponseCommit: JscollatorTransactionResponse = {
            success: true
        }
        const stubResponseUpdate: Record<string, any> = {};

        let tx: JscollatorTransaction = jscollator.transaction();

        const updateScope = nock(stubHost)
            .post(stubUri, stubRequestUpdate)
            .reply(200, stubResponseUpdate);

        await tx.update<Person>(sqlQuery).params(params).perform();

        updateScope.done();

        const commitScope = nock(stubHost)
            .post(stubUri, stubRequestCommit)
            .reply(200, stubResponseCommit);

        await tx.commit();

        commitScope.done();

    });

    it('Performing single transactional statement with rollback', async () => {

        const params: Record<string, any> = {
            id: 1,
            name: 'Mike'
        };
        const sqlQuery: string = 'update person set name = {name} where id = {id}';
        const stubRequestUpdate: JscollateRequest = {
            queryType: QueryType.UPDATE,
            // @ts-ignore
            transactionId: /.+/i,
            query: sqlQuery,
            params: params
        };
        const stubRequestRollback: JscollateRequest = {
            queryType: QueryType.ROLLBACK,
            // @ts-ignore
            transactionId: /.+/i,
            query: null,
            params: {}
        };
        const stubResponseRollback: JscollatorTransactionResponse = {
            success: true
        }
        const stubResponseUpdate: Record<string, any> = {};

        let tx: JscollatorTransaction = jscollator.transaction();

        const updateScope = nock(stubHost)
            .post(stubUri, stubRequestUpdate)
            .reply(200, stubResponseUpdate);

        await tx.update<Person>(sqlQuery).params(params).perform();

        updateScope.done();

        const rollbackScope = nock(stubHost)
            .post(stubUri, stubRequestRollback)
            .reply(200, stubResponseRollback);

        await tx.rollback();

        rollbackScope.done();

    });

});

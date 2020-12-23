import microCors from 'micro-cors';
import ibpt from '../../../../data/ibpt.json';
import comparaNcm from '../../../../helpers/comparaNcm';

const CACHE_CONTROL_HEADER_VALUE =
    'max-age=0, s-maxage=86400, stale-while-revalidate, public';
const cors = microCors();

async function Ibpt(request, response) {
    const requestedNcm = String(request.query.ncm || '');
    const clientIp =
        request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    console.log({
        url: request.url,
        clientIp: clientIp,
    });

    response.setHeader('Cache-Control', CACHE_CONTROL_HEADER_VALUE);

    try {
        let filteredIbpts = ibpt.filter((ibpt) => {
            return comparaNcm(ibpt.codigo, requestedNcm);
        });

        response.status(200);
        response.json(filteredIbpts.shift());
    } catch (error) {
        console.log(error);
        response.status(500);
        response.json(error);
    }
}

export default cors(Ibpt);

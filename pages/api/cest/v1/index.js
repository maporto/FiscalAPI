import microCors from 'micro-cors';
import cest from '../../../../data/cest.json';
import normaliza from '../../../../helpers/normaliza';
import comparaNcm from '../../../../helpers/comparaNcm';

const CACHE_CONTROL_HEADER_VALUE =
    'max-age=0, s-maxage=86400, stale-while-revalidate, public';
const cors = microCors();

async function Cest(request, response) {
    const requestedNcm = String(request.query.ncm || '');
    const requestedCest = String(request.query.cest || '');
    const clientIp =
        request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    console.log({
        url: request.url,
        clientIp: clientIp,
    });

    response.setHeader('Cache-Control', CACHE_CONTROL_HEADER_VALUE);

    try {
        let filteredCest = cest.filter((cest) => {
            return !requestedNcm ? !cest.ncm : comparaNcm(cest.ncm, requestedNcm);
        });

        if (requestedCest) {
            filteredCest = filteredCest.filter((cest) => {
                return normaliza(cest.descricao).includes(normaliza(requestedCest));
            });
        }

        response.status(200);
        response.json(filteredCest);
    } catch (error) {
        console.log(error);
        response.status(500);
        response.json(error);
    }
}

export default cors(Cest);

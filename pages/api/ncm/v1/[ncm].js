import microCors from 'micro-cors';
import ncm from '../../../../data/ncm.json';
import normaliza from '../../../../helpers/normaliza';

const CACHE_CONTROL_HEADER_VALUE =
    'max-age=0, s-maxage=86400, stale-while-revalidate, public';
const cors = microCors();

async function Ncm(request, response) {
    const requestedNcm = request.query.ncm;
    const clientIp =
        request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    console.log({
        url: request.url,
        clientIp: clientIp,
    });

    response.setHeader('Cache-Control', CACHE_CONTROL_HEADER_VALUE);

    try {
        const filteredNcm = ncm.filter((ncm) => {
            return normaliza(ncm.descricao).includes(normaliza(requestedNcm));
        });
    
        response.status(200);
        response.json(filteredNcm);
    } catch (error) {
        response.status(500);
        response.json(error);
    }
}

export default cors(Ncm);

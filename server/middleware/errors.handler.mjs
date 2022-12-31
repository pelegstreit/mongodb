import log from '@ajar/marker';
const { White, Reset, Red } = log.constants;
const { NODE_ENV } = process.env;

export const error_handler =  (err, req, res, next) => {
    log.error(err);
    next(err)
}

export const error_handler2 =  (err, req, res, next) => {
    if(NODE_ENV !== 'production')res.status(500).json({status:err.message,stack:err.stack});
    else res.status(500).json({status:'internal server error...'});
}

export const not_found =  (req, res) => {
    log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
    res.status(404).json({status:`url: ${req.url} not found...`});
}



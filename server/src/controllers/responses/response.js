const okResponse = (res, json) => res.status(200).json(json);

const conflictError = (res, json) => res.status(409).json(json);

const notFoundError = (res, json) => res.status(404).json(json);

const internalServerError = (res, json) => res.status(500).json({ message: json || 'Internal Server Error' });

const badRequestError = (res, json) => res.status(400).json(json);

module.exports = {
    OkResponse: okResponse,
    ConflictError: conflictError,
    InternalServerError: internalServerError,
    NotFoundError: notFoundError,
    BadRequestError: badRequestError
}
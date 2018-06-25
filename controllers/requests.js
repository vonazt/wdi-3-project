const Request = require('../models/request');

function createRequestRoute(req, res, next) {
  req.body.wantedRecord = req.params.id;
  Request
    .create(req.body)
    .then(request => res.status(201).json(request))
    .catch(next);
}

function updateRequestRoute(req, res, next) {
  Request
    .findById(req.params.id)
    .then(request => {
      request.set(req.body);
      return request.save();
    })
    .then(request => res.json(request))
    .catch(next);
}

function deleteRequestRoute(req, res, next) {
  Request
    .findById(req.params.id)
    .then(request => {
      request.remove();
      return request.save();
    })
    .then(request => res.json(request))
    .catch(next);
}

module.exports = {
  createRequest: createRequestRoute,
  updateRequest: updateRequestRoute,
  deleteRequest: deleteRequestRoute
};

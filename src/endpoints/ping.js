const router = require('express').Router();

const defaultResponse = `BVN Verifier: ${new Date()}`;
const defaultHandler = (req, res) => res.status(200).send({ message: defaultResponse });

// handle requests if no path or /ping was specified
router.get('/', defaultHandler);
router.post('/', defaultHandler);

module.exports = router;
